from django.urls import path
from .views import BookListAPI, BookDetailAPI

urlpatterns = [
    path('api/', BookListAPI.as_view(), name='book-list'),
    path('api/<int:pk>/', BookDetailAPI.as_view(), name='book-detail'),
]
