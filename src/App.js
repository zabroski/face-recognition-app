import React, { Component  } from "react";
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinForm from './components/ImageLinForm/ImageLinForm';
// import FaceRecognitionfrom './components/FaceRecognition/FaceRecognition';






import './App.css';


class App extends Component {
  render(){
    return (
      <div className="App">
        <Navigation />
        <Logo />
        <ImageLinForm />
        {/* <FaceRecognition /> */}
      </div>
    )
  }
}


export default App;
