import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class CategoryList extends PureComponent {
  static propTypes = {
    categories: PropTypes.arrayOf(PropTypes.object),
  }
  static defaultProps = {
    categories: [],
  }
  render () {
    return (
      <div className="category-list">
        {this.props.categories.map(({path, name}) => (
          <Link to={`/${path}`} key={path}>{name}</Link>
        ))}
      </div>
    )
  }
}
