import React from 'react';
import "./ImageLinForm.css"


const ImageLinForm = () => {
    return (
       <div className="">
           <p className="f3">
               {'This is magic Brain will detect face on your pictures.Git it a try.'}
           </p>
           <div className="center">
               <div className="form center pa4 br3 shadow-5">
                <input className="f4 pa2 w-70 center" type='text' />
                <button className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple">Detect</button>
               </div>
           </div>
       </div>
    )
}

export default ImageLinForm;