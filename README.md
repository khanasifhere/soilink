# 🌾 Soilink - Empowering Agriculture Digitally

Soilink is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) web application designed to bridge the gap between **farmers** and **consumers**. The platform enables **farmers to rent out their land** during off-seasons and **sell their crops**, while **users** can **rent land** for cultivation and **order fresh produce** directly from farmers.

---

## 🔗 Live Demo

Frontend: [https://soilink.vercel.app](https://soilink.vercel.app)  
Backend: [https://soilink.onrender.com](https://soilink.onrender.com)

---

## 📸 Screenshots

> (You can add images of the landing page, dashboards, order forms, etc.)

---

## 🚀 Features

### 👨‍🌾 For Farmers:
- Register and login securely
- Add available **lands** with size, location, price
- List **crops** for sale with details and pricing
- View incoming **orders** and rental **requests**
- Update availability status for land and crops

### 👨‍💻 For Users:
- Register and login securely
- Browse and **request to rent land**
- Explore and **order crops** from farmers
- View their own order/request history

### 🔐 Authentication & Roles:
- Role-based access: `Farmer`, `User`
- OTP verification for secure sign-up
- JWT-based session management using cookies

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **MongoDB Atlas** | Cloud database for storing users, lands, crops, and orders |
| **Express.js** | Backend framework to create REST APIs |
| **React.js + Redux Toolkit** | Frontend UI with state management |
| **Node.js** | JavaScript runtime for backend |
| **Axios** | API communication |
| **Tailwind CSS** | Styling UI components |
| **Render** | Hosting the backend |
| **Vercel** | Hosting the frontend |

---
## 🔧 Installation & Setup
1. **Clone the repository**
```bash
https://github.com/khanasifhere/soilink.git
```
2. **Navigate to the project directory**
```bash
cd soilink
```
3. **Install dependencies**
```bash
npm install
```
4. **Configure environment variables**
Create a `.env` file in the root directory and add your environment variables as shown below:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```
5. **Run the application**
```bash
npm run dev
```
The application will start at `http://localhost:3000`

## 🤝 Contributing
Contributions are welcome! Please fork this repository and submit a pull request for review.

## 📜 License
This project is licensed under the MIT License.

## 📧 Contact
If you have any questions or suggestions, feel free to reach out at `khanaasif1065@gmail.com`.


