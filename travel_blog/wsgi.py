"""
WSGI config for travel_blog project - Optimized for production.
"""

import os
from django.core.wsgi import get_wsgi_application

# Set default settings module
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'travel_blog.settings')

# Get WSGI application for deployment
application = get_wsgi_application()
