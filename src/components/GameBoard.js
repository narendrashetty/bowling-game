import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../actions';
import Frames from './Frames';

export const GameBoard = React.createClass({

  rollBall() {
    this.props.actions.rollBall();
  },

  render() {
    return (
      <div>
        <Frames
          frames={this.props.Game.get('frames')}
          players={this.props.Game.get('players')}
          score={this.props.Game.get('score')}
        />
        <button onClick={this.rollBall}>Roll the Ball</button>
      </div>
    );
  }
});

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    'actions': bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GameBoard);