"""
URL configuration for travel_blog project - Optimized for performance.
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import RedirectView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('blog.urls')),
    # Add robots.txt and sitemap for SEO
    path('robots.txt', RedirectView.as_view(url='/static/robots.txt', permanent=True)),
]

# Serve media files during development only
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
