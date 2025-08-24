# Punyakoti Sports - Full Stack E-commerce Application

A modern, responsive e-commerce web application for sports equipment, apparel, and accessories. Built with React frontend, Node.js/Express backend, PostgreSQL database, and fully Dockerized for easy deployment.

## 🏆 Features

### Frontend
- **Modern React UI** with responsive design
- **Smooth animations** using Framer Motion
- **Product browsing** with search, filter, and sorting
- **Shopping cart** with real-time updates
- **User authentication** (login/register)
- **Checkout process** with payment simulation
- **Order history** and tracking
- **Mobile-first responsive design**

### Backend
- **RESTful API** with Express.js
- **JWT authentication** for secure user sessions
- **PostgreSQL database** with proper relationships
- **Shopping cart management**
- **Order processing** and history
- **Product catalog** with categories
- **Input validation** and error handling

### DevOps
- **Fully Dockerized** application
- **Docker Compose** for easy local development
- **Persistent database** storage with volumes
- **Environment configuration**

## 🚀 Quick Start with Docker

### Prerequisites
- Docker Desktop installed and running
- VS Code (recommended)

### 1. Clone and Navigate
```bash
git clone <repository-url>
cd punyakoti-sports
```

### 2. Start the Application
```bash
docker-compose up --build
```

This single command will:
- Build and start the PostgreSQL database
- Build and start the Node.js backend API
- Build and start the React frontend
- Set up all necessary networking between services

### 3. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Database**: localhost:5432

### 4. Test the Application
1. Visit http://localhost:3000
2. Browse products and categories
3. Register a new account or login
4. Add items to cart
5. Complete the checkout process
6. View order history

## 🛠️ Development Setup

### Running Individual Services

#### Database Only
```bash
docker-compose up database
```

#### Backend Development
```bash
cd backend
npm install
npm run dev
```

#### Frontend Development
```bash
cd frontend
npm install
npm start
```

## 📁 Project Structure

```
punyakoti-sports/
├── frontend/                 # React application
│   ├── public/
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── context/         # React context providers
│   │   ├── utils/           # Utility functions
│   │   └── assets/          # Static assets
│   ├── Dockerfile
│   └── package.json
├── backend/                  # Node.js/Express API
│   ├── config/              # Database configuration
│   ├── controllers/         # Route controllers
│   ├── models/              # Database models
│   ├── routes/              # API routes
│   ├── middleware/          # Custom middleware
│   ├── Dockerfile
│   └── package.json
├── database/                 # Database setup
│   └── init.sql             # Database schema and sample data
├── docker-compose.yml        # Docker orchestration
└── README.md
```

## 🎯 Key Features Implemented

### User Authentication
- User registration with validation
- Secure login with JWT tokens
- Protected routes and API endpoints
- User profile management

### Product Management
- Product catalog with categories
- Advanced search and filtering
- Product details with image gallery
- Size and color variants
- Stock management

### Shopping Cart
- Add/remove items from cart
- Quantity management
- Persistent cart across sessions
- Real-time cart updates

### Checkout Process
- Shipping information form
- Payment method selection
- Order summary and validation
- Order confirmation

### Order Management
- Order history for users
- Order status tracking
- Order details view
- Reorder functionality

## 🎨 UI/UX Features

### Design System
- **Color Scheme**: Professional blue and gray palette
- **Typography**: Inter font family for modern look
- **Components**: Consistent design language
- **Responsive**: Mobile-first approach

### Animations
- **Page transitions**: Smooth fade and slide effects
- **Hover effects**: Interactive product cards
- **Loading states**: Skeleton screens and spinners
- **Micro-interactions**: Button clicks and form interactions

### Responsive Design
- **Mobile**: Optimized for phones (320px+)
- **Tablet**: Adapted for tablets (768px+)
- **Desktop**: Full experience (1024px+)
- **Large screens**: Optimized for 4K displays

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```env
NODE_ENV=development
DB_HOST=database
DB_PORT=5432
DB_NAME=punyakoti_sports
DB_USER=admin
DB_PASSWORD=password123
JWT_SECRET=your-secret-key-here
PORT=5000
```

#### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 📊 Database Schema

### Tables
- **users**: User accounts and profiles
- **categories**: Product categories
- **products**: Product catalog
- **cart**: Shopping cart items
- **orders**: Order records
- **order_items**: Order line items

### Sample Data
The database is pre-populated with:
- 4 product categories (Sportswear, Sports Kits, Accessories, Equipment)
- 12 sample products with realistic data
- Product images from Unsplash
- Proper relationships and constraints

## 🧪 Testing the Application

### Test User Journey
1. **Browse Products**: Visit homepage and explore categories
2. **Search**: Use search bar to find specific products
3. **Filter**: Apply filters by category, brand, price
4. **Product Details**: Click on products to view details
5. **Add to Cart**: Select size/color and add items
6. **Register**: Create a new user account
7. **Login**: Sign in with credentials
8. **Cart Management**: Update quantities, remove items
9. **Checkout**: Complete the purchase process
10. **Order History**: View placed orders

### API Testing
Use tools like Postman or curl to test API endpoints:

```bash
# Get all products
curl http://localhost:5000/api/products

# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","firstName":"John","lastName":"Doe"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

## 🚀 Deployment

### Production Deployment
1. Update environment variables for production
2. Build optimized images:
   ```bash
   docker-compose -f docker-compose.prod.yml up --build
   ```
3. Use a reverse proxy (nginx) for SSL termination
4. Set up database backups and monitoring

### Cloud Deployment
- **AWS**: Use ECS with RDS for database
- **Google Cloud**: Use Cloud Run with Cloud SQL
- **Azure**: Use Container Instances with Azure Database

## 🔒 Security Features

- **JWT Authentication**: Secure token-based auth
- **Password Hashing**: bcrypt for password security
- **Input Validation**: Server-side validation
- **CORS Protection**: Configured for frontend domain
- **Rate Limiting**: API rate limiting middleware
- **SQL Injection Prevention**: Parameterized queries

## 📱 Mobile Responsiveness

The application is fully responsive and tested on:
- **iPhone SE** (375px)
- **iPhone 12 Pro** (390px)
- **iPad** (768px)
- **iPad Pro** (1024px)
- **Desktop** (1440px+)

## 🎨 Brand Identity

### Logo
- **Name**: PK Sports (Punyakoti Sports)
- **Style**: Modern, bold typography
- **Colors**: Primary blue (#3b82f6) with yellow accent

### Visual Design
- **Inspiration**: Nike, Adidas, Decathlon
- **Style**: Clean, modern, sports-focused
- **Images**: High-quality sports product photography

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Troubleshooting

### Common Issues

#### Docker Issues
```bash
# Clean up Docker
docker-compose down -v
docker system prune -a

# Rebuild from scratch
docker-compose up --build --force-recreate
```

#### Database Connection Issues
```bash
# Check database logs
docker-compose logs database

# Reset database
docker-compose down -v
docker-compose up database
```

#### Port Conflicts
- Frontend: Change port in package.json
- Backend: Update PORT environment variable
- Database: Update port mapping in docker-compose.yml

### Support
For issues and questions:
1. Check the troubleshooting section
2. Review Docker logs: `docker-compose logs`
3. Ensure all services are running: `docker-compose ps`

---

**Built with ❤️ for sports enthusiasts everywhere!**