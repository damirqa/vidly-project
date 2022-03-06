import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Movies from './components/Movies';
import Customers from './components/customers';
import Rentals from './components/Rentals';
import Movie from './components/Movie';
import NavBar from './components/navbar';
import NotFound from './components/notFound';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';
import NewMovieForm from './components/newMovieForm';
import EditMovieForm from './components/editMovieForm';
import { ToastContainer } from 'react-toastify';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer/>
      <NavBar/>
      <div className='content'>
        <Routes>
          <Route path='/register/' element={<RegisterForm/>}/>
          <Route path='/login/' element={<LoginForm/>}/>
          <Route path='/movies/new' element={<NewMovieForm />}/>
          <Route path='/movies/' element={<Movies/>}/>
          <Route path='/movies/:id' element={<EditMovieForm/>}/>
          <Route path='/customers' element={<Customers/>}/>
          <Route path='/rentals' element={<Rentals/>}/>
          <Route path='/' element={<Navigate to='/movies'/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
