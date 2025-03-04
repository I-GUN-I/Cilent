from django.db import models
from django.utils import timezone
from django.contrib.auth.hashers import make_password, check_password
# Model of book, DB table field
class Book(models.Model):
    title = models.CharField(max_length=255) # title of the book
    author = models.CharField(max_length=255, default='Unknown') # author of the book, default to unknow
    content = models.TextField() # content of the book
    color = models.CharField(max_length=7, default='#000000')  # Hex code for color, default to black
    password_hash = models.CharField(max_length=255) # password of the book, use for authorization when editing the book
    created_at = models.DateTimeField(default=timezone.now) # Save the date when book is create
    # Hash password then save
    def set_password(self, raw_password):
        self.password_hash = make_password(raw_password)
    # Check the password
    def check_password(self, raw_password):
        return check_password(raw_password, self.password_hash)