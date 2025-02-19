# Cake Website

SaaS Website is a Progressive Web App (PWA) designed to streamline appointment booking and customer management for small businesses. Built with Next.js, React, TypeScript, Prisma, and Tailwind CSS, the Website delivers a fast, responsive, and intuitive experience for customers as well as robust tools for administrators.

## Table of Contents

- [Overview]
- [Features]
- [Technology Stack]
- [Installation]


## Overview

The software enables small businesses to manage appointments seamlessly. Users can book appointments using an easy-to-use interface that guides them through selecting the right branch, services, and available staff. Administrators benefit from real‑time notifications and calendar views that display current bookings and available time slots without needing to refresh the page. The application supports internationalization and comes with a fully responsive design and PWA features that ensure a native-like experience on mobile and desktop devices.

## Features

- **Progressive Web App**: Fast, installable, and responsive across all devices.
- **Real-Time Updates**: Automatically notifies administrators when new appointments are booked.
- **Intuitive Booking Interface**: Includes multi‑step forms, dropdowns for branch, service, and staff selection, and a calendar view for available time slots.
- **Secure Authentication**: Integrated with NextAuth and supports multiple providers.
- **Internationalization**: Built-in multi-language support.
- **Automated Email Notifications**: Uses Resend to send booking confirmations and reminders.

## Technology Stack

- **Frontend**: Next.js, React, Tailwind CSS, TypeScript
- **Backend**: Next.js API Routes, Prisma ORM, PostgreSQL, NextAuth.js
- **Real-Time Communication**: WebSockets for live updates
- **Deployment**: Vercel for web hosting and Appwrite for database and bucket hosting

## Installation

1. **Clone the Repository**
    ```
    git clone https://github.com/yourusername/saas-website.git
    cd saas-website
    ```

2. **Install Dependencies**
    ```
    npm install
    ```

3. **Configure Environment Variables**

    Create a `.env` file at the project root and add the following:
    ```
    DATABASE_URL=your_database_url
    SHADOW_DATABASE_URL=your_shadow_database_url
    AUTH_SECRET=your_auth_secret
    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret
    RESEND_API_KEY=your_resend_api_key
    ```
    
4. **Generate the Prisma Client and Run Migrations**
    ```
    npm run build
    npm run migration:run
    ```

5. **Start the Development Server**
    ```
    npm run dev
    ```

**PS:** In this repository, the database is configured for a dental clinic website.



