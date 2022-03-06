import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from './common/Button';

const Movie = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const save = () => {
        navigate('/movies');
    };

    return (
        <div>
            <h1>Movie Form {id}</h1>
            <Button title='Save' type='btn btn-primary' onClick={save} />
        </div>
    );
}
 
export default Movie;