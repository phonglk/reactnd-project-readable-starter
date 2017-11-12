import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Post from '../components/post';
import LoadWrapper from '../components/load-wrapper';
import { requestPost, deletePost } from '../data/post/action';

class PostDetailContainer extends PureComponent {
  static propTypes = {
    postId: PropTypes.string,
  }
  static defaultProps = {
    post: {},
  }
  deletePost = (post) => {
    this.props.dispatch(deletePost(post));
  }
  render() {
    const { post, isLoading } = this.props;
    return <LoadWrapper loading={isLoading}>
      <Post post={post} deletePost={this.deletePost} />
    </LoadWrapper>
  }

  componentDidMount() {
    this.props.dispatch(requestPost(this.props.postId));
  }

  componentWillUpdate(nextProps) {
    if (nextProps.postId !== this.props.postId) {
      this.props.dispatch(requestPost(nextProps.postId));
    }
  }

}

const mapStateToProps = (state, ownState) => {
  const { postId } = ownState;
  return {
    post: state.data.post.ref[postId],
    postId,
    isLoading: state.data.post.isLoading,
  };
}
export default connect(mapStateToProps)(PostDetailContainer);