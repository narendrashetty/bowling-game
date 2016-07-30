export default {
  saveTotalPlayers(value) {
    return (dispatch) => dispatch({
      'type': 'SAVE_TOTAL_PLAYERS',
      value
    });
  }
};