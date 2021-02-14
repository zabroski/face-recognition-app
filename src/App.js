import React, { Component  } from "react";
import clarifai from 'clarifai';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinForm from './components/ImageLinForm/ImageLinForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from  './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
// import { Route, Link } from 'react-router-dom';
// import 'tachyons';


import './App.css';
// require('dotenv').config



const app = new clarifai.App ({
  apiKey: 
});

const particleOptions = {
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
     
    }
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
      .then(Response => this. displayFaceBox (this.calculateFaceLocation(Response)))
      .catch(err => console.log(err));
  }


  onRouteChange =(route) => {
    this.setState({route: route});

  }




  render(){
    return (
      <div className="App">

      <Particles className="particles"
        params={ particleOptions}
      />

      <Navigation onRouteChange={this.onRouteChange}/>
      { this.state.route === 'signin'
        ?<Signin onRouteChange={this.onRouteChange} />
        : <div>
            <Logo />
            <Rank />
            <ImageLinForm
            onInputChange={this.onInputChange}
            onButtonSubmit={this.onButtonSubmit}
             />
              <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
          </div>
        }
      </div>
  
    )
  }
}


export default App;
