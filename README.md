# Face Recognition App

A full-stack web application that detects and identifies faces in images using machine learning. Built with React and integrated with the Clarifai API for real-time face detection.

## 🎯 Features

- **Face Detection**: Paste any image URL to detect faces in real-time
- **User Authentication**: Secure sign-in and registration system
- **Entry Tracking**: Keeps count of how many images each user has submitted
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Real-time Processing**: Instant face detection results with bounding boxes

## 🛠️ Tech Stack

**Frontend:**
- React
- CSS3
- Create React App

**Backend:**
- Node.js & Express
- PostgreSQL

**APIs:**
- Clarifai Face Detection API

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/Nbk-Juno/face-recog-app.git
cd face-recog-app
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
# Create .env file in root directory
# Add your Clarifai API key
REACT_APP_CLARIFAI_API_KEY=your_api_key_here
```

4. Start the development server
```bash
npm start
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📝 Usage

1. Sign up for a new account or sign in
2. Paste an image URL into the input field
3. Click "Detect" to identify faces
4. View detected faces highlighted with bounding boxes
5. Track your submission count on your profile

## 🧪 Available Scripts

### `npm start`
Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

### `npm test`
Launches the test runner in interactive watch mode

### `npm run build`
Builds the app for production to the `build` folder

## 🔑 API Keys

This project uses the Clarifai API for face detection. Get your free API key at [clarifai.com](https://www.clarifai.com/)

## 📦 Deployment

This app can be deployed to:
- Netlify
- Vercel  
- Heroku
- GitHub Pages

## 🙏 Acknowledgments

- Face detection powered by [Clarifai](https://www.clarifai.com/)
