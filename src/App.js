import React, { Component  } from "react";
import clarifai from 'clarifai';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Register from './components/Register/Register';

import FaceRecognition from  './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
// import { Route, Link } from 'react-router-dom';



import './App.css';
// require('dotenv').config



const app = new clarifai.App ({
  apiKey: '897cde6076124c17a4657f7e32c38d46'
});

const particlesOptions = {
  particles: {
    number: {
      value: 120,
      density: {
        enable:true,
        value_area: 800

      }
    }
  }
}


class App extends Component {
  constructor() {
    super()
    this.state = {
      input: '',
      imageUrl: '',
      route: "signin",
      box: {},
      isSignedIn: false,
      user: {
            id: '',
            name: '',
            email: '',
            password: '',
            entries: 0,
            joined: ''
      }
    }
  }

  loadUser = (data) => {
    this.setState({user : {
      id: data.id,
      name: data.name,
      email: data.email,
      password: data.password,
      entries: data.entries,
      joined: data.joined
    }})

  }



  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }

  }

  displayFaceBox = (box) => {
    this.setState({box: box})
  }

  onInputChange = (e) => {
    this.setState({input: e.target.value});
  }

  // https://samples.clarifai.com/face-det.jpg

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input})
    app.models
      .predict(
      clarifai.FACE_DETECT_MODEL,
      this.state.input)
      .then(response =>{
        if (response) {
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries : count}))
            })
        }
         this. displayFaceBox (this.calculateFaceLocation(Response))
      })
      .catch(err => console.log(err));
  }


  onRouteChange =(route) => {
    if (route === 'signout') {
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});

  }




  render(){
     const { isSignedIn, imageUrl, route, box }= this.state
    return (
      <div className="App">
      <Particles className='particles'
       params={particlesOptions}
     />
     <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
     { route === 'home'
       ? <div>
           <Logo />
           <Rank
             name={this.state.user.name}
             entries={this.state.user.entries}
           />
           <ImageLinkForm
             onInputChange={this.onInputChange}
             onButtonSubmit={this.onButtonSubmit}
           />
           <FaceRecognition box={box} imageUrl={imageUrl} />
         </div>
       : (
          route === 'signin'
          ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
         )
     }
   </div>
  
    )
  }
}
export default App;



