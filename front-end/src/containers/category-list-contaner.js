import React, { PureComponent } from 'react'
import { connect } from 'react-redux';
import CategoryList from '../components/category-list';
import LoadWrapper from '../components/load-wrapper';
import { requestCategories } from '../data/category/action';

class CategoryListContainer extends PureComponent {
  render() {
    const { categories, isLoading, category } = this.props;
    return (
      <LoadWrapper loading={isLoading}>
        <CategoryList categories={categories} category={category} />
      </LoadWrapper>
    )
  }

  componentDidMount() {
    this.props.dispatch(requestCategories());
  }
}

const mapStateToProps = (state, ownState) => {
  const { category } = state.data;
  return {
    categories: category.list.map(id => category.ref[id]),
    isLoading: category.isLoading,
    category: ownState.match.params.category,
  };
}
export default connect(mapStateToProps)(CategoryListContainer);