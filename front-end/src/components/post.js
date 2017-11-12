import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import VoterContainer from '../containers/voter-container';

const getPostUrl = (post) => `/${post.category}/${post.id}`

export default class Post extends PureComponent {
  static propTypes = {
    post: PropTypes.object,
    deletePost: PropTypes.func,
  }

  onDeleteClick = () => {
    if(window.confirm('Are you sure you want to delete this post')) {
      this.props.deletePost(this.props.post);
    }
  }

  render() {
    const { post } = this.props;
    return (
      <div className="post-wrapper">
        <div className="post-inner">
          <div className="post-title">
            <Link to={getPostUrl(post)}>{post.title}</Link>
          </div>
          <div className="post-meta">
            <div className="post-author">By <u>{post.author}</u></div>
            <div className="post-date">{new Date(post.timestamp).toString()}</div>
          </div>
          <div className="post-content">{post.body}</div>
          <div className="post-meta">
            <VoterContainer target={post} type="Post" />

            <div className="post-comments">
              <Link to={`/posts/edit/${post.id}`} className="btn">
                <i className="fa fa-edit" /> Edit
              </Link>
              <button className="btn" onClick={this.onDeleteClick}>
                <i className="fa fa-trash" /> Delete
              </button>
              <Link to={`${getPostUrl(post)}/#comments`} className="btn">
                <i className="fa fa-commenting-o" />
                {post.commentCount} Comments 
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
