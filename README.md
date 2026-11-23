
# Gearora – Equipment Rental Platform

Gearora is a full-stack equipment rental marketplace that connects equipment owners with customers looking to rent equipment for a specific period. The platform offers a seamless experience for discovering, listing, booking, and managing rentals, with secure authentication, role-based access control, online payments, and dynamic dashboard analytics.

Customers can easily find and rent equipment, equipment owners can manage their rental businesses, and administrators can monitor and manage the entire platform through a dedicated dashboard.

## Live Project

- **Live Website:** [https://gearora.vercel.app](https://gearora.vercel.app)
- **Client Repository:** [Gearora – Client](https://github.com/badrulalambd/gearora)
- **Server Repository:** [Gearora – Server](https://github.com/badrulalambd/gearora-server)

---

## Project Purpose

The purpose of Gearora is to create a convenient, secure, and user-friendly equipment rental marketplace where customers can rent equipment for their needs and owners can generate income by listing their equipment.

The platform streamlines the entire rental process, from equipment discovery and booking to payment and rental management, while providing administrators with the tools to monitor platform activities and performance.

---

## Key Features

### Authentication & Authorization
- Email and password authentication using Better Auth.
- Google social login.
- Secure JWT-based authentication for backend API requests.
- Role-based access control for Customers, Equipment Owners, and Admins.
- Protected routes using Next.js Proxy.
- Custom Express middleware for verifying JWT tokens and user roles.
- Role-specific dashboards and permissions.

### Equipment Discovery & Search
- Browse approved equipment listings.
- Dynamic server-side search by equipment title and category.
- Server-side filtering by equipment category and availability.
- Sort equipment by price and recently added listings.
- View detailed equipment information, rental pricing, location, condition, and terms.
- Responsive equipment listing layouts.

### Equipment Rental & Booking
- Book equipment for a selected rental period.
- Select rental duration and required quantity.
- Calculate rental costs based on rental duration and quantity.
- Check equipment availability before booking.
- Manage rental bookings from dedicated dashboards.
- Track booking and payment statuses.

### Online Payment Integration
- Secure online payments using Stripe.
- Stripe Checkout integration for rental payments.
- Store transaction information in the database.
- Track payment statuses.
- Payment success flow after successful transactions.

### Customer Dashboard
- **My Rentals:** View rental bookings, rental dates, booking status, payment status, and rental amounts.
- **Favorites:** Save favorite equipment, view saved listings, and remove favorites.
- **Profile:** View and update personal profile information.

### Equipment Owner Dashboard
- **Add Equipment:** Create new equipment listings with pricing, availability, condition, and rental terms.
- **My Equipment:** View, update, and manage equipment listings.
- **My Equipment Rentals:** Monitor rental bookings, customer information, rental periods, payment status, and booking status.
- **Owner Analytics:** Track total listed equipment, completed rentals, total earnings, and monthly earnings.

### Admin Dashboard
- **All Users:** View registered users and manage user roles.
- **All Equipment:** Review, approve, reject, update, and delete equipment listings.
- **All Rentals:** Monitor and manage rental records and payment statuses.
- **Admin Analytics:** Monitor total users, equipment listings, bookings, pending approvals, completed rentals, total revenue, and monthly booking statistics.

### Dashboard Analytics
- Dynamic analytics for both administrators and equipment owners.
- Data calculated from users, equipment, bookings, and payments collections.
- Track total users, equipment, bookings, completed rentals, and revenue.
- Monitor pending equipment approvals.
- Visualize monthly booking statistics.
- Track equipment owner earnings and monthly revenue.

### Responsive & Interactive UI
- Responsive design for desktop, tablet, and mobile devices.
- Modern UI with reusable components.
- Smooth animations and interactions using Framer Motion.
- Dark and light theme support.
- Interactive charts and data visualization.
- Toast notifications for user feedback.
- Loading states and error handling.

---

## Technology Stack

### Frontend
- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- Shadcn UI / Base UI

### Authentication & Authorization
- Better Auth
- MongoDB Adapter
- JWT
- Role-Based Access Control (RBAC)

### Backend
- Express.js
- MongoDB
- JWT Authentication
- Custom Role-Based Middleware

### Payment Integration
- Stripe

---

## NPM Packages

### Dependencies

- `@base-ui/react` – Accessible and customizable UI components.
- `@better-auth/mongo-adapter` – MongoDB adapter for Better Auth.
- `better-auth` – Authentication and session management.
- `class-variance-authority` – Component style variant management.
- `cn` – Class name utility package.
- `embla-carousel-react` – Carousel and slider functionality.
- `framer-motion` – Animations and motion effects.
- `lucide-react` – Icon library.
- `mongodb` – MongoDB database integration.
- `next` – React framework for application development.
- `next-themes` – Dark and light theme management.
- `react` – UI component library.
- `react-dom` – React DOM rendering.
- `react-hot-toast` – Toast notifications.
- `recharts` – Charts and data visualization.
- `shadcn` – UI component tooling.
- `tw-animate-css` – CSS animations.

### DevDependencies

- `@tailwindcss/postcss` – Tailwind CSS PostCSS integration.
- `@types/node` – TypeScript definitions for Node.js.
- `@types/react` – TypeScript definitions for React.
- `@types/react-dom` – TypeScript definitions for React DOM.
- `eslint` – Code linting.
- `eslint-config-next` – Next.js ESLint configuration.
- `prettier` – Code formatting.
- `prettier-plugin-tailwindcss` – Tailwind CSS class formatting.
- `tailwindcss` – Utility-first CSS framework.
- `typescript` – TypeScript compiler.

---

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/badrulalambd/gearora.git
```

### 2. Navigate to the Project Directory

```bash
cd gearora
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory and add the following environment variables:

```env
BETTER_AUTH_SECRET=your_secret
BETTER_AUTH_URL=http://localhost:3000

NEXT_PUBLIC_API_BASE_URL=http://localhost:5000

MONGODB_USER=your_mongodb_username
MONGODB_PASSWORD=your_mongodb_password
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_api_key
```

> **Note:** Replace the placeholder values with your actual credentials. Never commit your `.env.local` file or expose sensitive credentials in your public repository.

### 5. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Backend Repository

The backend is maintained in a separate repository.

- **Server Repository:** [https://github.com/badrulalambd/gearora-server](https://github.com/badrulalambd/gearora-server)

The backend handles API requests, database operations, equipment management, rental bookings, payment-related operations, JWT verification, role-based authorization, and dashboard analytics.

---

## Developer

**GitHub:** [badrulalambd](https://github.com/badrulalambd)

---

<p align="center">
  <strong>Gearora – Rent smarter. Work better. Gear up for anything.</strong>
</p>
