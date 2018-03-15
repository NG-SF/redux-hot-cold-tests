import React from 'react';
import {shallow, mount} from 'enzyme';
import {TopNav} from './top-nav';
import {generateAuralUpdate, GENERATE_AURAL_UPDATE,restartGame, RESTART_GAME} from '../actions';

describe('<TopNav />', () => {
    it('Renders without crashing', () => {
        shallow(<TopNav />);
    });

    it('Should dispatch onRestartGame callback when the link is clicked', () => {
        const dispatch = jest.fn();
        const wrapper = shallow(<TopNav dispatch={dispatch} />);
        wrapper.find('.new').simulate('click');
        expect(dispatch).toHaveBeenCalled();
        const action = dispatch.mock.calls[0][0];
        expect(action.type).toEqual(RESTART_GAME);
        expect(action.correctAnswer).toBeGreaterThanOrEqual(0);
        expect(action.correctAnswer).toBeLessThanOrEqual(100);
    });

    it('Should fire onGenerateAuralUpdate callback when the link is clicked', () => {
        const dispatch = jest.fn();
        const wrapper = shallow(<TopNav dispatch={dispatch} />);
        wrapper.find('.visuallyhidden').simulate('click');
        expect(dispatch).toHaveBeenCalledWith(generateAuralUpdate());
        expect(dispatch.mock.calls[0][0].type).toEqual(GENERATE_AURAL_UPDATE);
    });
});