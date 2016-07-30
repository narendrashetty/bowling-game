import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Players from '../components/Players';

export const App = React.createClass({
  render() {
    const Game = this.props.Game;
    if (!Game.get('hasStarted')) {
      return <Players Game={Game} />
    }
  }
});

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(App);