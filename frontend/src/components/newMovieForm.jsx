import React from 'react';
import { useNavigate } from 'react-router-dom';
import MovieForm from './movieForm';

const NewMovieForm = () => {
    const navigate = useNavigate();
    return (
        <MovieForm navigate={navigate} id="new"/>
    );
}
 
export default NewMovieForm;