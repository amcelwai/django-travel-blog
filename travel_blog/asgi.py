"""
ASGI config for travel_blog project - Optimized for async deployment.
"""

import os
from django.core.asgi import get_asgi_application

# Set default settings module
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'travel_blog.settings')

# Get ASGI application for async deployment
application = get_asgi_application()
