from django.db import models
from django.urls import reverse
from django.utils import timezone
from django.contrib.auth.models import User
from django.utils.text import slugify
from PIL import Image
import os


class Category(models.Model):
    """Categories for blog posts like Food Guide, Adventure, Cultural Sites, etc."""
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    color = models.CharField(max_length=7, default='#42a5f5')
    
    class Meta:
        verbose_name_plural = "Categories"
        ordering = ['name']
    
    def __str__(self):
        return self.name


class Destination(models.Model):
    """Countries and cities we've visited"""
    name = models.CharField(max_length=200)
    country = models.CharField(max_length=100)
    slug = models.SlugField(max_length=200, unique=True)
    description = models.TextField()
    featured_image = models.ImageField(upload_to='destinations/', blank=True, null=True)
    latitude = models.DecimalField(max_digits=9, decimal_places=6, blank=True, null=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, blank=True, null=True)
    visited_date = models.DateField(blank=True, null=True)
    is_featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-visited_date', 'name']
    
    def __str__(self):
        return f"{self.name}, {self.country}"

    def get_absolute_url(self):
        return reverse('blog:destination_detail', kwargs={'slug': self.slug})


class BlogPost(models.Model):
    """Main blog posts about travels and food experiences"""
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='blog_posts')
    content = models.TextField()
    excerpt = models.TextField(max_length=300, blank=True)
    featured_image = models.ImageField(upload_to='blog_posts/', blank=True, null=True)
    categories = models.ManyToManyField(Category, blank=True)
    destinations = models.ManyToManyField(Destination, blank=True)
    published_date = models.DateTimeField(default=timezone.now)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_published = models.BooleanField(default=False)
    is_featured = models.BooleanField(default=False)
    views = models.PositiveIntegerField(default=0)
    
    # SEO fields
    meta_description = models.CharField(max_length=160, blank=True)
    meta_keywords = models.CharField(max_length=200, blank=True)
    
    class Meta:
        ordering = ['-published_date']
    
    def __str__(self):
        return self.title
    
    def get_absolute_url(self):
        return reverse('blog:post_detail', kwargs={'slug': self.slug})


class Photo(models.Model):
    """Gallery photos linked to posts and destinations"""
    title = models.CharField(max_length=200, blank=True)
    caption = models.TextField(blank=True)
    image = models.ImageField(upload_to='gallery/')
    blog_post = models.ForeignKey(BlogPost, on_delete=models.CASCADE, blank=True, null=True, related_name='photos')
    destination = models.ForeignKey(Destination, on_delete=models.SET_NULL, blank=True, null=True, related_name='photos')
    taken_date = models.DateField(blank=True, null=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    is_featured = models.BooleanField(default=False)
    
    # Photo categories
    CATEGORY_CHOICES = [
        ('landscape', 'Landscape'),
        ('food', 'Food'),
        ('culture', 'Culture'),
        ('architecture', 'Architecture'),
        ('people', 'People'),
        ('nature', 'Nature'),
        ('street', 'Street'),
        ('other', 'Other'),
    ]
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='other')
    
    class Meta:
        ordering = ['-taken_date', '-uploaded_at']
    
    def __str__(self):
        return self.title or f"Photo {self.id}"


class FoodExperience(models.Model):
    """Specific dishes and restaurants with ratings"""
    name = models.CharField(max_length=200)
    description = models.TextField()
    blog_post = models.ForeignKey(BlogPost, on_delete=models.CASCADE, related_name='food_experiences', blank=True, null=True)
    destination = models.ForeignKey(Destination, on_delete=models.CASCADE, related_name='food_experiences')
    restaurant_name = models.CharField(max_length=200, blank=True)
    price_range = models.CharField(max_length=5, choices=[
        ('$', 'Budget'),
        ('$$', 'Mid-range'),
        ('$$$', 'Expensive'),
        ('$$$$', 'Very Expensive'),
    ], default='$$')
    rating = models.PositiveIntegerField(choices=[(i, i) for i in range(1, 6)], default=5)
    would_recommend = models.BooleanField(default=True)
    image = models.ImageField(upload_to='food/', blank=True, null=True)
    tried_date = models.DateField(blank=True, null=True)
    
    class Meta:
        ordering = ['-tried_date']
    
    def __str__(self):
        return f"{self.name} - {self.destination.name}"


class AboutPage(models.Model):
    """Singleton model for about page content"""
    title = models.CharField(max_length=200, default="About Margo & Drew")
    content = models.TextField(default="Welcome to our travel blog!")
    hero_image = models.ImageField(upload_to='about/', blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "About Page"
        verbose_name_plural = "About Page"
    
    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        # Ensure only one instance exists
        if not self.pk and AboutPage.objects.exists():
            raise ValueError('Only one About page can exist')
        return super().save(*args, **kwargs)
