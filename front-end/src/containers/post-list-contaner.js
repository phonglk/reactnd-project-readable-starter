import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import PostList from '../components/post-list';
import LoadWrapper from '../components/load-wrapper';
import PostSort from '../components/post-sort';
import { requestPosts, deletePost, changeSort } from '../data/post/action';

class PostListContainer extends PureComponent {
  static propTypes = {
    posts: PropTypes.arrayOf(PropTypes.object),
    category: PropTypes.string
  }
  deletePost = (post) => {
    this.props.dispatch(deletePost(post));
  }
  changeSort = (sort) => {
    this.props.dispatch(changeSort(sort));
  }
  render() {
    const { posts, isLoading, category, sortBy } = this.props;
    const createCategory = category ? `/${category}` : '';
    return <LoadWrapper loading={isLoading}>
      {posts.length > 1 && <PostSort sortBy={sortBy} changeSort={this.changeSort} />}
      <PostList posts={posts} deletePost={this.deletePost} />
      <Link to={`/posts/create${createCategory}`} className="btn create-post">Create new post <i className="fa fa-plus-circle" /></Link>
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
    posts: post.list
      .sort((p1, p2) => post.sortBy === 'date'
        ? post.ref[p1].timestamp - post.ref[p2].timestamp // ASC
        : post.ref[p2].voteScore - post.ref[p1].voteScore // DESC
      )
      .map(id => post.ref[id]),
    category: ownState.category,
    isLoading: post.isLoading,
    sortBy: post.sortBy,
  };
}
export default connect(mapStateToProps)(PostListContainer);