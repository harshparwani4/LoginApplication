import React, { useState } from 'react';
import { login, generateOTP, verifyOTP } from './UserFunctions';
import PropTypes from 'prop-types';

function Login (props) {
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [message, setMessage] = useState('');
    let [loginType,  setLoginType] = useState('email');
    let [phoneNumber, setPhoneNumber] =  useState('');
    let [otp, setOtp] = useState('');
    let [otpGenerated, setOtpGenerated] =  useState(false);

    const onChange = (e) => {
        switch(e.target.name){
            case 'email':
                setEmail(e.target.value);
                break;
            case 'password':
                setPassword(e.target.value);
                break;
            case 'phoneNumber':
                setPhoneNumber(e.target.value);
                break;
            case 'otp':
                setOtp(e.target.value);
                break;
        }
    };

    const generateOtp = (e) => {
        e.preventDefault();

        const user = {
            phoneNumber
        };
        generateOTP(user).then(res=> {
            if(res.error){
                setMessage(res.error);
            }
            else{
                setOtpGenerated(true);
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const user = {
            email,
            password,
        };

        login(user).then(res => {
            if (res.error) {
                setMessage(res.error);
            }
            else{
                props.setIsLoggedIn(true);
            }
        });
    };

    const onOtpSubmit = (e) => {
        e.preventDefault();

        const user = {
            otp,
            phoneNumber
        };

        verifyOTP(user).then(res => {
            if (res.error) {
                setMessage(res.error);
            }
        });
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 mt-5 mx-auto">
                { loginType === 'email'?
                    (<form noValidate onSubmit={onSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input type="email"
                                className="form-control"
                                name="email"
                                placeholder="Enter Email"
                                value={email}
                                onChange={onChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password"
                                className="form-control"
                                name="password"
                                placeholder="Enter Password"
                                value={password}
                                onChange={onChange} />
                        </div>
                        <span>
                            <button onClick={()=>{setLoginType('mobile')}} className="btn btn-lg btn-primary btn-block">
                                Login With Mobile
                            </button>
                            <button type="submit" className="btn btn-lg btn-primary btn-block">
                                Sign in
                            </button>
                        </span>
                        {message.length ? <div>{message}</div> : null}
                    </form>):
                    (
                        <form noValidate onSubmit={onOtpSubmit}>
                        <div className="form-group">
                            <label htmlFor="phoneNumber">Mobile Number</label>
                            <input type="number"
                                className="form-control"
                                name="phoneNumber"
                                placeholder="Enter Mobile Number"
                                value={phoneNumber}
                                onChange={onChange} />
                        </div>
                        {
                        otpGenerated?
                        (<div className="form-group">
                            <label htmlFor="otp">Password</label>
                            <input type="password"
                                className="form-control"
                                name="otp"
                                placeholder="Enter Otp"
                                value={otp}
                                onChange={onChange} />
                        </div>):null
                        }
                        {
                            !otpGenerated?
                            (
                            <button  onClick={generateOtp} className="btn btn-lg btn-primary btn-block">
                                Generate Otp
                            </button>
                            ) : (
                            <button type="submit" className="btn btn-lg btn-primary btn-block">
                                Sign in
                            </button>
                            )
                        }
                        </form>
                    )
                }
                </div>
            </div>
        </div>
    );
}

Login.propTypes = {
    setIsLoggedIn:PropTypes.func
}

export default Login;
