from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import Book
from .serializers import BookSerializer, BookCreateSerializer
from rest_framework.permissions import AllowAny

class BookListAPI(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        books = Book.objects.all().order_by('-id').values()
        serializer = BookSerializer(books, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = BookCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class BookDetailAPI(APIView):
    permission_classes = [AllowAny]
    def get(self, request, pk):
        book = get_object_or_404(Book, pk=pk)
        serializer = BookSerializer(book)
        return Response(serializer.data)

    def patch(self, request, pk):
        book = get_object_or_404(Book, pk=pk)
        password = request.data.get('password')
        
        if not password or not book.check_password(password):
            return Response({'error': 'Incorrect password'}, status=status.HTTP_403_FORBIDDEN)
        
        serializer = BookSerializer(book, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
