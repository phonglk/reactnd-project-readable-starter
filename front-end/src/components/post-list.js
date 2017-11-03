import React from 'react';
import { Link } from 'react-router-dom'
export default (props) => (
  <div className="post-list">
    {props.categories.map(post => (
      <div className="post-title">{post.title}</div>
      <div className="post-meta">
        <div className="post-date">{new Date(post.timestamp).toString()}</div>
        <div className="post-author">{new Date(post.timestamp).toString()}</div>
      </div>
      <div className="post-content">{post.content}</div>
    ))}
  </div>
)
