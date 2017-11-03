import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

class Post extends PureComponent {
  render() {
    return <div>Post</div>
  }
}
const mapStateToProps = (state) => {
  return state.app;
}
export default connect(mapStateToProps)(Post);