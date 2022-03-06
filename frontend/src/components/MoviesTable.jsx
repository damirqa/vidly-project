import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Table from './table'; 

class MoviesTable extends Component {
    columns = [
        {path: 'title', label: 'Title', content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>},
        {path: 'genre.name', label: 'Genre'},
        {path: 'numberInStock', label: 'Stock'},
        {path: 'dailyRentalRate', label: 'Rate'},
        {key: 'like', content: movie => <i onClick={() => this.props.onFavorite(movie)} className={this.props.likedList.indexOf(movie._id) > -1 ? 'bi bi-heart-fill' : 'bi bi-heart' }></i>},
        {key: 'delete', content: movie => <button onClick={() => this.props.onDelete(movie)} className='btn btn-danger btn-sm'>Delete</button>}
    ];

    render() { 
        const { movies, sortColumn, onSort } = this.props; 
        
        return <Table columns={this.columns} sortColumn={sortColumn} onSort={onSort} data={movies} />
    };
};
 
 
export default MoviesTable;