import React, {useState} from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Joi from 'joi-browser';
import Input from './common/input';
import auth from '../services/authService';

const LoginForm = () => {

    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ errors, setErrors ] = useState({ username: '', password: ''});

    const location = useLocation();
    const user = auth.getCurrentUser();

    const schema = {
        username: Joi.string().required().label('Username'),
        password: Joi.string().required().label('Password')
    };

    const handleSumbit = e => {
        e.preventDefault();

        const errors = validate();
        
        if (errors) return;
        setErrors({ username: '', password: ''}); // need for vars of error input

        doSumbit();
    };

    const validate = () => {
        const options = { abortEarly: false }; 
        const { error } = Joi.validate({ username, password }, schema, options);
        if (!error ) return null;
        
        const errors = {};
        for (let item of error.details)
            errors[item.path[0]] = item.message;

        return errors;
    };

    const doSumbit = async () => {
        try {
            await auth.login(username, password);
            let from = location.state?.from?.pathname || "/";
            window.location.href = from;
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                const errors = {...errors};
                errors.username = ex.response.data;
                this.setState({ errors });
            }
        }
    }

    return user ? <Navigate to='/' /> : (
        <div className='container'>
            <h1>Login</h1>
            <form onSubmit={handleSumbit}>
                <Input type='text' name='username' label='Username' value={username} error={errors.username} onChange={e => setUsername(e.target.value)}/>
                <Input type='password' name='password' label='Password' value={password} error={errors.password} onChange={e => setPassword(e.target.value)}/>
                <button className='btn btn-primary'>Login</button>
            </form>
        </div>
    );
}
 
export default LoginForm;