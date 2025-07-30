from django.shortcuts import render, get_object_or_404
from django.core.paginator import Paginator
from django.db.models import Q
from .models import BlogPost, Destination, Photo, Category, FoodExperience, AboutPage


def home(request):
    """Home page with featured posts and destinations"""
    featured_posts = BlogPost.objects.filter(is_published=True, is_featured=True)[:3]
    recent_posts = BlogPost.objects.filter(is_published=True)[:6]
    featured_destinations = Destination.objects.filter(is_featured=True)[:4]
    
    context = {
        'featured_posts': featured_posts,
        'recent_posts': recent_posts,
        'featured_destinations': featured_destinations,
    }
    return render(request, 'blog/home.html', context)


def blog_list(request):
    """List all published blog posts with pagination"""
    posts = BlogPost.objects.filter(is_published=True)
    
    # Search functionality
    query = request.GET.get('q')
    if query:
        posts = posts.filter(
            Q(title__icontains=query) |
            Q(content__icontains=query) |
            Q(excerpt__icontains=query)
        )
    
    # Category filtering
    category_slug = request.GET.get('category')
    if category_slug:
        posts = posts.filter(categories__slug=category_slug)
    
    # Pagination
    paginator = Paginator(posts, 9)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    
    categories = Category.objects.all()
    
    context = {
        'page_obj': page_obj,
        'categories': categories,
        'current_category': category_slug,
        'query': query,
    }
    return render(request, 'blog/blog_list.html', context)


def post_detail(request, slug):
    """Individual blog post detail"""
    post = get_object_or_404(BlogPost, slug=slug, is_published=True)
    
    # Increment view count
    post.views += 1
    post.save(update_fields=['views'])
    
    # Related posts
    related_posts = BlogPost.objects.filter(
        is_published=True,
        categories__in=post.categories.all()
    ).exclude(id=post.id).distinct()[:3]
    
    context = {
        'post': post,
        'related_posts': related_posts,
    }
    return render(request, 'blog/post_detail.html', context)


def destination_list(request):
    """List all destinations"""
    destinations = Destination.objects.all()
    
    # Search functionality
    query = request.GET.get('q')
    if query:
        destinations = destinations.filter(
            Q(name__icontains=query) |
            Q(country__icontains=query) |
            Q(description__icontains=query)
        )
    
    # Pagination
    paginator = Paginator(destinations, 12)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    
    context = {
        'page_obj': page_obj,
        'query': query,
    }
    return render(request, 'blog/destination_list.html', context)


def destination_detail(request, slug):
    """Individual destination detail"""
    destination = get_object_or_404(Destination, slug=slug)
    
    # Get related content
    related_posts = BlogPost.objects.filter(
        destinations=destination,
        is_published=True
    )
    
    photos = Photo.objects.filter(destination=destination)
    food_experiences = FoodExperience.objects.filter(destination=destination)
    
    context = {
        'destination': destination,
        'related_posts': related_posts,
        'photos': photos,
        'food_experiences': food_experiences,
    }
    return render(request, 'blog/destination_detail.html', context)


def gallery(request):
    """Photo gallery with pagination"""
    photos = Photo.objects.all()
    
    # Pagination
    paginator = Paginator(photos, 20)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    
    # Featured destinations for the bottom section
    featured_destinations = Destination.objects.filter(is_featured=True)[:6]
    
    context = {
        'photos': page_obj,
        'page_obj': page_obj,
        'is_paginated': page_obj.has_other_pages(),
        'featured_destinations': featured_destinations,
    }
    return render(request, 'blog/gallery.html', context)


def about(request):
    """About page"""
    try:
        about_page = AboutPage.objects.get()
    except AboutPage.DoesNotExist:
        about_page = None
    
    context = {
        'about_page': about_page,
    }
    return render(request, 'blog/about.html', context)


def search(request):
    """Search across all content"""
    query = request.GET.get('q', '')
    results = []
    
    if query:
        # Search blog posts
        posts = BlogPost.objects.filter(
            Q(title__icontains=query) |
            Q(content__icontains=query) |
            Q(excerpt__icontains=query),
            is_published=True
        )
        
        # Search destinations
        destinations = Destination.objects.filter(
            Q(name__icontains=query) |
            Q(country__icontains=query) |
            Q(description__icontains=query)
        )
        
        # Search photos
        photos = Photo.objects.filter(
            Q(title__icontains=query) |
            Q(caption__icontains=query)
        )
        
        results = {
            'posts': posts,
            'destinations': destinations,
            'photos': photos,
        }
    
    context = {
        'query': query,
        'results': results,
    }
    return render(request, 'blog/search_results.html', context)
