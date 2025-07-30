#!/usr/bin/env python
"""
Quick script to add coordinates to destinations
"""
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'travel_blog.settings')
django.setup()

from blog.models import Destination

destinations_data = [
    {'name': 'Tokyo', 'country': 'Japan', 'lat': 35.6762, 'lng': 139.6503, 'featured': True},
    {'name': 'Bangkok', 'country': 'Thailand', 'lat': 13.7563, 'lng': 100.5018, 'featured': True},
    {'name': 'Barcelona', 'country': 'Spain', 'lat': 41.3851, 'lng': 2.1734, 'featured': True},
    {'name': 'Istanbul', 'country': 'Turkey', 'lat': 41.0082, 'lng': 28.9784, 'featured': True},
    {'name': 'Paris', 'country': 'France', 'lat': 48.8566, 'lng': 2.3522, 'featured': False},
    {'name': 'Rome', 'country': 'Italy', 'lat': 41.9028, 'lng': 12.4964, 'featured': False},
    {'name': 'New York City', 'country': 'United States', 'lat': 40.7128, 'lng': -74.0060, 'featured': False},
    {'name': 'Melbourne', 'country': 'Australia', 'lat': -37.8136, 'lng': 144.9631, 'featured': False}
]

print("Updating destinations with coordinates...")

for data in destinations_data:
    try:
        dest, created = Destination.objects.get_or_create(
            name=data['name'], 
            country=data['country'],
            defaults={
                'description': f"Amazing destination in {data['country']} that we've explored.",
                'latitude': data['lat'],
                'longitude': data['lng'],
                'is_featured': data['featured']
            }
        )
        
        if not created:
            # Update existing destination
            dest.latitude = data['lat']
            dest.longitude = data['lng']
            dest.is_featured = data['featured']
            if not dest.description:
                dest.description = f"Amazing destination in {data['country']} that we've explored."
            dest.save()
            
        print(f"{'Created' if created else 'Updated'}: {dest.name}, {dest.country}")
        
    except Exception as e:
        print(f"Error with {data['name']}: {e}")

print("Done!")
