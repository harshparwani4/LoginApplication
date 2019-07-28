import React, { useState, useEffect } from 'react';
import './App.style.scss';
import Landing from './Landing.jsx';
import Success from './Success.jsx';

export default function App () {


    let [isLoggedIn, setIsLoggedIn] = useState(false);
    const isLocalStoragePresent = !!window.localStorage.getItem('usertoken');
    useEffect(() => {
        if(isLocalStoragePresent){
            setIsLoggedIn(true);
        }
    },[isLoggedIn]);


    return (
        <div className="containerglobal">
                        {!isLocalStoragePresent ?
                            <Landing setIsLoggedIn={(data)=>{setIsLoggedIn(data)}}/>:
                            <Success/>
                        }
                </div>
    );
}
