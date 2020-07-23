from django.db import models

# Create your models here.
class products(models.Model):
    productID = models.CharField(max_length = 50, unique=True)

    def __str__(self):
        return self.productID

class reviews(models.Model):
    productId = models.ForeignKey(products,on_delete=models.CASCADE)
    userID = models.CharField(max_length = 50)
    profileName = models.CharField(max_length = 150)
    helpfulness = models.CharField(max_length = 5)
    score = models.FloatField()
    time = models.DateTimeField()
    summary = models.CharField(max_length=150)
    text = models.CharField(max_length=500)
    
    def __str__(self):
        return "%s %s %s" % (self.profileName, self.helpfulness, self.score)