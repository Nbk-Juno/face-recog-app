import React from "react";
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
    return (
        <div>
            <p className="f3 white">
                {'This Magic brain will detect faces in your pictures. Give it a try!'}
            </p>
            <div>
                <div className="form center pa4 br3 shadow-5">
                    <input type="text" className="f4 pa2 w-70 center" onChange={onInputChange}/>
                    <button 
                    className="w-30 grow f4 br2 link ph3 pv2 dib white bg-dark-green"
                    onClick={onButtonSubmit}
                    >Detect</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;