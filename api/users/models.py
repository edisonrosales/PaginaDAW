from django.db import models
from django.contrib.auth.models import User

class BlogPost(models.Model):
	autor = models.ForeignKey(User, on_delete=models.CASCADE)
	date = models.DateField()
	title =  models.CharField(max_length=200)
	post = models.CharField(max_length=200)