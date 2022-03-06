import React from 'react';
import Form from './common/form';
import Joi from 'joi-browser';

class RegisterForm extends Form {
    state = {
        data: {
            username: '', password: '', name: ''
        },
        errors: {}
    } 

    schema = {
        username: Joi.string().required().email().label('E-mail'),
        password: Joi.string().min(5).required().label('Password'),
        name: Joi.string().required().label('Name')
    }

    doSumbit() {
        //call server
        console.log('Registered')
    }

    render() { 
        return (
            <div className='container'>
                <h1>Register</h1>
                <form onSubmit={this.handleSumbit}>
                    {this.renderInput('username', 'Username', 'email')}
                    {this.renderInput('password', 'Password', 'password')}
                    {this.renderInput('name', 'Name')}
                    {this.renderButton('Register')}
                </form>
            </div>
        );
    }
}
 
export default RegisterForm;