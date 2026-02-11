# Jos Marketplace Backend

## Setup Instructions

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Install MongoDB
Download and install MongoDB from https://www.mongodb.com/try/download/community

### 3. Configure Environment Variables
Copy `.env.example` to `.env` and update:
```bash
cp .env.example .env
```

Update the following in `.env`:
- `JWT_SECRET`: Change to a secure random string
- `CLOUDINARY_*`: Sign up at https://cloudinary.com and add your credentials

### 4. Start MongoDB
```bash
mongod
```

### 5. Start Backend Server
```bash
npm run dev
```

Server will run on http://localhost:5000

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user
- GET `/api/auth/profile` - Get user profile (protected)
- PUT `/api/auth/profile` - Update profile (protected)

### Products
- GET `/api/products` - Get all products (with filters)
- GET `/api/products/:id` - Get single product
- POST `/api/products` - Create product (protected, seller)
- PUT `/api/products/:id` - Update product (protected)
- DELETE `/api/products/:id` - Delete product (protected)
- POST `/api/products/:id/favorite` - Toggle favorite (protected)
- GET `/api/products/my-products` - Get seller's products (protected)
- GET `/api/products/favorites` - Get user favorites (protected)

### Chats
- GET `/api/chats` - Get user chats (protected)
- GET `/api/chats/:id` - Get chat messages (protected)
- POST `/api/chats` - Create new chat (protected)
- POST `/api/chats/:id/message` - Send message (protected)

### Reviews
- POST `/api/reviews` - Create review (protected)
- GET `/api/reviews/seller/:sellerId` - Get seller reviews

### Orders
- POST `/api/orders` - Create order/enquiry (protected)
- GET `/api/orders/my-orders` - Get buyer orders (protected)
- GET `/api/orders/seller-orders` - Get seller orders (protected)
- PUT `/api/orders/:id/status` - Update order status (protected)

## Real-time Features
Socket.io events:
- `join-chat` - Join a chat room
- `send-message` - Send message
- `receive-message` - Receive message
