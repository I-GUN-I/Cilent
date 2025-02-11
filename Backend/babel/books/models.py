from django.db import models
from django.utils import timezone
from django.contrib.auth.hashers import make_password, check_password

class Book(models.Model):
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255, default='Unknown')
    content = models.TextField()
    color = models.CharField(max_length=7)  #Hex code, e.g., #ff5733
    password_hash = models.CharField(max_length=255)
    created_at = models.DateTimeField(default=timezone.now)

    def set_password(self, raw_password):
        self.password_hash = make_password(raw_password)

    def check_password(self, raw_password):
        return check_password(raw_password, self.password_hash)
    
    def __str__(self):
        return f"{self.title} by {self.author}"