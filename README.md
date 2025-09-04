Customer Management App

A lightweight and efficient application for managing customer records, including personal details, addresses, and contact information. The app supports search, filtering, pagination, and CRUD operations to streamline customer data management.

🚀 Features

Customer Records: Store and manage customer information (name, phone number etc.,)

Address Management: One-to-many relationship between customers and addresses

Search & Filter: Find customers by city, name, or phone number

Pagination: Efficient navigation through large datasets

Sorting: Order results by fields like name, phone number, or city

API Support: RESTful APIs for integration with front-end apps

Database Support: SQLite 

🛠️ Tech Stack

Backend: Node.js / Express.js

Database: SQLite (default) 

Frontend : React.js


📂 Project Structure
customer-management-app/
├── server/
│   ├── routes/          # API routes
│   ├── controllers/     # Business logic
│   └── index.js         # Main entry point
├── client/            # React app
├── database/          # Migrations & seeds
├── README.md          # Documentation
└── package.json       # Dependencies & scripts

⚙️ Installation & Setup
1. Clone the repository
git clone https://github.com/your-username/customer-management-app.git
cd customer-management-app

2. Install dependencies
npm install

3. Start the server
node index

The API will be available at:

https://project-customer-management.onrender.com/api/customers

📖 API Endpoints
Customers

GET /api/customers → Get all customers (supports pagination & search)

GET /api/customers/:id → Get customer by ID

POST /api/customers → Create new customer

PUT /api/customers/:id → Update customer details

DELETE /api/customers/:id → Delete a customer

Addresses

GET /api/customers/:id/addresses → Get addresses for a customer

POST /api/customers/:id/addresses → Add address for a customer

Fetch customers by city with pagination

GET /api/customers?city=Mumbai&page=1&limit=10



📜 License

This project is licensed under the MIT License.
