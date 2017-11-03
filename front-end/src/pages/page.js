import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class Page extends PureComponent {
  static propTypes = {
    Side: PropTypes.node,
    Content: PropTypes.node,
  }
  static defaultProps = {
    Side: <div />,
    Content: <div />,
  }
  render() {
    const { Side, Content } = this.props;
    return (
      <div className="page-wrapper">
        <div className="page-side-bar">
          <div className="app-title"><Link to="/">Readable</Link></div>
          {Side}
        </div>
        <div className="page-content">
          {Content}
        </div>
      </div>
    )
  }
}