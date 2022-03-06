import React, { Component } from 'react';
import Joi from 'joi-browser';
import Form from './common/form';

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

    

    doSumbit = () => {
        // call server
        console.log('Submitted');
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