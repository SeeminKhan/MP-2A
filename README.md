# StyleCraft – AI Powered Fashion Customization Platform

**StyleCraft** is an AI-powered fashion e-commerce platform that allows users to explore, customize, and visualize fashion designs before purchasing. The platform combines **modern web technologies, cloud deployment, and AI-based image generation** to deliver a personalized shopping experience for users and designers.

The system enables customers to **describe outfits using natural language and generate visual designs**, bridging the gap between imagination and fashion reality.

---

## Problem Statement

Traditional fashion e-commerce platforms allow users to browse existing products but do not provide a way to **visualize custom fashion ideas** before purchasing.

Customers often face issues such as:
- Lack of personalized fashion options  
- Difficulty visualizing custom designs  
- Limited interaction between customers and designers  
- Static product catalogs  

**StyleCraft solves this problem by introducing AI-powered design generation and customizable fashion visualization.**

---

## Key Features

### AI Fashion Design Generation (Atelier)

The **Atelier** feature allows users to generate fashion designs using natural language descriptions.
Example prompt:
```
"A flowy lavender dress with lace sleeves"
```
The system generates a **visual representation of the outfit**, helping users preview their ideas before ordering.
---

### User Authentication System

Secure login and signup system that allows users to:
- Create accounts  
- Login securely  
- Access personal dashboards  
- Manage orders and saved items  

---

### Product Catalog Management

Products are organized by **designers and categories**, allowing users to:
- Browse different fashion collections  
- Filter by category, size, and price  
- View product details  

---

### Cart and Wishlist

Users can:
- Add items to cart  
- Save products to wishlist  
- Review selected items before checkout  

---

### Admin / Designer Dashboard

Designers and admins can manage the platform through a dashboard that allows them to:
- Add new fashion products  
- Manage inventory  
- Track customer orders  
- Monitor user activity  

---

## System Architecture

```
Frontend (React + Tailwind CSS)
        |
Node.js Express Backend
        |
MongoDB Database
        |
AI Image Generation API
```

---

## Tech Stack

### Frontend
- React.js  
- Tailwind CSS  
- Axios  
- React Router  

### Backend
- Node.js  
- Express.js  
- REST APIs  

### AI Integration
- Hugging Face Stable Diffusion API (for fashion image generation)

### Database
- MongoDB

---

## Project Screens

### Home Page
Displays featured fashion collections with responsive design.

### Product Listing Page

Shows products in a grid layout with filters such as:
- Category  
- Price  
- Size  

### Atelier Section

Users enter fashion descriptions using natural language to generate designs.
Example:
```
"A black evening gown with silver embroidery"
```

### AI Output View

Displays the generated fashion image created by the AI model.

### Cart & Wishlist Page

Allows users to manage selected items before checkout.

### Admin / Designer Dashboard

Interface for managing:
- Products  
- Orders  
- Customers  

---

# Installation

Follow the steps below to run **StyleCraft** on your local machine.
---

## 1. Clone the Repository

```bash
git clone https://github.com/yourusername/stylecraft.git
cd stylecraft
```

---

## 2. Install Backend Dependencies

Navigate to the backend folder and install required packages.
```bash
cd backend
npm install
```

---

## 3. Configure Environment Variables

Create a `.env` file inside the backend directory and add the following variables.
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
HUGGING_FACE_API_KEY=your_api_key
```

---

## 4. Start Backend Server
```bash
npm start
```
The backend server will run on:
```
http://localhost:5000
```

---

## 5. Install Frontend Dependencies

Open a new terminal and navigate to the frontend folder.
```bash
cd frontend
npm install
```

---

## 6. Start Frontend Development Server

```bash
npm run dev
```
The frontend will run on:
```
http://localhost:5173
```

---

## 7. Open the Application

Open your browser and visit:
```
http://localhost:5173
```
You should now see the **StyleCraft Fashion Platform** running locally.

---

# Folder Structure

```
stylecraft
│
├── frontend
│   ├── src
│   ├── components
│   ├── pages
│   └── App.jsx
│
├── backend
│   ├── routes
│   ├── controllers
│   ├── models
│   └── server.js
│
└── README.md
```
