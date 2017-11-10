import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostList from '../components/post-list';
import LoadWrapper from '../components/load-wrapper';
import { requestPosts, postPost } from '../data/post/action';

class CreatePostContainer extends PureComponent {
  static propTypes = {
    category: PropTypes.string
  }
  constructor(props) {
    super(props);
    const { category = 'none' } = this.props;
    this.state = {
      category,
    }
  }
  onCategoryChange = (e) => {
    const category = e.target.value;
    this.setState({ category });
  }
  onSubmit = (e) => {
    const { category } = this.state;
    if (category === 'none') {
      alert('Please select the category of this post');
      return this.inputCategory.focus();
    }
    const author = this.inputAuthor.value.trim();
    if (author === '') {
      alert('Please fill in author of this post');
      return this.inputAuthor.focus();
    }
    const title = this.inputTitle.value.trim();
    if (title === '') {
      alert('Please fill in title of this post');
      return this.inputTitle.focus();
    }
    const body = this.inputBody.value.trim();
    if (body === '') {
      alert('Please fill in content of this post');
      return this.inputBody.focus();
    }
    const post = {
      author,
      body,
      title,
      category,
    }
    this.props.dispatch(postPost(post))
  }
  render() {
    const { categories, isPosting } = this.props;
    const { category } = this.state;
    return (
      <LoadWrapper loading={isPosting}>
        <div className="create-post-wrapper">
          <label>
            <span>Category</span>
            <select value={category} onChange={this.onCategoryChange} ref={i => this.inputCategory = i} >
              {category === 'none' && <option value="none" key="none" disabled>Select ...</option>}
              {categories.map(cat => <option value={cat.path} key={cat.path}>{cat.name}</option>)}
            </select>
          </label>
          <label>
            <span>Author</span>
            <input type="text" ref={i => this.inputAuthor = i}/>
          </label>
          <label>
            <span>Title</span>
            <input type="text" ref={i => this.inputTitle = i}/>
          </label>
          <label>
            <span>Content</span>
            <textarea ref={i => this.inputBody = i}></textarea>
          </label>
          <label>
            <span></span>
            <button onClick={this.onSubmit} className="btn">Post <i className="fa fa-plus-circle" /></button>
          </label>
        </div>
      </LoadWrapper>
    );
  }

  componentDidMount() {
    
  }
}

const mapStateToProps = (state, ownState) => {
  const { category, post } = state.data;
  return {
    categories: category.list.map(id => category.ref[id]),
    isPosting: post.isPosting === true,
  };
}
export default connect(mapStateToProps)(CreatePostContainer);