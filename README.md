# 🌍 Margo & Drew's Adventures - Travel & Food Blog

A beautiful Django-based travel and food blog featuring interactive elements, modern design, and comprehensive content management.

![Version](https://img.shields.io/badge/version-2.0-blue.svg)
![Django](https://img.shields.io/badge/django-5.2.4-green.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## ✨ Features

- **Modern Design**: Responsive, mobile-first design with beautiful animations
- **Interactive Quiz**: Travel knowledge quiz with 50+ questions
- **Video Backgrounds**: Hero sections with video backgrounds and fallbacks
- **Contact Form**: Functional contact form with email integration
- **SEO Optimized**: Structured data, meta tags, and social sharing
- **Gallery System**: Interactive photo gallery with lightbox
- **Search Functionality**: Integrated search across posts and destinations
- **Admin Interface**: Comprehensive Django admin for content management
- **Social Integration**: Links to Instagram, YouTube, Pinterest
- **Performance Optimized**: Caching, lazy loading, and optimized images

## 🚀 Quick Start

### Prerequisites

- Python 3.8 or higher
- pip (Python package installer)
- Git (optional, for cloning)

### Installation

1. **Clone or download the project**
   ```bash
   git clone <repository-url>
   cd webpage
   ```

2. **Run the deployment script**
   
   **Windows:**
   ```cmd
   deploy.bat
   ```
   
   **Linux/Mac:**
   ```bash
   chmod +x deploy.sh
   ./deploy.sh
   ```

3. **Configure environment variables**
   - Copy `.env.example` to `.env`
   - Update the values in `.env` with your settings

4. **Start the development server**
   ```bash
   python manage.py runserver
   ```

5. **Visit your blog**
   Open http://127.0.0.1:8000 in your browser

## 📁 Project Structure

```
webpage/
├── blog/                   # Main Django app
│   ├── models.py          # Database models
│   ├── views.py           # View functions
│   ├── admin.py           # Admin configuration
│   └── urls.py            # URL routing
├── templates/blog/         # HTML templates
│   ├── base.html          # Base template
│   ├── home.html          # Homepage
│   ├── contact.html       # Contact form
│   └── ...
├── static/                 # Static files
│   ├── css/style.css      # Main stylesheet
│   ├── js/main.js         # JavaScript functionality
│   └── images/            # Images
├── media/                  # User uploaded content
├── travel_blog/           # Django project settings
│   ├── settings.py        # Main settings
│   ├── urls.py            # Project URLs
│   └── wsgi.py            # WSGI configuration
├── requirements.txt       # Python dependencies
├── .env.example          # Environment variables template
└── manage.py             # Django management script
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file based on `.env.example`:

```bash
# Django Settings
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# Email Settings (for contact form)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password

# Social Media URLs
INSTAGRAM_URL=https://www.instagram.com/margoanddrew_adventures/
YOUTUBE_URL=https://www.youtube.com/@margoanddrew
PINTEREST_URL=https://www.pinterest.com/margoanddrew/
EMAIL_CONTACT=hello@margoanddrew.com
```

### Email Setup (Gmail)

1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password: https://myaccount.google.com/apppasswords
3. Use the App Password in your `.env` file

## 📊 Content Management

### Admin Interface

1. Create a superuser:
   ```bash
   python manage.py createsuperuser
   ```

2. Access admin at: http://127.0.0.1:8000/admin/

### Content Types

- **Blog Posts**: Travel stories and experiences
- **Destinations**: Countries and cities visited
- **Photos**: Gallery images with metadata
- **Categories**: Post categorization
- **Food Experiences**: Restaurant and dish reviews
- **About Page**: Site information and stats

## 🎨 Customization

### Styling

- Main styles in `static/css/style.css`
- CSS variables for easy color scheme changes
- Responsive design with mobile-first approach

### Templates

- Base template: `templates/blog/base.html`
- Page templates in `templates/blog/`
- Modular components in `templates/blog/partials/`

## 🚀 Production Deployment

### Security Checklist

1. Set `DEBUG=False` in production
2. Configure proper `ALLOWED_HOSTS`
3. Use a strong `SECRET_KEY`
4. Set up SSL certificates
5. Use a production database (PostgreSQL recommended)
6. Configure proper static file serving

### Recommended Stack

- **Web Server**: Nginx + Gunicorn
- **Database**: PostgreSQL
- **Caching**: Redis
- **SSL**: Let's Encrypt
- **Hosting**: DigitalOcean, AWS, or similar

## 📱 Features in Detail

### Interactive Travel Quiz

- 50+ curated questions about world geography and culture
- Random question selection
- Visual feedback for correct/incorrect answers
- Modern 2x2 grid layout
- Score tracking and fun facts

### Contact Form

- Spam protection with CSRF tokens
- Email integration for notifications
- Newsletter subscription option
- Responsive design
- Form validation

### Gallery System

- Interactive lightbox with image details
- Lazy loading for performance
- Filtering and categorization
- Location and post associations

## 🔧 Development

### Adding New Features

1. Create models in `blog/models.py`
2. Add views in `blog/views.py`
3. Create templates in `templates/blog/`
4. Add URLs in `blog/urls.py`
5. Update admin in `blog/admin.py`

### Running Tests

```bash
python manage.py test
```

### Database Operations

```bash
# Make migrations
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Load sample data
python manage.py loaddata fixtures/sample_data.json
```

## 📈 Performance

- **Caching**: Database caching enabled
- **Image Optimization**: Automatic image resizing
- **Lazy Loading**: Images load on scroll
- **Minification**: CSS and JS optimization
- **CDN Ready**: Static files optimized for CDN

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues:

1. Check the GitHub Issues page
2. Review the documentation
3. Contact: hello@margoanddrew.com

## 🌟 Acknowledgments

- Django framework and community
- Modern CSS techniques and animations
- Travel photography and content inspiration

---

**Built with ❤️ for sharing travel adventures around the world**
