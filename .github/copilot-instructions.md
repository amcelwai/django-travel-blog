# Copilot Instructions for Margo & Drew's Adventures Travel Blog

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview
This is a Django-based travel and food blog for "Margo & Drew's Adventures". The blog focuses on culinary travel experiences, authentic food discoveries, and destination recommendations.

## Key Technologies
- **Backend**: Django 5.2.4
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Database**: SQLite (development)
- **Image Handling**: Pillow for image processing
- **Styling**: CSS Grid, Flexbox, CSS Variables for theming

## Project Structure
- `blog/` - Main Django app containing models, views, templates
- `static/` - CSS, JavaScript, and static assets
- `templates/blog/` - Django HTML templates
- `media/` - User-uploaded images (blog posts, destinations, gallery)

## Models Overview
- **BlogPost**: Main travel blog posts with featured images, categories, and SEO fields
- **Destination**: Countries/cities visited with location data and descriptions
- **Photo**: Gallery images linked to posts and destinations
- **Category**: Blog post categories (Food Guide, Adventure, Cultural Sites, etc.)
- **FoodExperience**: Specific dishes and restaurants with ratings
- **AboutPage**: Singleton model for about page content

## Design Principles
- **Blog-focused**: Personal storytelling, not commercial booking
- **Mobile-first**: Responsive design with mobile optimization
- **Accessibility**: ARIA labels, skip links, keyboard navigation
- **Performance**: Optimized images, lazy loading, efficient CSS
- **SEO-friendly**: Meta tags, structured data, semantic HTML

## Styling Guidelines
- Use CSS variables for consistent theming
- Follow the established color palette (blues, whites, accent colors)
- Maintain consistent spacing and typography
- Ensure all interactive elements have hover states
- Support both light and dark themes

## Image Management
- All user images should be automatically resized to max 1200px
- Use `loading="lazy"` for all images except hero/above-fold content
- Provide alt text for accessibility
- Support webp format when possible

## Content Strategy
- Focus on authentic personal experiences
- Include food ratings and recommendations
- Provide practical travel tips
- Share honest opinions and genuine stories
- Maintain consistency with the "Margo & Drew" brand voice

## Development Notes
- Use Django best practices for models, views, and templates
- Implement proper error handling and validation
- Follow PEP 8 style guidelines for Python code
- Use semantic HTML5 elements
- Ensure CSRF protection on all forms
- Implement proper image optimization and compression
