import { fromJS } from 'immutable';

const initialState = fromJS({
  'totalPlayers': -1,
  'players': [],
  'frames': []
});

export default function(state = initialState, action) {
  return state;
}