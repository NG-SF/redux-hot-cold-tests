import React from 'react';
import {shallow} from 'enzyme';
import renderer from 'react-test-renderer';
import {AuralStatus} from './aural-status';

describe('<AuralStatus />', () => {
  it('Renders without crashing', () => {
    shallow(<AuralStatus />);
  });

  it('Should match its snapshot', () => {
    const tree = renderer.create(<AuralStatus />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Renders status update', () => {
    let update = 'Status update';
    let wrapper = shallow(<AuralStatus auralStatus={update} />);
    expect(wrapper.contains(update)).toEqual(true);
  });
});