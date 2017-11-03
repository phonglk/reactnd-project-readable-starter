import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import Voter from './voter';

export default class PostList extends PureComponent {
  render() {
    return (
      <div className="post-list">
        {this.props.posts.map(post => (
          <div className="post-wrapper">
            <div className="post-inner">
              <div className="post-title">
                <Link to={`/post/${post.id}`}>{post.title}</Link>
              </div>
              <div className="post-meta">
                <div className="post-author">By <u>{post.author}</u></div>
                <div className="post-date">{new Date(post.timestamp).toString()}</div>
              </div>
              <div className="post-content">{post.body}</div>
              <div className="post-meta">
                <Voter postId={post.id} />
                <div className="post-comments">
                  <Link to={`/post/${post.id}/#comments`} className="btn">
                    <i className="fa fa-commenting-o" />
                    {post.commentCount} Comments 
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }
}
