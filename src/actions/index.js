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
};