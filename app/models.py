# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.
class Products(models.Model):
	title = models.CharField(max_length=100)
	description = models.TextField()
	is_active = models.BooleanField(max_length=100)
	create_at = models.DateTimeField(auto_now_add=True)