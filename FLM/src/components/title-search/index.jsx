import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Panel from '../shared-ui/panel';
import Button from '../shared-ui/button';
import Icons from '../svg/icons';
import Icon from '../svg';
import Style from './style.css';

class TitleSearch extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = { title: '' };

  changeTitle = ({ target }) => {
    this.setState({ title: target.value });
  };

  submitTitle = evt => {
    evt.preventDefault();
    const { title } = this.state;
    const { onSubmit } = this.props;

    if (!title) return;

    onSubmit(title);
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

export default TitleSearch;
