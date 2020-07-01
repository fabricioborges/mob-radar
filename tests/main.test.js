import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Main from '../src/pages/Main';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() })

describe('teste component main', () => {

    test(`componente existente`, () => {
        const component = shallow(<Main />);

        expect(component.exists()).toBe(true);
    });

    test('renderizando de forma correta', () => {
        const tree = renderer.create(<Main />).toJSON();
        expect(tree).toMatchSnapshot();
    });
})
