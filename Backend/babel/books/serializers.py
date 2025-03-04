from rest_framework import serializers
from .models import Book
# Serializer for turning Object to JSON, JSON to Object
class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['id', 'title', 'author','content', 'color', 'created_at']

class BookCreateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Book
        fields = ['id', 'title', 'content', 'color', 'author', 'password']
    
    def create(self, validated_data):
        password = validated_data.pop('password')
        book = Book(**validated_data)
        book.set_password(password)
        book.save()
        return book
