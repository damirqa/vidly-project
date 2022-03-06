import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import { login } from '../services/authService';
import { Navigate, useNavigate } from 'react-router-dom';

class LoginForm extends Form {
    
    state = {
        data: {
            username: '', password: ''
        },
        errors: {

        }
    };

    schema = {
        username: Joi.string().required().label('Username'),
        password: Joi.string().required().label('Password')
    };

    

    doSumbit = async () => {
        try {
            const { data } = this.state;
            const { data: jwt} = await login(data.username, data.password);
            localStorage.setItem('token', jwt);
            window.location.href = '/';
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                const errors = {...this.state.errors};
                errors.username = ex.response.data;
                this.setState({ errors });
            }
        }
    }

    

    render() {
        return (
            <div className='container'>
                <h1>Login</h1>
                <form onSubmit={this.handleSumbit}>
                    {this.renderInput('username', 'Username')}
                    {this.renderInput('password', 'Password', 'password')}
                    {this.renderButton('Login')}
                </form>
            </div>
        );
    }
}
 
export default LoginForm;