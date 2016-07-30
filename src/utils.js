import { fromJS } from 'immutable';

const TOTAL_FRAMES = 10;

export const generateInitialFrames = (players) => {
  let frames = fromJS([]);
  let totalFrames = TOTAL_FRAMES;
  while(totalFrames) {
    frames = frames.push(players.map(player => fromJS([])));
    totalFrames--;
  }
  return frames;
};

export const updateFrames = (state, knockedPins) => {
  const currentFrameIndex = state.get('currentFrameIndex');
  const currentPlayerIndex = state.get('currentPlayerIndex');
  const frames = state.get('frames');

  return frames.updateIn([currentFrameIndex, currentPlayerIndex], (rolls) => {
    return rolls.push(knockedPins);
  });
};

export const changePlayer = (state) => {
  let currentPlayerIndex = state.get('currentPlayerIndex');
  let currentFrameIndex = state.get('currentFrameIndex');

  currentPlayerIndex++;

  if(currentPlayerIndex === state.get('players').count()) {
    currentPlayerIndex = 0;
    currentFrameIndex++;
  }

  return state.merge({
    'currentRoll': 0,
    'currentPins': 10,
    currentPlayerIndex,
    currentFrameIndex
  });
};