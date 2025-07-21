# Assets Directory

This directory contains all static assets for the restaurant ordering system.

## Structure

- **images/** - Product photos, food images, general photography
- **logos/** - Restaurant logos, brand assets, partner logos  
- **icons/** - Custom icons, favicons, app icons
- **backgrounds/** - Background images, patterns, textures
- **ui/** - UI elements, illustrations, graphics

## Usage

Assets in this directory can be referenced from the app using absolute paths:

```jsx
// Example usage in components
<img src="/assets/images/food-item.jpg" alt="Food item" />
<img src="/assets/logos/restaurant-logo.svg" alt="Restaurant logo" />
```

## File Naming

- Use kebab-case for filenames: `grilled-salmon.jpg`
- Include descriptive names: `hero-background.jpg` not `bg1.jpg`
- Use appropriate extensions: `.svg` for logos, `.jpg`/`.webp` for photos

## Optimization

- Optimize images before adding (use WebP when possible)
- Keep file sizes reasonable for web delivery
- Consider responsive image variants for different screen sizes