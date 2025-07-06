# Next Commerz

Next Commerz is a comprehensive e-commerce platform built with a modern web technology stack, designed to deliver a robust, scalable, and user-centric online shopping experience. The application supports both customer-facing and administrative functionalities, providing a seamless workflow for product management, order processing, and user account operations.

## Purpose

The primary objective of Next Commerz is to demonstrate a full-featured, production-grade e-commerce solution. It integrates advanced authentication, product catalog management, order handling, and analytics, all within a performant and maintainable architecture.

## Features

- **User Authentication:** Secure registration, login, password reset, and account management.
- **Product Catalog:** Dynamic product listing, category filtering, detailed product pages, and image management.
- **Shopping Cart & Checkout:** Persistent cart, order summary, and streamlined checkout process.
- **Order Management:** Order history, order details, and real-time order status updates for users.
- **Admin Dashboard:** Product CRUD operations, category management, order tracking, and user management.
- **Analytics Integration:** Google Analytics 4 for traffic and usage monitoring.
- **Responsive UI:** Optimized for both desktop and mobile devices.
- **Robust Error Handling:** Custom error pages and graceful handling of edge cases.

## Technology Stack

- **Frontend:** Next.js 15 (App Router, React 18), Tailwind CSS
- **Backend:** Node.js (API routes), MongoDB (via Mongoose models)
- **Authentication:** NextAuth.js
- **State Management:** React Context, Redux (for select features)
- **Image Handling:** Cloudinary integration
- **Notifications:** React Toastify
- **Analytics:** react-ga4 (Google Analytics 4)

## Folder Structure

```
next-commerz/
├── next.config.mjs
├── package.json
├── public/
│   └── assets/
├── src/
│   ├── app/
│   │   ├── (authentication)/
│   │   ├── (user-dashboard)/
│   │   ├── admin/
│   │   ├── products/
│   │   ├── search/
│   │   └── ...
│   ├── components/
│   │   ├── adminComps/
│   │   ├── authentication/
│   │   ├── shared/
│   │   └── ...
│   ├── actions/
│   ├── lib/
│   ├── models/
│   └── utils/
└── ...
```

- **src/app/**: Application routes, layouts, and pages (Next.js App Router)
- **src/components/**: Reusable UI components, organized by feature
- **src/actions/**: Server actions for data fetching and mutations
- **src/lib/**: Utility libraries (e.g., Cloudinary, mailer, database connection)
- **src/models/**: Mongoose models for MongoDB collections
- **src/utils/**: Helper functions and utilities
- **public/assets/**: Static images and assets

## Setup Instructions

1. **Clone the Repository**

   ```sh
   git clone <repository-url>
   cd next-commerz
   ```

2. **Install Dependencies**

   ```sh
   npm install
   ```

3. **Environment Variables**

   - Create a `.env.local` file in the root directory.
   - Configure the following variables as required:
     - `MONGODB_URI` (MongoDB connection string)
     - `NEXTAUTH_SECRET` (for NextAuth.js)
     - `CLOUDINARY_URL` (Cloudinary API credentials)
     - `GOOGLE_ANALYTICS_ID` (Google Analytics 4 ID)
     - Any other required variables as per your deployment needs.

4. **Run the Development Server**

   ```sh
   npm run dev
   ```

   The application will be available at `http://localhost:3000`.

5. **Production Build**
   ```sh
   npm run build
   npm start
   ```

## How It Works

- **Routing:** Utilizes Next.js App Router for file-based routing and layouts, supporting both static and dynamic routes.
- **Authentication:** Managed via NextAuth.js, supporting secure sessions and protected routes for both users and administrators.
- **Data Management:** Server actions and API routes handle all data operations, interfacing with MongoDB through Mongoose models.
- **Admin Features:** Accessible only to authorized users, the admin dashboard provides interfaces for managing products, categories, orders, and users.
- **Image Uploads:** Product images are uploaded and managed via Cloudinary, ensuring efficient storage and delivery.
- **Analytics:** Google Analytics 4 is integrated for monitoring user engagement and traffic patterns.
- **UI/UX:** Tailwind CSS ensures a consistent, responsive, and accessible user interface across all devices.

## License

This project is proprietary and not open for external contributions or collaboration. All rights reserved.
