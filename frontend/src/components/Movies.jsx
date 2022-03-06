import React, {Component} from 'react';
import Pagination from './Pagination';
import {paginate} from '../utils/paginate';
import ListGroup from './ListGroup';
import { Link } from 'react-router-dom';
import { getGenres } from '../services/genreService';
import { getMovies, deleteMovie } from '../services/movieService';
import MoviesTable from './MoviesTable';
import _ from 'lodash';
import { toast } from 'react-toastify';

class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        likedList: [],
        currentPage: 1,
        pageSize: 3,
        sortColumn: {path: 'title', order: 'asc'},
        search: ""
    }

    async componentDidMount() {
        const { data } = await getGenres();
        const { data: movies } = await getMovies();

        this.setState({
            movies,
            genres: [{_id: '', name: 'All genres'}, ...data]
        })
    }

    handleDelete = async (movie) => {
        const originalMovies = this.state.movies;

        const movies = originalMovies.filter(m => m._id !== movie._id);
        this.setState({ movies });

        try {
            await deleteMovie(movie._id);
        }
        catch (ex) {
            if (ex.respone && ex.respone.status === 404)
                toast.error('This movie has already been deleted.');
            this.setState({ movies: originalMovies })
        }

    }

    handleFavorite = (movie) => {
        const likedList = [...this.state.likedList];
        const index = likedList.indexOf(movie._id);

        if (index > -1) {
            const newLikedList = likedList.filter(item => item !== movie._id);
            this.setState({ likedList: newLikedList })
        }
        else {
            likedList.push(movie._id);
            this.setState({ likedList })
        }
    }

    handleGenreSelect = (genre) => {
        this.setState({ selectedGenre: genre, currentPage: 1, search: "" })
    };

    handlePageChange = page => {
        this.setState({ currentPage: page })
    }

    handleSort = sortColumn => { 
        
        this.setState({ sortColumn });
    };

    getPagedData() {
        const {pageSize, currentPage, selectedGenre, search, sortColumn, movies: allMovies} = this.state;

        let filtered = allMovies;
        if (selectedGenre && selectedGenre._id !== '') filtered = allMovies.filter(m => selectedGenre._id === m.genre._id);
        if (search) filtered = allMovies.filter(m => m.title.toLowerCase().startsWith(search.toLowerCase()));

        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
        const movies = paginate(sorted, currentPage, pageSize);
        
        return { totalCount: filtered.length, data: movies};
    }

    handleSearch = e => {
        this.setState({
            selectedGenre: null,
            currentPage: 1,
            search: e.currentTarget.value
        });
    }

    render() {
        const { length: count } = this.state.movies;
        const {pageSize, currentPage, sortColumn } = this.state;

        if (count === 0) return <p>Фильмов нет!</p>

        const { totalCount, data: movies } = this.getPagedData(); 

        return (
            <div className='row'>
                <div className='col-3'>
                    <ListGroup items={this.state.genres} selectedItem={this.state.selectedGenre} onItemSelect={this.handleGenreSelect}/>
                </div>
                <div className='col-9'>
                    <Link to='/movies/new' className='btn btn-primary mb-2'>New Movie</Link>
                    <p>Количество в фильмов в базе данных { totalCount }.</p>
                    <input className="form-control mb-2" value={this.state.search} onChange={this.handleSearch} placeholder='Search...'/>
                    <MoviesTable movies={movies} likedList={this.state.likedList} sortColumn={sortColumn} onDelete={this.handleDelete} onFavorite={this.handleFavorite} onSort={this.handleSort}/>
                    <Pagination countMovies={ totalCount } pageSize={pageSize} currentPage={currentPage} onPageChange={this.handlePageChange}/>
                </div>
            </div>
        );
    }
}
 
export default Movies;