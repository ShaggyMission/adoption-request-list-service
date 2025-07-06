# 🐾 Adoption Request List Service - Shaggy Mission

<div align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white" alt="Mongoose" />
  <img src="https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black" alt="Swagger" />
</div>

<div align="center">
  <h3>📋 Pet Adoption Request List Management Microservice</h3>
  <p><em>Part of the Shaggy Mission ecosystem - Managing and displaying adoption requests! 🐕🐱</em></p>
</div>

---

## 🌟 Overview

The **Adoption Request List Service** is a microservice that provides paginated listing functionality for adoption requests in the Shaggy Mission platform. This service allows administrators and staff to view and manage adoption requests efficiently.

## 🎯 What This Service Does

- **Paginated Listing**: Retrieve adoption requests with pagination support
- **Request Management**: View all adoption requests with sorting by date
- **Status Tracking**: Display request status (pending, approved, rejected)
- **Data Retrieval**: Fetch adoption request details including user and pet information
- **Administrative Interface**: Support for administrative dashboards and management tools

## 🛠️ Tech Stack

- **Runtime**: Node.js with Express.js framework
- **Database**: MongoDB with Mongoose ODM
- **Pagination**: Built-in pagination with configurable page size
- **RESTful Design**: Clean GET endpoint for data retrieval
- **Documentation**: Swagger UI for interactive API documentation

## 📡 API Endpoints

### List Adoption Requests
**`GET /list/adoption-requests`**
- Retrieves paginated list of adoption requests
- Default page size: 10 requests per page
- Sorted by date requested (newest first)
- Includes pagination metadata

**Query Parameters:**
- `page`: Page number (default: 1)

**Request Example:**
```bash
GET /list/adoption-requests?page=1
```

**Response Example:**
```json
{
  "currentPage": 1,
  "totalPages": 5,
  "totalRequests": 47,
  "requests": [
    {
      "_id": "64f8b2a1c3d4e5f6a7b8c9d3",
      "userId": "user123",
      "petId": "64f8b2a1c3d4e5f6a7b8c9d0",
      "message": "I would love to provide a loving home for this pet.",
      "status": "pending",
      "dateRequested": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

### API Documentation
**`GET /listAdoption-docs`**
- Interactive Swagger UI documentation
- Complete API specification with examples
- Pagination and response format details

## 🔧 Core Functionality

### Pagination System
- **Page Size**: Fixed at 10 requests per page
- **Navigation**: Support for page-based navigation
- **Metadata**: Includes total pages, current page, and total request count
- **Sorting**: Requests sorted by dateRequested (descending)

### Request Display
- **Complete Data**: All adoption request fields included
- **Status Visibility**: Clear display of request status
- **Chronological Order**: Newest requests appear first
- **User Information**: User and pet IDs for reference

## 🗃️ Database Schema

### Adoption Request Document
```javascript
{
  _id: ObjectId,
  userId: String (required),
  petId: String (required),
  message: String (optional),
  status: String (enum: ['pending', 'approved', 'rejected'], default: 'pending'),
  dateRequested: Date (default: Date.now)
}
```

## 🔧 Development

### Project Structure
```
├── config/
│   └── db.js                           # MongoDB connection
├── controllers/
│   └── adoptionRequest.controller.js   # List controller logic
├── models/
│   └── adoptionRequest.model.js        # Mongoose schema
├── routes/
│   └── adoptionRequest.routes.js       # API routes
├── docs/
│   └── swagger.yaml                    # OpenAPI specification
├── app.js                              # Express setup
└── server.js                           # Server startup
```

### Testing the API
```bash
# List first page
curl "http://localhost:3016/list/adoption-requests"

# List specific page
curl "http://localhost:3016/list/adoption-requests?page=2"
```

---

<div align="center">
  <p><strong>Built with ❤️ for managing pet adoption requests 🐕🐱</strong></p>
  <p>📖 <a href="/listAdoption-docs">View API Documentation</a></p>
</div>