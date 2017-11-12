import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class PostSort extends PureComponent {
  static propTypes = {
    sortBy: PropTypes.string.isRequired,
    changeSort: PropTypes.func
  }
  render () {
    const { sortBy } = this.props;
    return (
      <div className="post-sort"> Sort&nbsp;&nbsp;
        {sortBy === 'date' ? <span>Date <i className="fa fa-calendar"/></span>
        : <button onClick={() => this.props.changeSort('date')}>Date <i className="fa fa-calendar"/></button>}
        &nbsp;|&nbsp;
        {sortBy === 'score' ? <span>Score <i className="fa fa-thumbs-o-up"/></span>
        : <button onClick={() => this.props.changeSort('score')}>Score <i className="fa fa-thumbs-o-up"/></button>}
      </div>
    )
  }
}
