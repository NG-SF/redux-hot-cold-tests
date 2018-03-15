import reducer from './reducer';
import {RESTART_GAME, restartGame, MAKE_GUESS, makeGuess, GENERATE_AURAL_UPDATE, generateAuralUpdate} from './actions';

describe('Reducer', () => {
  
  const testStateObj = {
    guesses: [3,42,52],
    feedback: 'Make your guess!',
    auralStatus: '',
    correctAnswer: 99
    };  

  it('Should set the initial state when nothing is passed in', () => {
    const testState = reducer(undefined, {type: '__UNKNOWN'});
    expect(testState).toEqual({
          guesses: [],
          feedback: 'Make your guess!',
          auralStatus: '',
          correctAnswer: testState.correctAnswer
        });
    });

  it('Should re-set the initial state, when restartGame is selected', () => {
    const gameState = {
    guesses: [22,44,77],
    feedback: 'Good day',
    auralStatus: '',
    correctAnswer: 42
    };  
    const state = reducer(gameState, restartGame(11));
      expect(state.feedback).toEqual('Make your guess!');
      expect(state.guesses).toEqual([]);
      expect(state.auralStatus).toEqual('');
      expect(state.correctAnswer).toEqual(11);
  });

  it('Should generate aural information about the game status', () => {
    const state = reducer(testStateObj, generateAuralUpdate());
    const expectedUpdate = `Here's the status of the game right now: Make your guess! You've made 3 guesses. In order of most- to least-recent, they are: 52, 42, 3`;
    expect(state.auralStatus).toEqual(expectedUpdate);
  });

  it('Should provide feedback when user enters his guess', () => {
    let state = {
        guesses: [],
        feedback: 'Make your guess!',
        auralStatus: '',
        correctAnswer: 99
      };
    state = reducer(state, makeGuess(50));
    expect(state.feedback).toEqual(`You're Cold...`);
    expect(state.guesses).toHaveLength(1);
    expect(state.guesses).toEqual([50]);

    state = reducer(state, makeGuess(80));
    expect(state.feedback).toEqual(`You're Warm.`);
    expect(state.guesses).toHaveLength(2);
    expect(state.guesses).toEqual([50, 80]);

    state = reducer(state, makeGuess(95));
    expect(state.feedback).toEqual(`You're Hot!`);
    expect(state.guesses).toHaveLength(3);
    expect(state.guesses).toEqual([50, 80, 95]);

    state = reducer(state, makeGuess(99));
    expect(state.feedback).toEqual(`You got it!`);
    expect(state.guesses).toHaveLength(4);
    expect(state.guesses).toEqual([50, 80, 95, 99]);
  });

  it('Should prevent user from entering invalid input', () => {
    const state = reducer(testStateObj, {type: MAKE_GUESS, guess: 'hi'});
    const expectedFeedback = `Please enter a valid number.`;
    expect(state.feedback).toEqual(expectedFeedback);
    expect(state.guesses).toHaveLength(3);
  });

});
