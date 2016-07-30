import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../actions';

const PLAYERS_ALLOWED = [0,2,3,4,5,6];

export const Players = React.createClass({

  componentWillMount() {
    this.setup(this.props);
  },

  componentWillReceiveProps(nextProps) {
    this.setup(nextProps);
  },

  setup(props) {
    const totalPlayers = props.Game.get('totalPlayers');
    const players = props.Game.get('players');

    this.setState({
      totalPlayers,
      players
    });
  },

  onPlayerCountSelection(e) {
    this.props.actions.saveTotalPlayers(e.target.value);
  },

  renderSelection() {
    return (
      <div>
        Select the number of players:
        <select value={0} onChange={this.onPlayerCountSelection}>
          {PLAYERS_ALLOWED.map((value) => {
            return (
              <option value={value} key={value}>{value}</option>
            );
          })}
        </select>
      </div>
    );
  },

  onUpdatePlayerName(e) {
    const index = parseInt(e.target.name, 10);
    const players = this.state.players.set(index, e.target.value);

    this.setState({
      players
    });
  },

  startGame() {
    const totalPlayers = this.state.totalPlayers;
    const players = this.state.players.filter(player => player !== '');
    if (players.count() !== totalPlayers) {
      return alert('fill all players name');
    }
    return this.props.actions.savePlayersInfo(players);
  },

  renderPlayersList() {
    return (
      <div>
        {this.state.players.map((player, index) => {
          return (
            <div key={index}>
              Add Player {index+1}
              <input type="text" value={player} onChange={this.onUpdatePlayerName} name={index} />
            </div>
          );
        })}
        <button onClick={this.startGame}>Start Game</button>
      </div>
    );
  },

  render() {
    if (this.state.totalPlayers === 0) {
      return this.renderSelection();
    } else {
      return this.renderPlayersList();
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(Players);