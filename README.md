# 🔨 Nethmi Hardware — Full-Stack Web Application & Admin Portal

> *"Everything You Need to Build, Fix and Create"*

A production-grade, high-performance, fully responsive e-commerce storefront and store management portal built for **Nethmi Hardware** (Kiribathgoda, Sri Lanka).

---

## 🌟 Key Features

### 🛒 Public Storefront
- **Modern Industrial Aesthetic:** Custom tailored color system with vibrant primary orange (`#F97316`), deep charcoal (`#1F2937`), and crisp typography (Google Fonts *Poppins* & *Inter*).
- **Light & Dark Mode:** Smooth theme switcher with automatic preference detection and `localStorage` persistence.
- **Dynamic Product Catalog (`/products`):**
  - Instant live keyword search (by title, brand, description, and SKU).
  - Department filtering across 8 categories.
  - Price range filters & stock status filters (`In Stock` / `Out of Stock`).
  - Multi-criteria sorting (Newest, Price Low-High, Price High-Low, Name A-Z).
  - Pagination, loading skeletons, and smart empty states.
- **Interactive Product Detail (`/products/:slug`):**
  - Multi-photo gallery preview with interactive thumbnails.
  - Stock availability pill, discount badges, and key technical specifications table.
  - **One-Click WhatsApp Enquiry:** Auto-generates a formatted WhatsApp message with product name, SKU, price, and current URL.
  - "Add to Enquiry List" and "Call Store" direct actions.
  - Related product recommendations from the same department.
- **Enquiry Cart & Slide-Over Drawer (`/enquiry-list`):**
  - Persistent cart state in `localStorage`.
  - Live quantity adjustment, item deletion, and estimated total calculation.
  - **Batch WhatsApp Quotation Generator:** Formats all items, quantities, and prices into a single WhatsApp enquiry message.
- **Project Quotation Builder / BOQ (`/quote`):**
  - Dynamic material list builder (Item, Quantity, Unit dropdown: *Pieces, Bags, Meters, Kg, Liters, Boxes*).
  - One-click **"Import from Enquiry List"** to fill table automatically.
  - Job-site delivery toggle & site notes.
  - Direct database submission + optional WhatsApp copy.
- **Interactive Department Grid (`/categories`):**
  - 8 core hardware categories with icon badges and live product counters.
- **Store Photo Gallery (`/gallery`):**
  - Masonry grid layout with category filter tabs.
  - Full-screen Lightbox image viewer with keyboard/swipe navigation.
- **Contact Page & Map (`/contact`):**
  - Spam honeypot protected submission form with database storage.
  - Interactive Google Maps embed, phone click-to-call, and business hours breakdown.
- **Floating WhatsApp CTA:** Pulsating bottom-right quick chat launcher.
- **Full SEO & Structured Data:** OpenGraph meta tags, `robots.txt`, `sitemap.xml`, and Google JSON-LD schemas (`HardwareStore` & `Product`).

---

### 🔒 Admin Management Portal (`/admin`)
- **Secure Authentication:** JWT token authentication with `bcryptjs` password hashing and auto-logout on expiry.
- **Dashboard Overview:** Live KPI counters (Total Products, Categories, Unread Inquiries, Pending Quotes, Out of Stock warnings), quick action buttons, and recent activity feeds.
- **Product Management (`/admin/products`):**
  - Complete CRUD with pagination, search, and category filters.
  - Multiple image upload via Multer (max 3MB with mime-type validation).
  - Dynamic key-value technical specifications builder.
  - Feature toggle on home page & special offer discount badges.
- **Category Management (`/admin/categories`):** Add and edit departments, icons, and banner graphics.
- **Quote Requests Center (`/admin/quotes`):**
  - View itemized material lists and quantities submitted by contractors.
  - Workflow status management (`New` ➔ `Contacted` ➔ `Completed` ➔ `Cancelled`).
  - Direct WhatsApp reply link to customer.
- **Messages Inbox (`/admin/messages`):** Read/unread toggle, delete, and email/WhatsApp quick links.
- **Photo Gallery Manager (`/admin/gallery`):** Upload photos to store showroom, power tools, or delivery fleet categories.
- **Testimonial Reviews Manager (`/admin/testimonials`):** Manage verified builder reviews.
- **Live Site Settings Editor (`/admin/settings`):** Change phone numbers, WhatsApp digits, opening hours, physical address, hero text, and promotional banners without editing code.
- **Password Manager (`/admin/password`):** Securely update admin password.

---

## 🚀 Quick Start (Local Setup)

### 1. Prerequisites
- **Node.js**: v18+ (tested on Node.js 18, 20, 22, and 24)
- **npm** or **yarn**

### 2. Installation & Database Seeding

Open terminal in the project root:

```bash
# Install root, backend, and frontend dependencies
npm run install:all

# Seed database with 8 categories, 24 realistic products, testimonials & settings
npm run seed
```

### 3. Start Development Server

Run both client (Vite on port 5173) and server (Express on port 5001) simultaneously:

```bash
npm run dev
```

- 🌐 **Public Storefront:** [http://localhost:5173](http://localhost:5173)
- 🔒 **Admin Portal:** [http://localhost:5173/admin](http://localhost:5173/admin)
- ⚙️ **Backend API:** [http://localhost:5001/api](http://localhost:5001/api)

---

## 🔑 Default Admin Credentials

On first run, the database is automatically seeded with default credentials:

- **Username:** `admin`
- **Password:** `admin123`

> ⚠️ **Important:** After logging in for the first time, go to **Admin Dashboard > Change Password** (`/admin/password`) to set your custom secure password.

---

## 📁 Project Structure

```
nethmi-hardware/
├── package.json               # Root scripts (dev, build, seed, start)
├── README.md                  # Documentation and deployment guide
├── server/
│   ├── .env                   # Server environment variables
│   ├── .env.example           # Example environment template
│   ├── index.js               # Express application entry & security middleware
│   ├── db/
│   │   ├── database.js        # SQLite persistence layer with sql.js (zero C++ build dependencies)
│   │   ├── seed.js            # Database seed script (24 products, 8 categories, settings)
│   │   └── nethmi_hardware.sqlite # SQLite local database file
│   ├── middleware/
│   │   ├── auth.js            # JWT Bearer verification middleware
│   │   └── upload.js          # Multer 3MB image upload validator
│   ├── controllers/           # Products, Categories, Quotes, Messages, Gallery, Settings
│   ├── routes/
│   │   ├── publicRoutes.js    # Public storefront API
│   │   └── adminRoutes.js     # Protected admin API
│   └── uploads/               # Uploaded images directory
└── client/
    ├── package.json
    ├── vite.config.js         # Vite configuration with backend proxy
    ├── tailwind.config.js     # Custom color tokens & fonts
    ├── index.html             # Google fonts & meta tags
    ├── public/
    │   ├── robots.txt         # SEO web crawler permissions
    │   └── sitemap.xml        # Search engine sitemap
    └── src/
        ├── App.jsx            # Main app router & layout switcher
        ├── main.jsx           # React DOM root with context wrappers
        ├── index.css          # Tailwind base & custom scrollbars
        ├── context/
        │   ├── ThemeContext.jsx   # Light / Dark mode
        │   ├── EnquiryContext.jsx # Shopping / Enquiry cart state & WhatsApp builder
        │   └── AuthContext.jsx    # Admin JWT auth session
        ├── components/
        │   ├── Navbar.jsx         # Sticky header with mobile drawer
        │   ├── Footer.jsx         # Rich 4-column footer
        │   ├── FloatingWhatsApp.jsx # Floating chat CTA
        │   ├── ProductCard.jsx    # Hardware product card
        │   ├── EnquiryDrawer.jsx  # Slide-over enquiry list
        │   ├── SEOHead.jsx        # Dynamic title & Schema.org JSON-LD
        │   └── AdminSidebar.jsx   # Admin navigation
        └── pages/
            ├── Home.jsx           # Hero, categories, featured, offers, reviews
            ├── Products.jsx       # Catalog with search, filters, pagination
            ├── ProductDetail.jsx  # Specs table, gallery, WhatsApp CTA
            ├── Categories.jsx     # Category cards with product counts
            ├── About.jsx          # Store history, values, milestones
            ├── Gallery.jsx        # Masonry photo grid & lightbox
            ├── Contact.jsx        # Contact form with spam honeypot & Google Map
            ├── GetQuote.jsx       # Dynamic BOQ quotation builder
            ├── EnquiryList.jsx    # Full enquiry list with WhatsApp batch link
            ├── NotFound.jsx       # Custom 404 page
            └── admin/
                ├── AdminLogin.jsx
                ├── AdminDashboard.jsx
                ├── AdminProducts.jsx
                ├── AdminCategories.jsx
                ├── AdminQuotes.jsx
                ├── AdminMessages.jsx
                ├── AdminGallery.jsx
                ├── AdminTestimonials.jsx
                ├── AdminSettings.jsx
                └── AdminPassword.jsx
```

---

## 🛠️ How to Customize for Your Hardware Store

1. **Update Store Contact Details & Social Links:**
   - Log into the Admin panel (`/admin`), click **Site Settings**, and edit your Phone, WhatsApp number, Email, Address, and Opening Hours.
2. **Replace Placeholder Logo:**
   - The logo text and icon are located in [`client/src/components/Navbar.jsx`](file:///client/src/components/Navbar.jsx) and [`client/src/components/Footer.jsx`](file:///client/src/components/Footer.jsx). Replace with your `<img>` tag or custom SVG.
3. **Add Your Real Products:**
   - Navigate to **Admin Panel > Products > Add New Product**. You can upload up to 5 photos per product, specify technical details, and set wholesale offer prices.

---

## 🚢 Deployment Guide

### Option 1: Monolithic Deployment (Single VPS / Railway / Render / DigitalOcean)
1. Build the frontend bundle:
   ```bash
   npm run build --prefix client
   ```
2. Serve client static assets in `server/index.js` or with Nginx.
3. Set environment variables on your host:
   ```env
   PORT=5001
   JWT_SECRET=your_super_strong_random_secret
   ADMIN_USERNAME=your_admin_user
   ADMIN_PASSWORD=your_admin_password
   ```
4. Start with PM2:
   ```bash
   pm2 start server/index.js --name "nethmi-hardware"
   ```

### Option 2: Decoupled Deployment (Frontend on Vercel + Backend on Render/Railway)
1. **Frontend (Vercel / Netlify):**
   - Root Directory: `client`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Set environment variable `VITE_API_BASE=https://your-backend-api.onrender.com/api`
2. **Backend (Render / Railway):**
   - Root Directory: `server`
   - Start Command: `npm start`
   - Attach a persistent disk for `/server/uploads` and `/server/db` so SQLite database and images persist across redeploys.

---

## 📄 License
This project is proprietary and custom-built for **Nethmi Hardware**. All rights reserved.
