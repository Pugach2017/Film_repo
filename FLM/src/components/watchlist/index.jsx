import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import withRenderLog from '../../hoc/withRenderLog';
import { removeFromWatchlist } from '../../redux/actions/watchlist';
import getWatchist from '../../redux/selectors/watchlist';

import Panel from '../shared-ui/panel';
import WatchMovie from '../watch-movie';
import Style from './style.css';

const Watchlist = ({
  watchlist,
  onClickInfo,
  removeFromWatchlist: removeFromWatch,
}) => (
  <Panel watchListPanel>
    <h3 className={Style.title}>Watchlist</h3>
    {watchlist.length > 0 && (
      <ul className={Style.ul}>
        {watchlist.map(movie => (
          <li key={movie.id} className={Style.li}>
            <WatchMovie
              movie={movie}
              onClickRemove={() => removeFromWatch(movie)}
              onClickInfo={() => onClickInfo(movie.id)}
            />
          </li>
        ))}
      </ul>
    )}
  </Panel>
);

Watchlist.propTypes = {
  watchlist: PropTypes.arrayOf(Object).isRequired,
  onClickInfo: PropTypes.func.isRequired,
  removeFromWatchlist: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  watchlist: getWatchist(state),
});

const mapDispatchToProps = { removeFromWatchlist };

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withRenderLog,
)(Watchlist);
