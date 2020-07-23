from customers.models import reviews, products
import datetime
f = open("C:/trial/foods.txt","r")

for i in f.read().split("\n"):
    if "product/productId:" in i:
        productid = i.replace("product/productId:",'').strip(' ')
        check = products.objects.filter(productID = productid)
        if check.count() == 0:
            p = products(productID = productid)
            p.save()
        else:
            p = check[0]
    elif "review/userId:" in i:
        userid = i.replace("review/userId:",'').strip(' ')
    elif "review/profileName:" in i:
        profilename = i.replace("review/profileName:",'').strip(' ')
    elif "review/helpfulness:" in i:
        helpfulness = i.replace("review/helpfulness:",'').strip(' ')
    elif "review/score:" in i:
        # print("here")
        score = i.replace("review/score:",'').strip(' ')
    elif "review/time:" in i:
        # print("again here")
        time_s = i.replace("review/time:",'').strip(' ')
        time_t = datetime.datetime.fromtimestamp(int(time_s)).strftime("%Y-%m-%d %H:%M:%S")
        # print(type(time_t))
    elif "review/summary:" in i:
        summary = i.replace("review/summary:",'').strip(' ')  
    elif "review/text:" in i:
        text = i.replace("review/text:",'').strip(' ')  
    elif len(i) == 0:
        print("success")
        q = reviews(productId = p, userID = userid, profileName = profilename, helpfulness = helpfulness, 
        score = score, time= time_t, 
        summary = summary, text = text)
        q.save()
    # print("here we will break so we know where we have to stop")


