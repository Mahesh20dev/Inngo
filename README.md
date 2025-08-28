# Inngo
A full-featured web application built with Node.js, Express, MongoDB, and EJS. This app allows users to register, log in, create listings, write reviews, and manage content securely with session-based authentication.

## About Inngo
Inngo is a dynamic web platform inspired by popular vacation rental services. It enables users to browse, list, and review rental properties seamlessly. The platform focuses on delivering a secure and user-friendly experience for both travelers seeking unique accommodations and hosts wanting to showcase their listings. Features include user authentication, property management, reviews, and real-time feedback via flash messages, making Inngo a complete solution for short-term rental needs.

## Live Demo
Check out the live version of the app here: [Inngo Live Demo](https://inngo.onrender.com)


## Features
- User Authentication with Passport.js (Local Strategy)
- CRUD operations for listings and reviews
- Flash messages for feedback (success/error)
- Data validation with Joi schemas
- EJS Templating with layouts using `ejs-mate`
- Smart error handling with a custom `ExpressError` class
- Sessions stored in MongoDB via `connect-mongo`
- Security via session secrets and httpOnly cookies

## Technologies Used
- Node.js
- Express.js
- MongoDB + Mongoose
- EJS & ejs-mate
- Joi (for data validation)
- Passport.js
- dotenv
- connect-mongo
- method-override
- express-session
- connect-flash

## Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/Mahesh20dev/Inngo.git
cd Inngo
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
ATLAS_KEY=your_mongodb_atlas_url
SECRET=your_secure_secret_key
NODE_ENV=development
```

### 4. Run the App

```bash
node app.js
```

Open `http://localhost:3000` in your browser.

## Project Structure
```bash
AIRBNB/
├── controllers/         # Controller files handling request/response logic
├── init/                # Initialization files (DB connection, configs, etc.)
├── models/              # Database models (e.g., Mongoose/Sequelize schemas)
├── node_modules/        # Installed dependencies (ignored in Git & Docker)
├── public/              # Static files (CSS, JS, images, etc.)
├── routes/              # Application routes/endpoints
├── utils/               # Utility/helper functions
├── views/               # Templates or frontend view files
│
├── .dockerignore        # Files/folders ignored by Docker
├── .env                 # Environment variables
├── .gitignore           # Files/folders ignored by Git
├── app.js               # Main application entry point
├── cloudConfig.js       # Cloud-related configurations
├── docker-compose.yml   # Docker Compose setup
├── Dockerfile           # Docker image build instructions
├── middleware.js        # Custom middleware functions
├── package.json         # Project metadata & dependencies
├── package-lock.json    # Dependency lock file
├── README.md            # Project documentation
└── schema.js            # Schema definitions (DB or validation)
```

## Deployment Tips

To deploy on Render, Heroku, or similar platforms:

- Replace hardcoded port with:
  ```js
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
  ```

- Set environment variables (`ATLAS_KEY`, `SECRET`) in the hosting dashboard.

## Useful Scripts

```bash
node app.js       # Start the server
```

---

## Known Issues

- If MongoDB Atlas URL or secret is invalid, app won't connect.
- Flash messages rely on sessions; ensure `express-session` is correctly configured.

## 🐳 Run with Docker

You can run Inngo directly via Docker without installing Node.js manually.

### Pull the Image
```bash
# Pull specific version
docker pull maheshyc/inngo:1.0
```
### Create a .env File
```bash
ATLAS_KEY=your_mongodb_atlas_url
SECRET=your_secure_secret_key
NODE_ENV=production
```
### Run the Container
```bash
docker run -p 3000:3000 --env-file .env maheshyc/inngo:1.0
```

Now open 👉 `http://localhost:3000`
