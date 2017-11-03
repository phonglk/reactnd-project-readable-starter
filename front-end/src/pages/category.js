import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

class Category extends PureComponent {
  render() {
    return <div>Category</div>
  }
}
const mapStateToProps = (state) => {
  return state.app;
}
export default connect(mapStateToProps)(Category);