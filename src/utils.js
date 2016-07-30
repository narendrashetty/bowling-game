import { fromJS } from 'immutable';

const TOTAL_FRAMES = 10;

export const generateInitialFrames = (players) => {
  let frames = fromJS([]);
  let totalFrames = TOTAL_FRAMES;
  while(totalFrames) {
    frames = frames.push(players.map((player) => {
      return fromJS({
        'frameStatus': 'INACTIVE',
        'rolls': []
      });
    }));

    totalFrames--;
  }
  return frames;
};

export const generateInitialScore = (players) => {
  let frames = fromJS([]);
  let totalFrames = TOTAL_FRAMES;
  while(totalFrames) {
    frames = frames.push(fromJS(new Array(players.count()).fill()));
    totalFrames--;
  }
  return frames;
};

export const updateFrames = (state, knockedPins) => {
  const currentFrameIndex = state.get('currentFrameIndex');
  const currentPlayerIndex = state.get('currentPlayerIndex');
  const currentRoll = state.get('currentRoll');
  let frames = state.get('frames');
  let frameStatus = frames.getIn([currentFrameIndex, 'frameStatus']);

  if (currentRoll === 0) {
    if (knockedPins === 10) {
      frameStatus = 'STRIKE';
    } else {
      frameStatus = 'ACTIVE';
    }
  } else if (currentRoll === 1) {
    if (knockedPins + frames.getIn([currentFrameIndex, currentPlayerIndex, 'rolls', 0]) === 10) {
      frameStatus = 'SPARE';
    } else {
      frameStatus = 'COMPLETED';
    }
  }

  frames = frames.mergeIn([currentFrameIndex, currentPlayerIndex], fromJS({
    frameStatus
  }));

  return frames.updateIn([currentFrameIndex, currentPlayerIndex], (frame) => {
    return frame.merge({
      'rolls': frame.get('rolls').push(knockedPins)
    });
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

export const updateScoreSingle = (currentFrameIndex, currentPlayerIndex, newFrames) => {
  const currentFrame = newFrames.getIn([currentFrameIndex, currentPlayerIndex]);
  const frameStatus = currentFrame.get('frameStatus');
  const rolls = currentFrame.get('rolls');
  let score;

  const oneAheadFrame = newFrames.getIn([currentFrameIndex + 1, currentPlayerIndex]);
  const twoAheadFrame = newFrames.getIn([currentFrameIndex + 2, currentPlayerIndex]);

  if (frameStatus === 'COMPLETED') {
    score = rolls.get(0) + rolls.get(1)
  } else if (frameStatus === 'SPARE' && oneAheadFrame) {
    if (oneAheadFrame.getIn(['rolls', 0])) {
      score = oneAheadFrame.getIn(['rolls', 0]) + 10;
    }
  } else if (frameStatus === 'STRIKE' && oneAheadFrame && twoAheadFrame) {
    if (oneAheadFrame.get('frameStatus') === 'STRIKE') {
      if (oneAheadFrame.getIn(['rolls', 0]) && twoAheadFrame.getIn(['rolls', 0])) {
        score = oneAheadFrame.getIn(['rolls', 0]) + twoAheadFrame.getIn(['rolls', 0]) + 10;
      }
    } else if (oneAheadFrame.getIn(['rolls', 1])) {
      score = oneAheadFrame.getIn(['rolls', 0]) + oneAheadFrame.getIn(['rolls', 1]) + 10;
    }
  }

  return score;
};


export const updateAllScores = (state, newFrames) => {
  const currentFrameIndex = state.get('currentFrameIndex');
  const currentPlayerIndex = state.get('currentPlayerIndex');
  let newScore = state.get('score');

  for (let i = currentFrameIndex; i >= 0; i--) {
    let newScoreSingle = updateScoreSingle(i, currentPlayerIndex, newFrames);
    newScore = newScore.setIn([i, currentPlayerIndex], newScoreSingle);
  }
  return newScore;
};




