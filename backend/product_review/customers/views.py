from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.db.models import Q
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from .models import reviews
from .serializers import *
from django.http import HttpResponse


@api_view(['GET', 'POST'])
def customers_review(request):
    """
 List  customers, or create a new customer.
 """
    print("i am here")
    if request.method == 'GET':
        data = []
        nextPage = 1
        previousPage = 1
        review = reviews.objects.all()
        page = request.GET.get('page', 1)
        paginator = Paginator(review, 10)
        try:
            data = paginator.page(page)
        except PageNotAnInteger:
            data = paginator.page(1)
        except EmptyPage:
            data = paginator.page(paginator.num_pages)

        serializer = ReviewSerializer(data,context={'request': request} ,many=True)
        if data.has_next():
            nextPage = data.next_page_number()
        if data.has_previous():
            previousPage = data.previous_page_number()

        return Response({'data': serializer.data , 'count': paginator.count, 'numpages' : paginator.num_pages, 'nextlink': '/api/customers/?page=' + str(nextPage), 'prevlink': '/api/customers/?page=' + str(previousPage)})

    elif request.method == 'POST':
        serializer = CustomerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def customers_detail_update(request, pk):
    try:
        review = reviews.objects.get(pk=pk)
    except reviews.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ReviewSerializer(review,context={'request': request})
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = ReviewSerializer(review, data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        review.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'PUT', 'POST'])
def review_search(request, search):
    if request.method == "GET":
        query = search
        queryset = []
        queries = query.split(" ")
        for q in queries:
            posts = reviews.objects.filter(Q(profileName__icontains=q)|Q(summary__icontains=q)|Q(text__icontains=q)).order_by('-score')
            for post in posts:
                queryset.append(post)
        serializer = ReviewSerializer(queryset,context={'request': request},many=True)
        return Response(serializer.data)
    else:
        pass