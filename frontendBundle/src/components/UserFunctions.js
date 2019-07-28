import axios from 'axios';

export const register = newUser => {
    return axios
        .post('users/register', {
            email: newUser.email,
            password: newUser.password,
            phoneNumber: newUser.phoneNumber,
        }).then(res => {
            return res.data;
        });
};

export const login = user => {
    return axios
        .post('users/login', {
            email: user.email,
            password: user.password
        })
        .then(res => {
            if (!res.data.error) {
                localStorage.setItem('usertoken', res.data);
            }
            return res.data;
        })
        .catch(err => {
            console.log(err);
        });
};

export const generateOTP = user =>{
    return axios.post('users/generateotp',{
        phoneNumber: user.phoneNumber
    }).then(res=>{
        return res.data;
    })
}

export const verifyOTP = user =>{
    return axios.post('users/verifyotp',{
        phoneNumber: user.phoneNumber
    }).then(res=>{
        return res.data;
    })
}
