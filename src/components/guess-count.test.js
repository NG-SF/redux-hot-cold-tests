import React from 'react';
import {shallow} from 'enzyme';
import renderer from 'react-test-renderer';
import {GuessCount} from './guess-count';

describe('<GuessCount />', () => {
    it('Renders without crashing', () => {
        shallow(<GuessCount />);
    });

    it('Should match its snapshot', () => {
    const tree = renderer.create(<GuessCount />).toJSON();
    expect(tree).toMatchSnapshot();
    });

    it('Renders correct information', () => {
        let wrapper = shallow(<GuessCount guessCount={5} />);
        expect(wrapper.text()).toEqual("You have made 5 guesses!");
    });
});