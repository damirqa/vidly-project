import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import http from '../services/httpService';
import config from '../config.json'
import { getGenres } from './../services/genreService';
import { getMovie, saveMovie } from '../services/movieService';

class MovieForm extends Form {
    state = {
        data: { title: "", genreId: "", numberInStock: "", dailyRentalRate: ""},
        errors: {},
        genres: []
    }

    async populateGenres() {
        const { data: genres } = await getGenres();
        this.setState({ genres });
    }

    async populateMovie() {
        try {
            if (this.props.id === "new") return;

            const { data: movie} =  await getMovie(this.props.id);
            this.setState({ data: this.mapToViewModel(movie) });
        } catch (ex) {
            if (ex.response && ex.response.status === 404)
                this.props.navigate('/not-found'); 
        }
    }

    async componentDidMount() {
        await this.populateGenres();
        await this.populateMovie();
    }

    mapToViewModel(movie) {
        return {
            _id: movie._id,
            title: movie.title,
            genreId: movie.genre._id,
            numberInStock: movie.numberInStock,
            dailyRentalRate: movie.dailyRentalRate
        };
    }

    schema = {
        _id: Joi.string(),
        title: Joi.string().required().label('Title'),
        genreId: Joi.string().required().label('Genre'),
        numberInStock: Joi.number().min(0).max(100).required().label('Number in Stock'),
        dailyRentalRate: Joi.number().min(0).max(10).required().label('Rate'),
    };

    async doSumbit() {
        const result = saveMovie(this.state.data);
        this.props.navigate('/movies');
    }

    render() { 
        return (
            <div className='container'>
                <h1>Movie Form</h1>
                <form onSubmit={this.handleSumbit}>
                    {this.renderInput('title', 'Title')}
                    {this.renderSelect('genreId', 'Genre', this.state.genres)}
                    {this.renderInput('numberInStock', 'Number in Stock')}
                    {this.renderInput('dailyRentalRate', 'Rate')}
                    {this.renderButton('Save')}
                </form>
            </div>
        );
    }
}
 
export default MovieForm;