from django.contrib import admin
from .models import Category, Destination, BlogPost, Photo, FoodExperience, AboutPage


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'color']
    prepopulated_fields = {'slug': ('name',)}


@admin.register(Destination)
class DestinationAdmin(admin.ModelAdmin):
    list_display = ['name', 'country', 'visited_date', 'is_featured']
    list_filter = ['country', 'is_featured', 'visited_date']
    search_fields = ['name', 'country', 'description']
    prepopulated_fields = {'slug': ('name',)}
    list_editable = ['is_featured']


@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ['title', 'author', 'published_date', 'is_published', 'is_featured', 'views']
    list_filter = ['is_published', 'is_featured', 'published_date', 'categories']
    search_fields = ['title', 'content', 'excerpt']
    prepopulated_fields = {'slug': ('title',)}
    list_editable = ['is_published', 'is_featured']
    filter_horizontal = ['categories', 'destinations']


@admin.register(Photo)
class PhotoAdmin(admin.ModelAdmin):
    list_display = ['title', 'destination', 'blog_post', 'category', 'taken_date', 'is_featured']
    list_filter = ['category', 'is_featured', 'taken_date', 'destination']
    search_fields = ['title', 'caption']
    list_editable = ['is_featured']


@admin.register(FoodExperience)
class FoodExperienceAdmin(admin.ModelAdmin):
    list_display = ['name', 'destination', 'restaurant_name', 'rating', 'price_range', 'would_recommend']
    list_filter = ['rating', 'price_range', 'would_recommend', 'destination']
    search_fields = ['name', 'description', 'restaurant_name']


@admin.register(AboutPage)
class AboutPageAdmin(admin.ModelAdmin):
    list_display = ['title', 'updated_at']
    
    def has_add_permission(self, request):
        # Only allow one About page
        return not AboutPage.objects.exists()
    
    def has_delete_permission(self, request, obj=None):
        # Don't allow deletion of About page
        return False
