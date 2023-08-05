import React, { useState } from 'react';
import ParticlesBg from 'particles-bg';
import Navigation from './components/Navigation/nav';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import './App.css';


const returnClarifaiRequestOptions = (imageUrl) => {
  // Your PAT (Personal Access Token) can be found in the portal under Authentification
const PAT = '57856f6490364c158f52d81ab2b9a4ca';
// Specify the correct user_id/app_id pairings
// Since you're making inferences outside your app's scope
const USER_ID = 'nbk-juno';       
const APP_ID = 'face-recog';
// Change these to whatever model and image URL you want to use
// eslint-disable-next-line no-unused-vars
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

//Initial State
const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
    user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}


function App() {
  const [input, setInput] = useState(initialState.input);
  const [imageUrl, setImageUrl] = useState(initialState.imageUrl);
  const [box, setBox] = useState(initialState.box);
  const [route, setRoute] = useState(initialState.route);
  const [isSignedIn, setSignIn] = useState(initialState.isSignedIn);  
  const [user, setUser] = useState(initialState.user);

  const loadUser = (data) => {
    setUser({
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
    });
  }


  const onInputChange = (event) => {
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
    setBox(box);
  }

  const onButtonSubmit = () => {
    fetch("https://api.clarifai.com/v2/models/face-detection/outputs", returnClarifaiRequestOptions(input))
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response from Clarifai was not ok');
        }
        return response.json();
      })
      .then(data => {
        displayFaceBox(calculateFaceLocation(data));
  
        fetch('http://localhost:3000/image', {
          method: 'put',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: user.id  // Access user ID from state
          })
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response from /image endpoint was not ok');
            }
            return response.json();
          })
          .then(count => {
            setUser(prevState => ({
              ...prevState,
              entries: count
            }));
          })
          .catch(err => {
            console.log('Error in /image endpoint: ', err.message);
          });
  
        return data;
      })
      .catch(err => {
        console.log('Error in image API: ', err.message);
      });
  };
  
  

  const onRouteChange = (route) => {
    if ( route === 'signout') {
      setInput(initialState.input);
      setImageUrl(initialState.imageUrl);
      setBox(initialState.box);
      setRoute(initialState.route);
      setSignIn(initialState.isSignedIn);
      setUser(initialState.user);
    } else if (route === 'home') {
      setSignIn(true);
    }
    setRoute(route);
  }

  return (
    <div className="App">
      <ParticlesBg type="cobweb" num={300} color='#00ff00' bg={true} />
      <Navigation 
        isSignedIn={isSignedIn}
        onRouteChange={onRouteChange}
      />
      { route === 'home'
        ? <div>
            <Logo />
            <Rank 
              name={user.name}
              entries = {user.entries}
            />
            <ImageLinkForm 
              onInputChange={onInputChange} 
              onButtonSubmit={onButtonSubmit}
            />
            <FaceRecognition box={box} imageUrl={input} />
          </div>
          : (
              route === 'signin'
              ? <Signin  
                  onRouteChange={onRouteChange}
                  loadUser={loadUser}
                />
              : <Register 
                  loadUser={loadUser}
                  onRouteChange={onRouteChange} 
                />   
          )
          
          
      }
    </div>
  );
}

export default App;
