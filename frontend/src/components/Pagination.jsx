import React from 'react';
import _ from 'lodash';
import propTypes from 'prop-types';

const Pagination = ({ countMovies, pageSize, currentPage, onPageChange }) => {
    const countPages = Math.round(countMovies / pageSize);

    if (countPages === 1) return null;
    const pages = _.range(1, countPages + 1)

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                { pages.map(page => (
                    <li key={page} className={page === currentPage ? "page-item active" : "page-item"}>
                        <a className="page-link" onClick={() => onPageChange(page)}>{page}</a>
                    </li>
                )) }
                
            </ul>
        </nav>
    );
};

Pagination.propTypes = {
    countMovies: propTypes.number.isRequired, 
    pageSize: propTypes.number.isRequired, 
    currentPage: propTypes.number.isRequired, 
    onPageChange: propTypes.func.isRequired
};
 
export default Pagination;