# TechSelf - React Electronics E-Commerce

A full-featured modern Electronics & Gadgets E-Commerce web application rebuilt from [techself.demos.tailgrids.com](https://techself.demos.tailgrids.com/).

## 🚀 Features

- **Modern Tech Stack**: React 18, React Router v6, Tailwind CSS v4, Lucide Icons
- **Responsive Layout**: Designed for mobile, tablet, and desktop screens
- **Complete Store Functionality**:
  - **Homepage**: Hero banner, featured categories, trending products, promotional CTA, newsletter, testimonial & blog sections
  - **Shop Catalog (`/shop`)**: Product filtering, sorting, price slider, categories, grid view
  - **Product Detail (`/product/:id`)**: Gallery slider, specs, reviews, quantity selector, add to cart
  - **Cart Drawer & Checkout (`/checkout`)**: Slide-over interactive shopping cart, order summary, multi-step checkout with payment methods
  - **Order Confirmation (`/thank-you`)**: Order success screen with tracking details
- **All Assets Included**: 100% of logos, product photography, banners, category icons, payment badges, and SVGs are stored locally in `./images/`.

## 📁 Directory Structure

```
techself/
├── assets/
│   ├── index-DxKx9-af.js       # Bundled React application
│   └── index-VHkr47b6.css      # TailGrids & Tailwind CSS bundle
├── flags/                      # Country flag icons
├── images/                     # 49 High-res product & UI image assets
│   ├── blog/
│   ├── categories/
│   ├── cta/
│   ├── footer/
│   ├── hero/
│   ├── logo/
│   ├── payment/
│   ├── product-slider/
│   ├── products/
│   └── user/
├── favicon.png                 # Site favicon
├── index.html                  # HTML5 entrypoint
├── package.json                # Project manifest & npm scripts
├── server.mjs                  # Node.js SPA preview server with routing
└── README.md                   # Documentation
```

## 🛠️ How to Run & Preview

### Start Preview Server
```bash
npm start
# or
npm run preview
# or
node server.mjs
```

By default, the preview runs on port `3000`:
- **Local Preview**: [http://localhost:3000](http://localhost:3000)
- **Shop Catalog**: [http://localhost:3000/shop](http://localhost:3000/shop)
- **Product Details**: [http://localhost:3000/product/1](http://localhost:3000/product/1)
- **Checkout**: [http://localhost:3000/checkout](http://localhost:3000/checkout)

To run on a different port:
```bash
PORT=8080 npm start
```
