import { fromJS } from 'immutable';
import {
  generateInitialFrames,
  generateInitialScore,
  updateFrames,
  changePlayer,
  updateAllScores
} from '../utils';

const initialState = fromJS({
  'hasStarted': false,
  'hasCompleted': false,
  'totalScore': [],
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
      let knockedPins = Math.floor(Math.random() * (state.get('currentPins') + 1));
      const remainingPins = state.get('currentPins') - knockedPins;
      const currentFrameIndex = state.get('currentFrameIndex');
      const currentPlayerIndex = state.get('currentPlayerIndex');
      const newFrames = updateFrames(state, knockedPins);
      const newScores = updateAllScores(state, newFrames);

      let newState = state.merge({
        'frames': newFrames,
        'currentPins': remainingPins,
        'score': newScores,
        'totalScore': newScores.reduce((a, b) => {
          return a.map((value, index) => {
            let currentValue = value ? parseInt(value, 10) : 0;
            let nextValue = b.get(index) ? parseInt(b.get(index), 10) : 0;
            return currentValue + nextValue;
          });
        })
      });

      if (currentFrameIndex === 9) {
        if (currentRoll === 0) {
          if (knockedPins === 10) {
            newState = newState.merge({
              'currentPins': 10
            });
          }
          newState = newState.set('currentRoll', ++currentRoll);
        } else if (currentRoll === 1) {
          if (newFrames.getIn([currentFrameIndex, currentPlayerIndex, 'frameStatus']) === 'LAST_FRAME_STRIKE') {
            if (knockedPins === 10) {
              newState = newState.merge({
                'currentPins': 10
              });   
            }
            newState = newState.set('currentRoll', ++currentRoll);
          } else {
            if (remainingPins === 0) {
              newState = newState.merge({
                'currentPins': 10,
                'currentRoll': ++currentRoll
              });
            } else {
              newState = changePlayer(newState);
            }
          }
        } else {
          newState = changePlayer(newState);
        }
      } else {
        if (knockedPins === 10 || currentRoll === 1) {
          newState = changePlayer(newState);
        } else {
          newState = newState.set('currentRoll', ++currentRoll);
        }
      }

      return newState;

    case 'RESET':
      return initialState;
    default:
      return state;
  }
}