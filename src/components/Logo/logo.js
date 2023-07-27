import React from "react";
import Tilt from 'react-parallax-tilt';
import faceScan from './face-scan.gif';
import './logo.css'

const Logo = () => {
    return (
        <div className="ma4 mt0" style={{display: 'flex', justifyContent: 'flex-start'}}>
            <Tilt>
                <div>
                    <img src={faceScan} alt="logo" style={{height: '10vh'}}></img>
                </div>
            </Tilt>
        </div> 
    );
}

export default Logo;