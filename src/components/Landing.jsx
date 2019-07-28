import React from 'react';
import "./App.style.scss";
import Login from './Login.jsx';
import Register from './Register.jsx';
import PropTypes from 'prop-types';

function Landing (props) {
    return (
            <div className="container">
                <div className="jumbotron row">
                    <div className="col-sm-6 col-xs-6">
                        <Register />
                    </div>
                    <div className="col-sm-6 col-xs-3">
                        <Login setIsLoggedIn={props.setIsLoggedIn}/>
                    </div>
                </div>
            </div>
    );
}

Landing.propTypes = {
    setIsLoggedIn:PropTypes.func
}
export default Landing;
