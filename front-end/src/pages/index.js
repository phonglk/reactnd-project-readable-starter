import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { indexInit } from '../actions';
import CategoryList from '../components/category-list';
import Page from './page';

const Content = () => <div>Index</div>

class Index extends PureComponent {
  async componentDidMount() {
    this.props.dispatch(indexInit());
  }
  render() {
    const { categories } = this.props;
    return <Page
      Content={<Content />}
      Side={<CategoryList categories={categories} />}
    />
  }
}
const mapStateToProps = (state) => {
  return state.app;
}
export default connect(mapStateToProps)(Index);