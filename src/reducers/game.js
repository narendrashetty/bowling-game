import { fromJS } from 'immutable';
import { generateInitialFrames, generateInitialScore, updateFrames, changePlayer, updateAllScores } from '../utils';

const initialState = fromJS({
  'hasStarted': false,
  'totalPlayers': 0,
  'players': [],
  'frames': [],
  'score': [],
  'currentPlayerIndex': 0,
  'currentFrameIndex': 0,
  'currentRoll': 0,
  'currentPins': 10
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
        'players': action.value,
        'frames': generateInitialFrames(action.value),
        'score': generateInitialScore(action.value)
      });

    case 'ROLL':
      let currentRoll = state.get('currentRoll');
      const knockedPins = Math.floor(Math.random() * (state.get('currentPins') + 1));
      const remainingPins = state.get('currentPins') - knockedPins;
      const newFrames = updateFrames(state, knockedPins);
      const newScores = updateAllScores(state, newFrames);

      let newState = state.merge({
        'frames': newFrames,
        'currentPins': remainingPins,
        'score': newScores
      });

      if (knockedPins === 10 || currentRoll === 1) {
        newState = changePlayer(newState);
      } else {
        newState = newState.set('currentRoll', ++currentRoll);
      }

      return newState;
    default:
      return state;
  }
}