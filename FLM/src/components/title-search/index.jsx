import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import withRenderLog from '../../hoc/withRenderLog';
import fetchMovies from '../../redux/actions/fetch';
import { getTitleUrl } from '../../services/api';

import Panel from '../shared-ui/panel';
import Button from '../shared-ui/button';
import Icons from '../svg/icons';
import Icon from '../svg';
import Style from './style.css';

class TitleSearch extends Component {
  static propTypes = {
    fetchMovies: PropTypes.func.isRequired,
  };

  state = { title: '' };

  changeTitle = ({ target }) => {
    this.setState({ title: target.value });
  };

  submitTitle = evt => {
    evt.preventDefault();

    const { title } = this.state;
    const { fetchMovies: fetchMoviesByTitle } = this.props;

    if (!title) return;

    const url = getTitleUrl(title);
    fetchMoviesByTitle(url);
    this.setState({ title: '' });
  };

  render() {
    const { title } = this.state;

    return (
      <Panel searchBlock>
        <form onSubmit={this.submitTitle} className={Style.form}>
          <p className={Style.label}>Search by title</p>
          <input
            className={Style.input}
            value={title}
            onChange={this.changeTitle}
            type="text"
          />
          <Button>
            <Icon icon={Icons.SEARCH} />
          </Button>
        </form>
      </Panel>
    );
  }
}

const mapDispatchtoProps = { fetchMovies };

export default compose(
  connect(
    null,
    mapDispatchtoProps,
  ),
  withRenderLog,
)(TitleSearch);
