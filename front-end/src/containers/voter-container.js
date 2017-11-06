import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { votePost } from '../data/post/action';
import { voteComment } from '../data/comment/action';
import Vote from '../components/voter';

const action = {
  votePost,
  voteComment,
};

class Voter extends PureComponent {
  static propTypes = {
    type: PropTypes.string.isRequired, // Comment/Post
    target: PropTypes.object,
  }

  vote = (option) => {
    this.props.dispatch(action[`vote${this.props.type}`](this.props.target, option));
    return false;
  }

  render() {
    const { target } = this.props;
    return <Vote score={target.voteScore} vote={this.vote} />
  }
}

const mapStateToProps = (state, ownProps) => {
  const { target } = ownProps;
  return {
    target,
  }
}

export default connect(mapStateToProps)(Voter);
