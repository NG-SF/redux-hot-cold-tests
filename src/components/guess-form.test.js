import React from 'react';
import {shallow, mount} from 'enzyme';
import {makeGuess} from '../actions';
import {GuessForm} from './guess-form';

describe('<GuessForm />', () => {
    it('Renders without crashing', () => {
        shallow(<GuessForm />);
    });

    it('Should render an input area', () => {
        const wrapper = shallow(<GuessForm /> );
        expect(wrapper.find('input').length).toEqual(1);
    });

    it('Should dispatch MakeGuess when the form is submitted', () => {
        const dispatch = jest.fn();
        const wrapper = mount(<GuessForm dispatch={dispatch} />);
        dispatch.mockClear();
        const value = "42";
        wrapper.find('input[type="number"]').instance().value = value;
        wrapper.simulate('submit');      
        expect(dispatch).toHaveBeenCalledWith(makeGuess(value));
    });

    it('Should reset the input when form is submitted', () => {
        const wrapper = mount(<GuessForm dispatch={()=> {}}/>);
        const input = wrapper.find('input[type="number"]');
        input.instance().value = "42";
        wrapper.simulate('submit');
        expect(input.instance().value).toEqual('');
    });
});
