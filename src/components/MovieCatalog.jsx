import React from 'react';
import { 
    Form, 
    FormControl, 
    Container, Spinner, 
    CardDeck, 
    Row, 
    Col 
} from 'react-bootstrap';
import Movie from './Movie.jsx';
import { connect } from 'react-redux';
import _ from 'lodash';
import { search } from '../actions';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';
import ReactPaginate from 'react-paginate';
import '../css/main.css';
import { LoggedInUser } from './LoggedInUser.jsx';
import BaseConfig from '../config/base-config';

class MovieCatalog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            page: 1
        }
        this.searchMovies = _.debounce(this.searchMovies.bind(this), 1000);
        this.handlePageClick = this.handlePageClick.bind(this);
    }

    onChange(event) {
        this.setState({ searchText: event.target.value, page:1 }, () => {
            this.searchMovies();
        })
    }

    searchMovies() {
        let { searchText, page } = this.state;
        this.props.searchMovies(searchText, page);
    }

    handlePageClick(data) {
        this.setState({ page: data.selected + 1 }, () => {
            let { searchText, page } = this.state;
            this.props.searchMovies(searchText, page);
        });
    }

    render() {
        const { isFetching, movies, errorMsg, totalResults } = this.props;
        const pageCount = Math.ceil((parseInt(totalResults)/BaseConfig.pagination));
        return (
            <div>
                <div className="movie-catalog">
                    <Row>
                    <Col xs={12} md={3}><h3>Movie Catalog</h3></Col>
                    <Col xs={12} md={6}>
                        <Form inline>
                            <FormControl style={{width:"100%"}} type="text" placeholder="Search" onChange={(event) => this.onChange(event)} value={this.state.searchText} />
                        </Form>
                    </Col>
                    <Col xs={12} md={3} className="no-mobile"><LoggedInUser /></Col>
                    </Row>
                </div>
                <Container style={{ textAlign: "center" }}>
                    {
                        isFetching ? <Spinner animation="border" variant="primary" /> : null
                    }
                    <div>
                        {  movies.length > 0 ? (<Row style={{padding:"15px"}}><b>{`You Searched for: ${this.state.searchText}, ${totalResults} results found`}</b></Row>): null}
                        {
                            movies.length > 0 ?
                                (
                                    new Array(Math.ceil(movies.length / BaseConfig.moviesPerRow))
                                        .fill(0)
                                        .map((zero, i) => {
                                            return (<CardDeck key={uuidv4()}>
                                                {movies.slice(i * BaseConfig.moviesPerRow, BaseConfig.moviesPerRow * (i + 1)).map(item => {
                                                    return (
                                                        <Movie key={item.imDbId} src={item.Poster} name={item.Title} year={item.Year} imDbId={item.imdbID} type={item.Type} />
                                                    );
                                                })}
                                            </CardDeck>);
                                        })

                                )
                                : null
                        }
                        {
                            pageCount > 1 ?
                                (<ReactPaginate
                                    previousLabel={'<'}
                                    nextLabel={'>'}
                                    breakLabel={'...'}
                                    breakClassName={'break-me'}
                                    pageCount={pageCount}
                                    marginPagesDisplayed={2}
                                    pageRangeDisplayed={5}
                                    onPageChange={this.handlePageClick}
                                    containerClassName={'pagination'}
                                    subContainerClassName={'pages pagination'}
                                    activeClassName={'active'}
                                />) : null
                        }
                    </div>
                    {
                        errorMsg || null
                    }
                </Container>
            </div>
        )
    }
}

MovieCatalog.propTypes = {
    isFetching: PropTypes.bool.isRequired,
    errorMsg: PropTypes.string.isRequired,
    movies: PropTypes.array.isRequired,
    searchMovies: PropTypes.func.isRequired,
    totalResults: PropTypes.string.isRequired
}

const mapStateToProps = (state) => ({
    isFetching: _.get(state, 'isFetching', false),
    movies: _.get(state, 'movies.Search', []),
    errorMsg: _.get(state, 'errorMsg', ''),
    totalResults: (_.get(state, 'movies.totalResults', 0) - 1).toString()
});

const mapDispatchToProps = (dispatch) => ({
    searchMovies: (searchText, page) => dispatch(search(searchText, page))
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieCatalog);