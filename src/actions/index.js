export default {
  saveTotalPlayers(value) {
    return (dispatch) => dispatch({
      'type': 'SAVE_TOTAL_PLAYERS',
      value
    });
  },

  savePlayersInfo(value) {
    return (dispatch) => dispatch({
      'type': 'SAVE_PLAYERS_INFO',
      value
    });
  },  

  rollBall() {
    return (dispatch) => dispatch({
      'type': 'ROLL'
    });
  },

  reset() {
    return (dispatch) => dispatch({
      'type': 'RESET'
    });
  },
};