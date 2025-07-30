"""
Optimized sample data creation for Margo & Drew's Adventures Travel Blog
Run: python create_sample_data.py
"""
import os
import django
from datetime import datetime, timezone

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'travel_blog.settings')
django.setup()

from blog.models import Category, Destination, BlogPost, Photo, FoodExperience, AboutPage
from django.contrib.auth.models import User
from django.db import transaction

def create_sample_data():
    """Create sample data efficiently using database transactions"""
    print("Creating optimized sample data for Margo & Drew's Adventures...")
    
    with transaction.atomic():  # Use transaction for better performance
        # Create categories efficiently
        categories_data = [
            ('Food Guide', 'Detailed guides to local cuisine and restaurants'),
            ('Adventure', 'Exciting outdoor activities and adventures'),
            ('Cultural Sites', 'Historical and cultural landmarks'),
            ('Hidden Gems', 'Off-the-beaten-path discoveries'),
            ('Travel Tips', 'Practical advice for travelers'),
        ]
        
        categories = []
        for name, description in categories_data:
            category, created = Category.objects.get_or_create(
                name=name,
                defaults={'description': description}
            )
            categories.append(category)
            if created:
                print(f"✓ Created category: {name}")
        
        # Create destinations efficiently
        destinations_data = [
            {
                'name': 'Tokyo',
                'country': 'Japan',
                'description': 'Tokyo is a vibrant metropolis where ancient traditions blend seamlessly with cutting-edge technology. From bustling street food markets to world-class fine dining, Tokyo offers an incredible culinary journey.',
                'latitude': 35.6762,
                'longitude': 139.6503
            },
            {
                'name': 'Bangkok',
                'country': 'Thailand', 
                'description': 'The capital of Thailand is a feast for all the senses. Bangkok\'s street food scene is legendary, with vendors serving up incredible dishes at every corner.',
                'latitude': 13.7563,
                'longitude': 100.5018
            },
            {
                'name': 'Barcelona',
                'country': 'Spain',
                'description': 'Barcelona captivated us with its unique blend of Gothic architecture, modernist masterpieces, and incredible food culture.',
                'latitude': 41.3851,
                'longitude': 2.1734
            },
            {
                'name': 'Istanbul',
                'country': 'Turkey',
                'description': 'Where Europe meets Asia, Istanbul offers a culinary journey through centuries of history.',
                'latitude': 41.0082,
                'longitude': 28.9784
            }
        ]
        
        destinations = []
        for dest_data in destinations_data:
            destination, created = Destination.objects.get_or_create(
                name=dest_data['name'],
                country=dest_data['country'],
                defaults={
                    'description': dest_data['description'],
                    'latitude': dest_data['latitude'],
                    'longitude': dest_data['longitude']
                }
            )
            destinations.append(destination)
            if created:
                print(f"✓ Created destination: {destination.name}, {destination.country}")
    
    # Create blog posts
    tokyo = Destination.objects.get(name='Tokyo')
    bangkok = Destination.objects.get(name='Bangkok')
    barcelona = Destination.objects.get(name='Barcelona')
    
    food_guide = Category.objects.get(name='Food Guide')
    adventure = Category.objects.get(name='Adventure')
    cultural = Category.objects.get(name='Cultural Sites')
    
    blog_posts = [
        {
            'title': 'The Ultimate Tokyo Ramen Guide: 10 Must-Try Shops',
            'slug': 'ultimate-tokyo-ramen-guide',
            'excerpt': 'Discover the best ramen shops in Tokyo, from tiny hole-in-the-wall establishments to renowned institutions that have been perfecting their craft for decades.',
            'content': '''<h2>Our Tokyo Ramen Adventure</h2>
            
            <p>After spending two weeks in Tokyo specifically hunting for the best ramen, we've compiled our ultimate guide to the city's most incredible noodle experiences. From rich tonkotsu broths to delicate shio bases, Tokyo's ramen scene is unparalleled.</p>
            
            <h3>1. Ichiran Ramen - The Solo Dining Experience</h3>
            <p>Famous for its individual booth seating and customizable ramen, Ichiran offers a unique dining experience. Their tonkotsu ramen is rich and flavorful, perfect for first-time visitors to Tokyo.</p>
            
            <h3>2. Ippudo Ramen - Modern Classics</h3>
            <p>This modern ramen chain has locations worldwide, but experiencing it in Tokyo is special. Their signature Akamaru Modern ramen combines traditional flavors with contemporary techniques.</p>
            
            <h3>3. Menya Saimi - Hidden Gem</h3>
            <p>Tucked away in a quiet alley, this tiny shop serves some of the most incredible tsukemen (dipping noodles) we've ever had. The line starts forming before they open!</p>
            
            <p>Each bowl tells a story of craftsmanship, tradition, and innovation. Tokyo's ramen culture is more than just food – it's an art form that represents the soul of Japanese cuisine.</p>''',
            'category': food_guide,
            'destination': tokyo,
            'is_featured': True,
            'tags': 'ramen, tokyo, food guide, japanese cuisine, noodles'
        },
        {
            'title': 'Bangkok Street Food Adventures: A Culinary Journey',
            'slug': 'bangkok-street-food-adventures',
            'excerpt': 'Join us as we explore the incredible street food scene in Bangkok, from floating markets to night bazaars, discovering authentic Thai flavors at every turn.',
            'content': '''<h2>The Street Food Capital of the World</h2>
            
            <p>Bangkok's street food scene is legendary for good reason. Every corner, every alley, every market stall offers something delicious and authentic. We spent a week eating our way through the city, and these are our most memorable discoveries.</p>
            
            <h3>Chatuchak Weekend Market</h3>
            <p>This massive market isn't just for shopping – it's a food lover's paradise. From coconut ice cream served in fresh coconuts to grilled squid on sticks, every vendor offers something special.</p>
            
            <h3>Floating Markets Experience</h3>
            <p>The traditional floating markets offer a glimpse into Bangkok's past while serving up incredible food. Fresh tropical fruits, boat noodles, and grilled seafood create an unforgettable dining experience.</p>
            
            <h3>Night Bazaar Food Courts</h3>
            <p>As the sun sets, Bangkok's night bazaars come alive with sizzling woks and aromatic spices. The pad thai here is life-changing, and the mango sticky rice is pure heaven.</p>''',
            'category': food_guide,
            'destination': bangkok,
            'is_featured': False,
            'tags': 'bangkok, street food, thai cuisine, markets, authentic'
        },
        {
            'title': 'Barcelona Tapas Trail: A Guide to the City\'s Best Bars',
            'slug': 'barcelona-tapas-trail-guide',
            'excerpt': 'Discover Barcelona\'s incredible tapas culture as we guide you through the best bars, traditional dishes, and local favorites in this culinary capital.',
            'content': '''<h2>The Art of Tapas in Barcelona</h2>
            
            <p>Barcelona's tapas culture is deeply ingrained in the city's social fabric. These small plates aren't just food – they're a way of life, bringing people together over shared meals and good conversation.</p>
            
            <h3>Gothic Quarter Gems</h3>
            <p>The narrow streets of the Gothic Quarter hide some of Barcelona's oldest and most authentic tapas bars. Here, recipes have been passed down through generations.</p>
            
            <h3>Born District Discoveries</h3>
            <p>The trendy Born district offers a mix of traditional and modern tapas bars. The jamón ibérico here is exceptional, and the local wines perfectly complement every dish.</p>
            
            <h3>Essential Tapas to Try</h3>
            <ul>
                <li>Patatas Bravas - Crispy potatoes with spicy tomato sauce</li>
                <li>Jamón Ibérico - Premium cured ham</li>
                <li>Pan con Tomate - Toasted bread with tomato and olive oil</li>
                <li>Boquerones - Fresh anchovies in vinegar</li>
            </ul>''',
            'category': food_guide,
            'destination': barcelona,
            'is_featured': False,
            'tags': 'barcelona, tapas, spanish cuisine, wine, culture'
        }
    ]
    
    for post_data in blog_posts:
        post, created = BlogPost.objects.get_or_create(
            slug=post_data['slug'],
            defaults=post_data
        )
        if created:
            print(f"Created blog post: {post.title}")
    
    # Create food experiences
    food_experiences = [
        {
            'destination': tokyo,
            'dish_name': 'Tonkotsu Ramen',
            'restaurant_name': 'Ichiran Ramen',
            'description': 'Rich, creamy pork bone broth with perfectly cooked noodles. Customizable spice level and toppings.',
            'rating': 5,
            'price': 12.00
        },
        {
            'destination': bangkok,
            'dish_name': 'Pad Thai',
            'restaurant_name': 'Chatuchak Night Market',
            'description': 'Authentic street-style pad thai with fresh shrimp, crispy tofu, and perfectly balanced sweet and tangy sauce.',
            'rating': 5,
            'price': 3.50
        },
        {
            'destination': barcelona,
            'dish_name': 'Jamón Ibérico',
            'restaurant_name': 'Bar del Pla',
            'description': 'Premium cured ham from acorn-fed pigs. Melts in your mouth with incredible depth of flavor.',
            'rating': 5,
            'price': 18.00
        }
    ]
    
    for food_data in food_experiences:
        food, created = FoodExperience.objects.get_or_create(
            destination=food_data['destination'],
            dish_name=food_data['dish_name'],
            restaurant_name=food_data['restaurant_name'],
            defaults={
                'description': food_data['description'],
                'rating': food_data['rating'],
                'price': food_data['price']
            }
        )
        if created:
            print(f"Created food experience: {food.dish_name} at {food.restaurant_name}")
    
    # Create or update About page
    about_content = '''
    <h2>Welcome to Our Culinary Journey!</h2>
    
    <p>We're Margo and Drew, a couple with an insatiable appetite for adventure and an undying love for authentic cuisine. Over the past five years, we've traveled to 29 countries across 4 continents, always led by our stomachs and our curiosity for local food cultures.</p>
    
    <h3>Our Story</h3>
    <p>It all started with a spontaneous trip to Thailand in 2019. What was supposed to be a relaxing beach vacation turned into a life-changing culinary adventure. We found ourselves waking up at 5 AM to visit local markets, taking cooking classes with grandmothers in their home kitchens, and discovering that the best meals often come from the most unexpected places.</p>
    
    <h3>What We Do</h3>
    <p>We're not professional chefs or food critics – we're just two people who believe that food is the universal language that connects us all. Through this blog, we share:</p>
    
    <ul>
        <li><strong>Authentic Food Experiences:</strong> From street vendors to family-run restaurants</li>
        <li><strong>Cultural Insights:</strong> How food reflects the history and soul of a place</li>
        <li><strong>Practical Tips:</strong> Where to eat, what to order, and how to eat like a local</li>
        <li><strong>Honest Reviews:</strong> We share both our amazing discoveries and occasional disappointments</li>
    </ul>
    
    <h3>Our Mission</h3>
    <p>We believe that the best way to understand a culture is through its food. Every dish tells a story, every meal creates memories, and every shared table builds connections. Our mission is to inspire others to step out of their comfort zones, try new flavors, and discover the incredible diversity of world cuisine.</p>
    
    <h3>Join Our Adventure</h3>
    <p>Whether you're planning your own food-focused travels or just looking to explore new cuisines from your own kitchen, we hope our stories inspire you to embark on your own culinary adventures. Food has the power to transport us, transform us, and bring us together – and we can't wait to share these experiences with you.</p>
    
    <p><em>Bon appétit, and happy travels!</em><br>
    Margo & Drew</p>
    '''
    
    about_page, created = AboutPage.objects.get_or_create(
        id=1,
        defaults={
            'title': 'About Margo & Drew',
            'content': about_content,
            'mission_statement': 'Discovering the world one meal at a time, sharing authentic food experiences and cultural insights from 29 countries and counting.'
        }
    )
    if created:
        print("Created About page content")
    else:
        about_page.content = about_content
        about_page.save()
        print("Updated About page content")
    
    print("\n✅ Sample data creation completed!")
    print("🎉 Your travel blog is now ready with sample content!")
    print("\nNext steps:")
    print("1. Visit http://127.0.0.1:8000/ to see your blog")
    print("2. Login to admin at http://127.0.0.1:8000/admin/ to add images and more content")
    print("3. Start customizing with your own travel stories!")

if __name__ == '__main__':
    create_sample_data()
