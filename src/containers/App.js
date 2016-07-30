import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../actions';
import Players from '../components/Players';
import GameBoard from '../components/GameBoard';

export const App = React.createClass({
  render() {
    const Game = this.props.Game;
    if (Game.get('hasStarted')) {
      return <GameBoard Game={Game} actions={this.props.actions} />;
    } else {
      return <Players Game={Game} actions={this.props.actions} />
    }
  }
});

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    'actions': bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);