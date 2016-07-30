import { fromJS } from 'immutable';

const initialState = fromJS({
  'hasStarted': false,
  'totalPlayers': 0,
  'players': [],
  'frames': []
});

export default function(state = initialState, action) {
  switch(action.type) {
    case 'SAVE_TOTAL_PLAYERS':
      const value = parseInt(action.value, 10);
      return state.merge({
        'totalPlayers': value,
        'players': new Array(value).fill('')
      });

    case 'SAVE_PLAYERS_INFO':
      return state.merge({
        'hasStarted': true,
        'players': action.value
      });

    default:
      return state;
  }
}