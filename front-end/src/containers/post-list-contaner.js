import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostList from '../components/post-list';
import LoadWrapper from '../components/load-wrapper';
import { requestPosts } from '../data/post/action';

class PostListContainer extends PureComponent {
  static propTypes = {
    posts: PropTypes.arrayOf(PropTypes.object),
    category: PropTypes.string
  }
  render() {
    const { posts, isLoading } = this.props;
    return <LoadWrapper loading={isLoading}>
      <PostList posts={posts} />
    </LoadWrapper>
  }

  componentDidMount() {
    this.props.dispatch(requestPosts(this.props.category));
  }

  componentWillUpdate(nextProps) {
    if (nextProps.category !== this.props.category) {
      this.props.dispatch(requestPosts(nextProps.category));
    }
  }

}

const mapStateToProps = (state, ownState) => {
  const { post } = state.data;
  return {
    posts: post.list.map(id => post.ref[id]),
    category: ownState.category,
    isLoading: post.isLoading,
  };
}
export default connect(mapStateToProps)(PostListContainer);