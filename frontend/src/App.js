import React, { Component } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Movies from './components/Movies';
import Customers from './components/customers';
import Rentals from './components/Rentals';
import NavBar from './components/navbar';
import Logout from './components/logout';
import NotFound from './components/notFound';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';
import NewMovieForm from './components/newMovieForm';
import EditMovieForm from './components/editMovieForm';
import AuthWare from './components/common/authWare';
import auth from './services/authService';

import './App.css';

class App extends Component {
  
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user })
  }

  render() {
    const { user } = this.state;
    return (
      <BrowserRouter>
        <ToastContainer/>
        <NavBar user={user}/>
        <div className='content'>
          <Routes>
            <Route path='/register/' element={<RegisterForm/>}/>
            <Route path='/login/' element={<LoginForm/>}/>
            <Route path='/logout' element={<Logout/>}/>
            <Route path='/movies/new' element={<AuthWare component={NewMovieForm} />} />
            <Route path='/movies/' element={<Movies user={this.state.user}/>}/>
            <Route path='/movies/:id' element={<AuthWare component={EditMovieForm} />} />
            <Route path='/customers' element={<Customers/>}/>
            <Route path='/rentals' element={<Rentals/>}/>
            <Route path='/' element={<Navigate to='/movies'/>}/>
            <Route path='*' element={<NotFound/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    );
  };
}

export default App;


    