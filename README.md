# MINIMA E-Commerce Website

A modern, minimalist e-commerce website for a clothing brand featuring a bento card-based design system with frosted glass effects.

## Features

- **Modern Design System**

  - Bento card-based layouts
  - Frosted glass effect (backdrop-filter: blur)
  - Clean, minimalist UI with ample white space
  - Subtle hover animations and micro-interactions

- **Responsive Experience**

  - Fully responsive design for mobile, tablet, and desktop
  - Adaptive layouts with CSS Grid and Flexbox
  - Mobile-optimized navigation and filters

- **Key Pages**

  - Homepage with bento grid and hero section
  - Product catalog with filtering and sorting
  - Product detail page with image gallery
  - About page (placeholder)
  - Contact page (placeholder)

- **Interactive Elements**
  - Color and size selectors
  - Product image gallery with thumbnails
  - Filter sidebar with interactive controls
  - Shopping cart functionality
  - Modals for size guide and cart confirmation

## Technical Implementation

- Semantic HTML5 structure
- CSS with custom properties (variables) for consistent theming
- Vanilla JavaScript for interactivity
- Accessible design principles
- Performance optimization techniques

## Installation

1. Clone the repository:

```
git clone https://github.com/yourusername/minima-ecommerce.git
```

2. Open the project folder:

```
cd minima-ecommerce
```

3. Open `index.html` in your browser, or use a local development server:

```
npx serve
```

## Project Structure

```
minima-ecommerce/
├── index.html              # Homepage
├── css/
│   ├── style.css           # Main CSS with global styles
│   ├── catalog.css         # Styles for the catalog page
│   └── product.css         # Styles for the product page
├── js/
│   ├── main.js             # Shared JavaScript functions
│   ├── catalog.js          # Catalog page functionality
│   └── product.js          # Product page functionality
├── images/                 # Image assets
└── pages/
    ├── catalog.html        # Product catalog page
    ├── product.html        # Product detail page
    ├── about.html          # About page (placeholder)
    └── contact.html        # Contact page (placeholder)
```

## Browser Support

The website is compatible with modern browsers that support CSS Grid, Flexbox, and the `backdrop-filter` property, including:

- Chrome 76+
- Firefox 70+
- Safari 12.1+
- Edge 79+

For browsers that don't support `backdrop-filter`, a fallback background color is provided.

## Future Enhancements

- Add authentication system
- Implement full checkout flow
- Add product search functionality
- Create wishlist feature
- Develop product review system
- Add animations with Intersection Observer API

## License

This project is licensed under the MIT License - see the LICENSE file for details.
