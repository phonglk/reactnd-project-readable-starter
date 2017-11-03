import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { indexInit } from '../actions';
import CategoryList from '../components/category-list';
import PostList from '../components/post-list';
import Page from './page';

const Content = (props) => (
  <div className="page-index">
    <PostList posts={props.posts} />
  </div>
)

class Index extends PureComponent {
  async componentDidMount() {
    this.props.dispatch(indexInit());
  }
  render() {
    const { categories, posts } = this.props;
    return <Page
      Content={<Content posts={posts} />}
      Side={<CategoryList categories={categories} />}
    />
  }
}
const mapStateToProps = (state) => {
  return {
    ...state.app.index,
    categories: state.categories.list.map(path => state.categories.category[path]),
    posts: state.posts.list.map(id => state.posts.post[id]),
  };
}
export default connect(mapStateToProps)(Index);