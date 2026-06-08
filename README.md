# Budget Savings App Starter

This starter includes:
- backend structure
- MongoDB connection
- User auth with JWT and bcrypt
- Expense CRUD API
- auth protection middleware
- error handling middleware

## Backend
1. cd backend
2. npm install
3. copy `.env.example` to `.env`
4. run `npm run dev`

## API routes
- POST /api/users
- POST /api/users/login
- GET /api/users/current
- GET /api/expenses
- POST /api/expenses
- PUT /api/expenses/:id
- DELETE /api/expenses/:id
