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
    setImageUrl(input);  // set image URL for FaceRecognition component
    fetch('http://localhost:3000/imageurl', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: input  // send the user's input (the image URL) to your server
      })
    })
    .then(response => response.json())
    .then(response => {
      if (response) {
        fetch('http://localhost:3000/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: user.id
          })
        })
        .then(response => response.json())
        .then(count => {
          setUser(prevState => ({
            ...prevState,
            entries: count
          }));
        })
        .catch(console.log);
      }
      displayFaceBox(calculateFaceLocation(response));
    })
    .catch(err => console.log(err));   
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
