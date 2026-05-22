# 🛍️ TrendHive

TrendHive is a modern e-commerce project for beauty, fashion, electronics, skincare, toys, and lifestyle products. The project is organized as a clean full-stack workspace with a dedicated frontend app and backend API.

## ✨ Highlights

- 🖥️ Responsive React storefront
- 🎨 TailwindCSS UI with reusable components
- 🛒 Cart, wishlist, checkout, product detail, and category pages
- 🔐 Admin login and admin dashboard screens
- 🔎 Product search, filtering, and recommendations
- 🧠 Backend API scaffold with Express and MongoDB support
- 📦 Sample product fallback when MongoDB is not connected
- 🧪 Frontend test setup with Vitest
- 🚀 Root scripts to run frontend and backend together

## 🧱 Project Structure

```text
TrendHive/
  HiveUI/        # Frontend app: React + Vite + TailwindCSS
  HiveCore/      # Backend API: Node.js + Express + Mongoose
  package.json   # Root workspace scripts
  README.md      # Project documentation
```

## 🧰 Tech Stack

**Frontend**

- ⚛️ React
- ⚡ Vite
- 🎨 TailwindCSS
- 🧩 Radix UI / shadcn-style components
- 🧭 React Router
- 🗃️ Zustand
- 🧪 Vitest

**Backend**

- 🟢 Node.js
- 🚂 Express
- 🍃 MongoDB with Mongoose
- 🔑 JWT authentication scaffold
- 🔒 bcrypt password hashing
- 🌐 CORS and dotenv

## 🚀 Getting Started

### 1. Install Dependencies

From the repository root:

```bash
npm install
npm install --prefix HiveUI
npm install --prefix HiveCore
```

### 2. Configure Backend Environment

Create a backend environment file:

```bash
cd HiveCore
cp .env.example .env
```

Example values:

```env
PORT=5000
CLIENT_ORIGIN=http://localhost:8080
MONGO_URI=mongodb://127.0.0.1:27017/trendhive
JWT_SECRET=replace-with-a-long-random-secret
```

### 3. Run the Project

Run frontend and backend together:

```bash
npm run dev
```

Run only the frontend:

```bash
npm run dev:ui
```

Run only the backend:

```bash
npm run dev:core
```

## 🌐 Local URLs

- 🖥️ Frontend: `http://localhost:8080`
- 🧠 Backend: `http://localhost:5000`
- ❤️ Health check: `http://localhost:5000/api/health`

## 📜 Root Scripts

```bash
npm run dev       # Run HiveUI and HiveCore together
npm run dev:ui    # Run only HiveUI
npm run dev:core  # Run only HiveCore
npm run build     # Build HiveUI
npm run lint      # Lint HiveUI
npm run test      # Test HiveUI
```

## 🖥️ HiveUI Frontend

The frontend lives in `HiveUI`.

```bash
cd HiveUI
npm run dev
npm run build
npm run lint
npm run test
```

Frontend features include:

- 🏠 Home page
- 🧴 Category pages
- 🛍️ Product detail pages
- 🛒 Cart drawer
- 💖 Wishlist
- 💳 Checkout flow
- 🔐 Login screen
- 🛠️ Admin dashboard

## 🧠 HiveCore Backend

The backend lives in `HiveCore`.

```bash
cd HiveCore
npm run dev
```

Backend features include:

- ✅ API health route
- 📦 Product listing route
- 🔍 Product detail route
- ➕ Product creation route
- 👤 User registration route
- 🔑 User login route
- 🍃 MongoDB connection support
- 📋 In-memory sample products when MongoDB is unavailable

## 🔌 API Routes

### Health

```http
GET /api/health
```

### Products

```http
GET /api/products
GET /api/products/:id
POST /api/products
```

Product query examples:

```http
GET /api/products?category=perfumes
GET /api/products?search=serum
```

### Authentication

```http
POST /api/auth/register
POST /api/auth/login
```

## 🧪 Verification

Frontend checks:

```bash
cd HiveUI
npm run lint
npm run test
npm run build
```

Backend smoke check:

```bash
cd HiveCore
npm run dev
```

Then open:

```text
http://localhost:5000/api/health
```

## 🗂️ Environment Files

Environment files are ignored by git:

```text
.env
.env.*
HiveUI/.env
HiveCore/.env
```

Example files are allowed:

```text
.env.example
HiveUI/.env.example
HiveCore/.env.example
```

## 🧹 Lovable Cleanup

This project has been cleaned of Lovable-specific references, including:

- 🧼 Lovable HTML metadata
- 🧼 Lovable Vite tagger plugin
- 🧼 Lovable dependency references
- 🧼 Lovable lockfile traces

## 🚢 Deployment Notes

Suggested deployment split:

- 🌍 Deploy `HiveUI` to Vercel, Netlify, or any static frontend host
- 🧠 Deploy `HiveCore` to Render, Railway, Fly.io, or a Node-capable server
- 🍃 Use MongoDB Atlas for production database hosting

Before production, set secure environment variables:

```env
CLIENT_ORIGIN=https://your-frontend-domain.com
MONGO_URI=your-production-mongodb-uri
JWT_SECRET=your-production-secret
```

## 🤝 Contributing

1. 🍴 Fork the project
2. 🌿 Create a feature branch
3. 🛠️ Make your changes
4. 🧪 Run checks
5. 📬 Open a pull request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Built with ❤️ by Vishant Chaudhary.
