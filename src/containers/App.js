import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Players from '../components/Players';
import GameBoard from '../components/GameBoard';

export const App = React.createClass({
  render() {
    const Game = this.props.Game;
    if (Game.get('hasStarted')) {
      return <GameBoard Game={Game} />;
    } else {
      return <Players Game={Game} />
    }
  }
});

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(App);