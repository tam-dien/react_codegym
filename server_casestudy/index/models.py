from django.db import models

from django.contrib.auth import get_user_model
User = get_user_model()

# Create your models here.

class Client(models.Model):
    client_id = models.DateTimeField(auto_now=True)
    activate = models.BooleanField(default=True)

class Coversation(models.Model):
    mess = models.CharField(max_length=255)
    client = models.ForeignKey(Client, on_delete=models.CASCADE, null=True, default=None)
    sender = models.ForeignKey(User, on_delete=models.CASCADE, null=True)