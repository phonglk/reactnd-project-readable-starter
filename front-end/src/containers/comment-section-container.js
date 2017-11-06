import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CommentList from '../components/comment-list';
import LoadWrapper from '../components/load-wrapper';
import { requestComments } from '../data/comment/action';

class CommentSectionContainer extends PureComponent {
  static propTypes = {
    comments: PropTypes.arrayOf(PropTypes.object),
    postId: PropTypes.string
  }
  render() {
    const { comments, isLoading } = this.props;
    return <LoadWrapper loading={isLoading}>
      <CommentList comments={comments} />
    </LoadWrapper>
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
  };
}
export default connect(mapStateToProps)(CommentSectionContainer);