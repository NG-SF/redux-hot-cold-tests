import React from 'react';
import {shallow} from 'enzyme';
import renderer from 'react-test-renderer';
import {Feedback} from './feedback';

describe('<Feedback />', () => {
    it('Renders without crashing', () => {
        shallow(<Feedback />);
    });

    it('Should match its snapshot', () => {
    const tree = renderer.create(<Feedback />).toJSON();
    expect(tree).toMatchSnapshot();
    });

    it('Renders the text', () => {
        const guessCount = 0;       
        const wrapper = shallow(<Feedback feedback='Guess again' guessCount={guessCount} />);
        expect(wrapper.text()).toEqual('Guess again ');
        expect(wrapper.contains('Guess again')).toEqual(true);
    });
});