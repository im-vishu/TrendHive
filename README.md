# 🛍️ TrendHive — E-Commerce Website

TrendHive is a modern, scalable, and responsive **e-commerce style website** for showcasing and selling beauty & fashion products (Perfumes, Lipsticks, Skincare, etc.).  
Built with **React.js, Node.js, Express, and MongoDB**, it is designed to be **user-friendly, performance-optimized, and scalable** with future features like payments, cart system, and affiliate APIs.

---

## 🚀 Features
- 🎨 Modern UI with **React + TailwindCSS**
- 📦 Product listings with categories (Perfumes, Lipsticks, Skincare, etc.)
- 🔎 Product search & filter (by category, brand, price)
- 📝 Product detail page (image, description, price, reviews)
- 👤 User authentication (signup/login)
- 🛒 Wishlist + Cart system (future)
- 📊 Admin dashboard (manage products)
- 💳 Payment gateway integration (future)
- 🌍 Mobile-first responsive design

---

## 🛠️ Tech Stack
**Frontend:** React.js, TailwindCSS  
**Backend:** Node.js, Express.js  
**Database:** MongoDB (Mongoose ODM)  
**Hosting:** Vercel(Frontend), Render(Backend)  

---

## 📂 Project Structure
trendhive/

│
├── client/ # Frontend (React.js + Tailwind)
│ ├── public/ # Static files
│ ├── src/
│ │ ├── assets/ # Images, icons, fonts
│ │ ├── components/ # Reusable UI components
│ │ ├── pages/ # Pages (Home, Product, Cart, Login, etc.)
│ │ ├── context/ # Context API (Auth, Cart)
│ │ ├── services/ # Axios API calls
│ │ ├── App.js # Main app entry
│ │ └── index.js # React entry point
│ └── package.json
│
├── server/ # Backend (Node.js + Express)
│ ├── config/ # DB config
│ ├── controllers/ # Business logic
│ ├── models/ # MongoDB schemas (User, Product, Order)
│ ├── routes/ # API routes
│ ├── middleware/ # Auth, error handling
│ ├── server.js # Express app entry
│ ├── .env # Environment variables
│ └── package.json
│
└── README.md

---

## ⚡ Getting Started

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/trendhive.git
cd trendhive


2️⃣ Setup Frontend
cd client
npm install
npm start

3️⃣ Setup Backend
cd ../server
npm install
npm run dev

4️⃣ Connect to MongoDB

* Create a .env file in the server/ folder:

MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_secret_key


🔮 Future Enhancements
✅ Payment Gateway (Stripe, Razorpay)
✅ Product Reviews & Ratings
✅ Order History & Tracking
✅ Affiliate API Integration (Amazon, Flipkart, Nykaa)
✅ SEO Optimization & Analytics
✅ PWA (Progressive Web App) support


🤝 Contributing
Contributions are welcome!
✅ Fork the repo
✅ Create a new branch (feature/new-feature)
✅ Commit your changes
✅ Submit a pull request 🚀

📜 License
This project is licensed under the MIT License.

👨‍💻 Author

Developed with ❤️ by Vishant Chaudhary
