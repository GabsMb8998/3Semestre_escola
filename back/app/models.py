from django.db import models

class Professor(models.Model):
    ni = models.CharField(max_length=10)
    nome = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    cargo = models.CharField(max_length=20)