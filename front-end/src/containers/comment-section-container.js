import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CommentList from '../components/comment-list';
import CommentPoster from '../components/comment-poster';
import LoadWrapper from '../components/load-wrapper';
import { requestComments, postComment, updateComment, deleteComment } from '../data/comment/action';

class CommentSectionContainer extends PureComponent {
  static propTypes = {
    comments: PropTypes.arrayOf(PropTypes.object),
    postId: PropTypes.string
  }
  postComment = (author, comment) => {
    this.props.dispatch(postComment(this.props.postId, comment, author));
  }
  deleteComment = (comment) => {
    this.props.dispatch(deleteComment(comment));
  }
  updateComment = (comment) => {
    this.props.dispatch(updateComment(comment));
  }
  render() {
    const { comments, isLoading, isPosting } = this.props;
    return (
      <div>
        <LoadWrapper loading={isLoading}>
          <CommentList comments={comments} updateComment={this.updateComment} deleteComment={this.deleteComment} />
        </LoadWrapper>
        <LoadWrapper loading={isPosting}>
          <CommentPoster postComment={this.postComment} />
        </LoadWrapper>
      </div>
    );
  }

  componentDidMount() {
    this.props.dispatch(requestComments(this.props.postId));
  }

  componentWillUpdate(nextProps) {
    if (nextProps.postId !== this.props.postId) {
      this.props.dispatch(requestComments(nextProps.postId));
    }
  }

}

const mapStateToProps = (state, ownState) => {
  const { comment } = state.data;
  return {
    comments: comment.list.map(id => comment.ref[id]),
    category: ownState.category,
    isLoading: comment.isLoading,
    isPosting: comment.isPosting,
  };
}
export default connect(mapStateToProps)(CommentSectionContainer);