import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { fetchMoviesByCategory, fetchMoviesByTitle } from '../../services/api';
import Watchlist from '../watchlist';
import CategorySelector from '../category-selector';
import TitleSearch from '../title-search';
import Loader from '../shared-ui/loader/load';
import ErrorNotification from '../shared-ui/error-notification';
import MovieList from '../movie-list';
import Panel from '../shared-ui/panel';
import MovieInfoModal from '../movie-info-modal';
import selectorOptions from '../../selector-options';
import styles from './style.css';

class App extends Component {
  state = {
    category: null,
    movies: [],
    isLoading: false,
    error: null,
    watchlist: [],
    movieID: null,
    showModal: false,
  };

  componentDidMount() {
    const watchlist = localStorage.getItem('watchlist');
    if (watchlist) {
      this.setState({ watchlist: JSON.parse(watchlist) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { category } = this.state;
    const { watchlist } = this.state;
    localStorage.setItem('watchlist', JSON.stringify(watchlist));

    if (!prevState.category && !category) return;

    if (!prevState.category) {
      this.handleFetch();
      fetchMoviesByCategory({
        category: category.value,
        onSuccess: this.handleFetchSuccess,
        onError: this.handleFetchError,
      });
      return;
    }

    const prevCategory = prevState.category;

    if (prevCategory.value !== category.value) {
      this.handleFetch();
      fetchMoviesByCategory({
        category: category.value,
        onSuccess: this.handleFetchSuccess,
        onError: this.handleFetchError,
      });
    }
  }

  handleOpenModal = movieID => {
    this.setState({ movieID, showModal: true });
  };

  handleCloseModal = () => this.setState({ movieID: null, showModal: false });

  removeWatchlist = movie => {
    const { watchlist } = this.state;
    const { id } = movie;
    const newWatchList = watchlist.filter(item => item.id !== id);

    this.setState({ watchlist: newWatchList }, () =>
      localStorage.setItem('watchlist', JSON.stringify(newWatchList)),
    );
  };

  addWatchList = movie => {
    const { watchlist } = this.state;
    const { id } = movie;
    const isMovieInWatchlist = watchlist.find(item => item.id === id);

    if (isMovieInWatchlist) return;

    this.setState(prevState => ({
      watchlist: [movie, ...prevState.watchlist],
    }));
  };

  handleFetchSuccess = movies => this.setState({ movies, isLoading: false });

  handleFetchError = error => this.setState({ error, isLoading: false });

  handleFetch = () => {
    this.setState({ isLoading: true, error: null });
  };

  searchByTitle = value => {
    fetchMoviesByTitle({
      title: value,
      onSuccess: this.handleFetchSuccess,
      onError: this.handleFetchError,
    });
  };

  changeCategory = category => this.setState({ category });

  render() {
    const {
      category,
      movies,
      isLoading,
      error,
      watchlist,
      movieID,
      showModal,
    } = this.state;

    return (
      <div className={styles.wrapper}>
        {showModal && (
          <MovieInfoModal
            movieID={movieID}
            showModal={showModal}
            onClose={this.handleCloseModal}
          />
        )}
        <aside className={styles.aside}>
          <Watchlist
            watchlist={watchlist}
            onClickRemove={this.removeWatchlist}
            onClickInfo={this.handleOpenModal}
          />
        </aside>
        <main className={styles.main}>
          <Panel searhPanel>
            <CategorySelector
              value={category}
              onChange={this.changeCategory}
              options={selectorOptions}
              placeholder="Choose category..."
            />
            <TitleSearch onSubmit={this.searchByTitle} />
          </Panel>

          {error && <ErrorNotification message={error.message} />}

          {isLoading && <Loader />}

          {movies.length > 0 && (
            <MovieList
              movies={movies}
              onClickAdd={this.addWatchList}
              onClickInfo={this.handleOpenModal}
            />
          )}
        </main>
      </div>
    );
  }
}

export default hot(module)(App);
