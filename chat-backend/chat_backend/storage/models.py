from django.db import models


class StorageItem(models.Model):

    path = models.CharField(max_length=2048, null=False)
    bucket = models.CharField(max_length=255, null=False)
    hash = models.CharField(max_length=255, null=False)
    size = models.IntegerField(null=False)
    name = models.CharField(max_length=255, null=False)

