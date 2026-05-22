# 🛍️ TrendHive – Ecommerce Website

**TrendHive** is a modern full-stack e-commerce web application for beauty, fashion, electronics, skincare, toys, and lifestyle products. It delivers a feature-rich, responsive storefront with robust backend APIs, seamless authentication, cart and checkout flows, and an admin dashboard. Built with cutting-edge web technologies, TrendHive is designed for easy deployment and developer productivity in a monorepo structure.

---

## ✨ Features

- Responsive and modern React + TailwindCSS storefront
- Product listing, detail, search, filtering, and recommendations
- Cart, wishlist, secure checkout, and admin dashboard
- User authentication (register/login)
- JWT and bcrypt-based security
- RESTful API built with Node.js, Express, and MongoDB (Mongoose)
- In-memory products fallback if MongoDB is unavailable
- Frontend tests with Vitest, code linting
- One-command concurrent development of frontend & backend

---

## 🏗️ Project Structure

```
TrendHive/
├── apps/
│   ├── hive-ui/           # Frontend: React, Vite, TailwindCSS, Zustand, Radix UI/shadcn, Vitest
│   │   ├── src/
│   │   │   ├── components/     # Reusable UI components
│   │   │   ├── pages/          # Route/page files
│   │   │   ├── store/          # State management (Zustand)
│   │   │   ├── hooks/          # Custom hooks
│   │   │   ├── utils/          # Utilities/helpers
│   │   │   ├── main.tsx
│   │   │   └── ...
│   │   ├── public/
│   │   ├── .env.example
│   │   ├── package.json
│   │   └── ...
│   └── hive-core/          # Backend: Node.js, Express, MongoDB (Mongoose), JWT
│       ├── src/
│       │   ├── controllers/    # API route logic
│       │   ├── models/         # Data models (Mongoose schemas)
│       │   ├── middleware/     # Express middlewares (auth, error, etc.)
│       │   ├── routes/         # Express routes (products, auth)
│       │   ├── utils/          # Utility functions
│       │   ├── api/            # Handlers for API endpoints
│       │   └── index.ts
│       ├── .env.example
│       ├── package.json
│       └── ...
├── packages/              # (optional) Shared code (types, utils) for monorepo
├── .gitignore
├── package.json           # Workspace & root dev scripts
├── README.md
```

---

## 🚀 Getting Started

### 1. Clone and Install

```sh
git clone https://github.com/im-vishu/TrendHive.git
cd TrendHive

npm install
npm install --prefix apps/hive-ui
npm install --prefix apps/hive-core
```

### 2. Backend Environment Setup

```sh
cd apps/hive-core
cp .env.example .env
# Edit .env as needed
```
Template:
```
PORT=5000
CLIENT_ORIGIN=http://localhost:8080
MONGO_URI=mongodb://127.0.0.1:27017/trendhive
JWT_SECRET=replace-with-a-long-random-secret
```

### 3. Dev Server

To run frontend and backend together (from root):
```sh
npm run dev
```

Run frontend only:
```sh
npm run dev:ui
```

Run backend only:
```sh
npm run dev:core
```

- Frontend: http://localhost:8080
- Backend: http://localhost:5000
- API Health: http://localhost:5000/api/health

---

## 🔌 API Reference

**Health Check**
- `GET /api/health`

**Products**
- `GET /api/products`
- `GET /api/products/:id`
- `POST /api/products`
- Examples:  
  `GET /api/products?category=perfumes`  
  `GET /api/products?search=serum`

**Authentication**
- `POST /api/auth/register`
- `POST /api/auth/login`

---

## 🧪 Verification & Checks

**Frontend:**
```sh
cd apps/hive-ui
npm run lint
npm run test
npm run build
```

**Backend:**
```sh
cd apps/hive-core
npm run dev
# Visit http://localhost:5000/api/health
```

---

## 🗄️ Environment & Secrets

- `.env`, `.env.*`, and all env files in subfolders are **gitignored**
- Example files: `.env.example`, `apps/hive-ui/.env.example`, `apps/hive-core/.env.example`

---

## 🚢 Deployment Advice

- **Frontend (`apps/hive-ui`)**: Deploy to Vercel, Netlify, or any static host
- **Backend (`apps/hive-core`)**: Deploy to Render, Railway, Fly.io, or a Node-capable server
- **Database**: Use MongoDB Atlas in production

Update your production backend `.env`:
```
CLIENT_ORIGIN=https://your-frontend-domain.com
MONGO_URI=your-production-mongodb-uri
JWT_SECRET=your-production-secret
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run lints/tests
5. Open a Pull Request

---

## 📄 License

[MIT License](LICENSE)

---

## 👨‍💻 Author

Built with ❤️ by [Vishant Chaudhary](https://github.com/im-vishu)

---

## 🗂️ Topics

`react` `nodejs` `ecommerce` `jwt` `mongodb` `authentication` `full-stack`