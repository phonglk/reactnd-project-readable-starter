import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

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
          <div className="app-title">Readable</div>
          {Side}
        </div>
        <div className="page-content">
          {Content}
        </div>
      </div>
    )
  }
}