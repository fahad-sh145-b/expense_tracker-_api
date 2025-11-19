Expense Tracker Api

A simple and efficient Expense Tracking Application built using Node.js, Express, and MongoDB.
This app allows users to add expenses, categorize them, track totals, and manage their daily spending easily.

🚀 Features

➕ Add new expenses with amount, category, and date

📂 Organize expenses by category

📅 Track daily, monthly, or total spending

🔄 Update and delete expenses

👤 User authentication (JWT based)

💾 MongoDB database storage

🔐 Secure password hashing using bcrypt

📁 Project Structure
expense-tracker/
│
├── models/
│   └── expenseModel.js
│
├── routes/
│   └── expenseRoutes.js
│
├── controllers/
│   └── expenseController.js
│
├── middleware/
│   └── auth.js
│
├── server.js
├── db.js
├── package.json
└── README.md

🛠️ Technologies Used

Node.js

Express.js

MongoDB & Mongoose

JWT (JSON Web Tokens)

bcrypt.js for password hashing

dotenv for environment variables

📦 Installation
1️⃣ Clone the repository
git clone https://github.com/your-username/expense-tracker.git
cd expense-tracker

2️⃣ Install dependencies
npm install

3️⃣ Create a .env file
PORT=4000
MONGO_URI=mongodb://127.0.0.1:27017/expense_tracker_api
JWT_SECRET=12345

4️⃣ Start the server
npm start


Server will run at:

http://localhost:4000

📚 API Endpoints
🔐 Auth Routes
Method	Endpoint	Description
POST	/auth/signup	Register user
POST	/auth/login	Login user
💰 Expense Routes (Protected)
Method	Endpoint	Description
POST	/expense/add	Add new expense
GET	/expense/all	Get all expenses
GET	/expense/:id	Get single expense
PUT	/expense/update/:id	Update an expense
DELETE	/expense/delete/:id	Delete an expense


Authentication

Protected routes require a token.

Send token in header:

Authorization: Bearer <your_token>

📈 Example Expense Object
{
  "title": "cricket",
  "amount": 3000,
  "category": "ceat",
"defaultAt": "2025-11-13T21:20:08.611Z",
}

🧪 Testing API

Use tools such as:

Postman


📝 License

This project is open-source and available under the MIT License.
