Quick Commerce
1. 📘 Project Overview

This project is an ecommerce platform supporting multiple user types (Customer, Delivery partner, Admin) ,where the users
can order products,delivery parnters can pickup , deliver and admin can monitor both as well

Live Link : https://learnmern.site/

2. 🧱 System Architecture Diagram

![Quick Commerce System Architecture](https://raw.githubusercontent.com/JithinGeorge10/Beeyond-Tech-Assignment/main/quick%20commerce%20system%20architecture.png)


3. 🛠 Stack Used
Frontend: Next.js, TailwindCSS

Backend: Node.js, Express

Database: MongoDB Atlas

Containerization: Docker, Docker Compose


4. 📁 Folder Structure

project-root/
│
├── frontend/                # Next.js frontend
├── backend/                 # Nodejs backed
│
├── docker-compose.yml
└── README.md


5. ⚙️ Setup Instructions

🧬 Clone the Repository

git clone https://github.com/JithinGeorge10/Beeyond-Tech-Assignment.git
cd your-repo

🐳 Run with Docker Compose
docker-compose up --build

Run with Docker Compose

npm install

cd frontend
npm run dev

cd backend
npm run start

6. ☁️ Hosting & Deployment Steps

Purchased a VM instance--Google Cloud Platform

Installed Docker and Docker Compose

Cloned the frontend and backend images from docker hub and run 

Set up a domain and reverse proxy using Nginx 

Installed SSL certificates

Purchased a domain from hostinger and redirected to the IP generated from instance


7.🔁 Horizontal Scaling via Load Balancer
Deploy multiple instances of each microservice using Kubernetes 

Set up an Nginx load balancer in front of api-gateway


8. 🌱 Future Improvements (Optional)

Add Online Payments

Add Kafka for event-driven architecture

Use CI/CD with GitHub Actions and Docker Hub

Migrate to a Kubernetes-based deployment


