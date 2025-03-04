from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import Book
from .serializers import BookSerializer, BookCreateSerializer
from rest_framework.permissions import AllowAny
# Backend API
class BookListAPI(APIView):
    permission_classes = [AllowAny]
    # GET get all the books, order by most recently created
    def get(self, request):
        books = Book.objects.only("id", "title", 'author', "color", "created_at").order_by('-created_at')
        serializer = BookSerializer(books, many=True)
        return Response(serializer.data)
    # POST create the book
    def post(self, request):
        serializer = BookCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save() # Tunr Json to object then save it to DB
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class BookDetailAPI(APIView):
    permission_classes = [AllowAny]
    # GET get detail of selected book 'ID'
    def get(self, request, pk):
        book = get_object_or_404(Book, pk=pk)
        serializer = BookSerializer(book)
        return Response(serializer.data)
    # GET modified the detail of selected book 'ID'
    def patch(self, request, pk):
        book = get_object_or_404(Book, pk=pk)
        password = request.data.get('password')
        # Check password if wrong return HTTP_403_FORBIDDEN
        if not password or not book.check_password(password):
            return Response({'error': 'Incorrect password'}, status=status.HTTP_403_FORBIDDEN)
        
        allowed_fields = ['title', 'author', 'content', 'color']  # Limit editable fields aka No password editing
        update_data = {key: request.data[key] for key in allowed_fields if key in request.data}

        serializer = BookSerializer(book, data=update_data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
