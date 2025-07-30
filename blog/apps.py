from django.apps import AppConfig


class BlogConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'blog'
    verbose_name = 'Travel Blog'
    
    def ready(self):
        """
        Ready method for app initialization - optimized for performance
        """
        # Import signal handlers or other initialization code here if needed
        pass
