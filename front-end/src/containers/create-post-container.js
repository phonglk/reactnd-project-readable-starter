import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoadWrapper from '../components/load-wrapper';
import { postPost, requestPost, updatePost } from '../data/post/action';

class CreatePostContainer extends PureComponent {
  static propTypes = {
    category: PropTypes.string,
    postId: PropTypes.string,
    mode: PropTypes.string,
    post: PropTypes.object,
  }
  constructor(props) {
    super(props);
    this.state = {
      category: props.category || 'none',
      title: '',
      author: '',
      body: '',
    }
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.post) {
      this.setState(nextProps.post);
    }
  }
  onValueChange = (propName, e) => {
    const value = e.target.value;
    this.setState({ [propName]: value });
  }
  onSubmit = (e) => {
    const { category, author, title, body } = this.state;
    if (!category || category === 'none') {
      alert('Please select the category of this post');
      return this.inputCategory.focus();
    }
    if (!author || author === '') {
      alert('Please fill in author of this post');
      return this.inputAuthor.focus();
    }
    if (!title || title === '') {
      alert('Please fill in title of this post');
      return this.inputTitle.focus();
    }
    if (!body || body === '') {
      alert('Please fill in content of this post');
      return this.inputBody.focus();
    }
    const post = {
      author,
      body,
      title,
      category,
    }
    if (this.props.mode === 'create') this.props.dispatch(postPost(post))
    else this.props.dispatch(updatePost({
      id: this.props.postId,
      ...post,
    }))
  }
  render() {
    const { categories, isPosting, mode } = this.props;
    const { category, author, title, body } = this.state;
    return (
      <LoadWrapper loading={isPosting}>
        <div className="create-post-wrapper">
          <label>
            <span>Category</span>
            <select
              value={category}
              onChange={this.onValueChange.bind(this, 'category')}
              ref={i => this.inputCategory = i}
              disabled={mode==='edit'}
            >
              {category === 'none' && <option value="none" key="none" disabled>Select ...</option>}
              {categories.map(cat => <option value={cat.path} key={cat.path}>{cat.name}</option>)}
            </select>
          </label>
          <label>
            <span>Author</span>
            <input type="text" value={author} ref={i => this.inputAuthor = i} onChange={this.onValueChange.bind(this, 'author')} disabled={mode==='edit'}/>
          </label>
          <label>
            <span>Title</span>
            <input type="text" value={title} ref={i => this.inputTitle = i} onChange={this.onValueChange.bind(this, 'title')}/>
          </label>
          <label>
            <span>Content</span>
            <textarea value={body} ref={i => this.inputBody = i} onChange={this.onValueChange.bind(this, 'body')}></textarea>
          </label>
          <label>
            <span></span>
            <button onClick={this.onSubmit} className="btn">
              {mode === 'create' && <span>Post <i className="fa fa-plus-circle" /></span>}
              {mode === 'edit' && <span>Update <i className="fa fa-edit" /></span>}
            </button>
          </label>
        </div>
      </LoadWrapper>
    );
  }

  componentDidMount() {
    const { mode, postId } = this.props;
    console.log(mode, postId);
    if (mode === 'edit') {
      this.props.dispatch(requestPost(postId));
    }
  }
}

const mapStateToProps = (state, ownState) => {
  const { category, post } = state.data;
  return {
    categories: category.list.map(id => category.ref[id]),
    isPosting: post.isPosting === true,
    post: post.ref[ownState.postId] || ownState.post,
    mode: ownState.mode,
    postId: ownState.postId,
  };
}
export default connect(mapStateToProps)(CreatePostContainer);