# Modern E-Commerce Platform

A full-featured e-commerce platform built with Next.js, Firebase, and MongoDB, offering a seamless shopping experience with powerful admin controls.

## ✨ Key Features

### User Experience
- 🎨 Sleek, Modern UI with TailwindCSS
- 🛒 Full-Featured Shopping Cart
- 🔐 Secure Google Authentication
- 🔎 Advanced Search Functionality
- 👨‍👩‍👧‍👦 Product Categories & Filtering
- ⭐ Product Rating System

### Admin Features
- 📊 Comprehensive Admin Dashboard
- 📈 Real-Time Shop Statistics
- 🛠️ Product Management System
- 📦 Order Management Interface
- 📊 Sales Analytics & Reporting

### Technical Features
- 🖼️ Firebase Storage for Image Management
- 🔒 Secure User Authentication
- 💾 Efficient Data Management with Prisma
- 🚀 Optimized for Performance

## 🚀 Tech Stack

- **Frontend:** Next.js 13+
- **Styling:** TailwindCSS
- **Database:** MongoDB with Prisma
- **Authentication:** NextAuth.js
- **Storage:** Firebase
- **Deployment:** Vercel

## 📦 Installation

1. **Clone the repository**

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Set up environment variables**
Create a `.env.local` file:
```env
# Database
DATABASE_URL="your_mongodb_url"

# Auth
GOOGLE_ID="your_google_client_id"
GOOGLE_SECRET="your_google_client_secret"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your_nextauth_secret"

# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY="your_firebase_api_key"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your_firebase_auth_domain"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your_firebase_project_id"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your_firebase_storage_bucket"

```

4. **Run database migrations**
```bash
npx prisma generate
npx prisma db push
```

5. **Start the development server**
```bash
npm run dev
# or
yarn dev
```



## 💻 Usage

### Customer Interface
- Browse products by category
- Add items to cart
- Track order status
- Rate products

### Admin Dashboard
- Manage products and inventory
- Process orders
- View sales statistics

## 🚀 Deployment

This project is optimized for deployment on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables
4. Deploy!

## 🤝 Contributing

We welcome contributions !.

## 📄 License

This project is licensed under the MIT License .

## 👥 Authors

- OUATTARA Arouna - (Young Geek)

## 📞 Contact

- GitHub: [@Ano2225](https://github.com/Ano2225)
- Email: ouatt0767@gmail.com
