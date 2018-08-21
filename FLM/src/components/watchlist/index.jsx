import React from 'react';
import PropTypes from 'prop-types';
import Panel from '../shared-ui/panel';
import WatchMovie from '../watch-movie';
import Style from './style.css';

const Watchlist = ({ watchlist, onClickRemove, onClickInfo }) => (
  <Panel watchListPanel>
    <h3 className={Style.title}>Watchlist</h3>
    {watchlist.length > 0 && (
      <ul className={Style.ul}>
        {watchlist.map(movie => (
          <li key={movie.id} className={Style.li}>
            <WatchMovie
              movie={movie}
              onClickRemove={() => onClickRemove(movie)}
              onClickInfo={() => onClickInfo(movie.id)}
            />
          </li>
        ))}
      </ul>
    )}
  </Panel>
);

Watchlist.propTypes = {
  watchlist: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ).isRequired,
  onClickRemove: PropTypes.func.isRequired,
  onClickInfo: PropTypes.func.isRequired,
};

export default Watchlist;
