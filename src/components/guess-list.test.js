import React from 'react';
import {shallow, mount} from 'enzyme';
import renderer from 'react-test-renderer';
import {GuessList} from './guess-list';

describe('<GuessList />', () => {
  const guesses = [];
  beforeAll(() => {
    for (let i = 0; i < 10; i++) {
          guesses.push(`Guess ${i}`);
        }
    });
    it('Renders without crashing', () => {
        shallow(<GuessList guesses={guesses} />);
    });

    it('Should match its snapshot', () => {
    const tree = renderer.create(<GuessList guesses={guesses}/>).toJSON();
    expect(tree).toMatchSnapshot();
    });

    it('Renders a list of guesses', () => {
        const guesses = [3, 42, 77];
        const wrapper = shallow(<GuessList guesses={guesses} />);
        const items = wrapper.find('li');
        expect(items.length).toEqual(guesses.length);
        guesses.forEach((guess, index) => {
            expect(items.at(index).text()).toEqual(guess.toString());
        });
    });
});