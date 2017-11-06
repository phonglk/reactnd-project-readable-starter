import React, { PureComponent } from 'react'

export default class LoadWrapper extends PureComponent {
  render() {
    const { loading } = this.props;
    return (
      <div className="load-wrapper">
        <div className={'loader' + (loading === true ? ' loading': '')}>
          <i className={'fa fa-circle-o-notch fa-3x fa-fw' + (loading === true ? ' fa-spin': '') }></i>
        </div>
        {this.props.children}
      </div>
    )
  }
}