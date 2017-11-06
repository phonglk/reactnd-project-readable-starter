import React, { PureComponent } from 'react'
import { connect } from 'react-redux';
import CategoryList from '../components/category-list';
import LoadWrapper from '../components/load-wrapper';
import { requestCategories } from '../data/category/action';

class CategoryListContainer extends PureComponent {
  render() {
    const { categories, isLoading } = this.props;
    return (
      <LoadWrapper loading={isLoading}>
        <CategoryList categories={categories} />
      </LoadWrapper>
    )
  }

  componentDidMount() {
    this.props.dispatch(requestCategories());
  }
}

const mapStateToProps = (state) => {
  const { category } = state.data;
  return {
    categories: category.list.map(id => category.ref[id]),
    isLoading: category.isLoading,
  };
}
export default connect(mapStateToProps)(CategoryListContainer);