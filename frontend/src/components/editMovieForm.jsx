import React from 'react';
import MovieForm from './movieForm';
import { useParams, useNavigate } from 'react-router-dom';
import httpService from '../services/httpService';
import config from "../config.json";

const EditMovieForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    return <MovieForm navigate={navigate} id={id}/>;
}
 
export default EditMovieForm;