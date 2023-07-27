import React, { useState } from 'react';
import ParticlesBg from 'particles-bg';
// import Clarifai from 'clarifai';
import Navigation from './components/Navigation/nav';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/Logo/logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import './App.css';

// const app = new Clarifai.App({
//   apiKey: '6ae778c6177545fa9811d5594fea3c6e'
// });

const returnClarifaiRequestOptions = (imageUrl) => {
  // Your PAT (Personal Access Token) can be found in the portal under Authentification
const PAT = '57856f6490364c158f52d81ab2b9a4ca';
// Specify the correct user_id/app_id pairings
// Since you're making inferences outside your app's scope
const USER_ID = 'nbk-juno';       
const APP_ID = 'face-recog';
// Change these to whatever model and image URL you want to use
const MODEL_ID = 'face-detection';   
const IMAGE_URL = imageUrl;

const raw = JSON.stringify({
    "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
    },
    "inputs": [
        {
            "data": {
                "image": {
                    "url": IMAGE_URL
                }
            }
        }
    ]
});
const requestOptions = {
  method: 'POST',
  headers: {
      'Accept': 'application/json',
      'Authorization': 'Key ' + PAT
  },
  body: raw
};
return requestOptions
}


function App() {
  
  
  const [input, setInput] = useState('');
  const [box, setBox] = useState({});

  const onInputChange = (event) => {
    console.log(event.target.value);
    setInput(event.target.value);
  }

  const calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage')
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width, height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  const displayFaceBox = (box) => {
    console.log(box);
    setBox(box);
  }

  const onButtonSubmit = () => {
    console.log('click');

    fetch("https://api.clarifai.com/v2/models/" + "face-detection" + "/outputs", returnClarifaiRequestOptions(input))
        .then(response => response.json())
        .then(data => {
          displayFaceBox(calculateFaceLocation(data));
        })
        .catch(err => {
          console.log(err);
        });
  };

  return (
    <div className="App">
      <ParticlesBg type="cobweb" num={300} color='#00ff00' bg={true} />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm 
        onInputChange={onInputChange} 
        onButtonSubmit={onButtonSubmit}
      />
      <FaceRecognition box={box} imageUrl={input} />
    </div>
  );
}

export default App;
