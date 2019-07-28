import React, { useState } from 'react';
import { register } from './UserFunctions';


export default function Register () {
    let [ email, setEmail ] = useState('');
    let [ password, setPassword ] = useState('');
    let [ message, setMessage ] = useState('');
    let [ phoneNumber, setPhoneNumber ] = useState('');


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
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const user = {
            email,
            password,
            phoneNumber,
        };

        register(user).then(res => {
            if (res.error) {
                setMessage(res.error);
            } else {
                setMessage("Registration SuccesFul. Login To Continue.");
            }
        }
        );
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 mt-5 mx-auto">
                    <form noValidate onSubmit={onSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                placeholder="Enter Email"
                                value={email}
                                setdata="setEmail"
                                onChange={onChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                placeholder="Enter Password"
                                value={password}
                                onChange={onChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="phoneNumber">Mobile Number</label>
                            <input
                                type="number"
                                className="form-control"
                                name="phoneNumber"
                                placeholder="Enter Mobile Number"
                                value={phoneNumber}
                                onChange={onChange}/>
                        </div>
                        <button
                            type="submit"
                            className="btn btn-lg btn-primary btn-block">
                                    Register
                        </button>
                        {message ? <div>{message}</div> : null}
                    </form>
                </div>
            </div>

        </div>
    );
}
