from django.db import models

def upload_to(instance, filename):
    return f'professores_imagens/{instance.ni}/{filename}'.format(filename=filename)

class Professor(models.Model):
    ni = models.CharField(max_length=10, unique=True)
    nome = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    cargo = models.CharField(max_length=20)
    imagem = models.ImageField(upload_to=upload_to, null=True, blank=True)
