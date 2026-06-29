# MASARIMA Shopify Theme Foundation

MASARIMA is a premium skincare Shopify theme foundation based on Dawn-style Online Store 2.0 architecture.

This repository currently contains only the global foundation layer. It intentionally does not include homepage sections, product pages, hero sections, merchandising sections, or content sections.

## Foundation scope

- Global CSS design token system
- Theme Editor configurable color, typography, spacing, radius, shadow, motion, z-index, and container tokens
- Reusable button, form, card, image, video, layout, grid, flex, spacing, and animation primitives
- Liquid snippets for future sections and templates
- Minimal JavaScript for progressive enhancement only
- Blank JSON templates for Online Store 2.0 compatibility

## Architecture notes

- No Bootstrap, Tailwind, jQuery, or build step
- Uses Liquid, CSS custom properties, and vanilla JavaScript
- Future sections should consume existing tokens and component classes instead of introducing local styling systems
- Future app-compatible sections can use `snippets/app-block.liquid` as the app block rendering pattern

## Theme development

Use Shopify CLI against a development store:

```sh
shopify theme dev
```

Before adding storefront sections, validate that new work uses the foundation tokens in `snippets/css-variables.liquid` and the component assets in `assets/`.
