import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { shallow, mount } from 'enzyme';
import Main from '../src/pages/Main';
import { View, StyleSheet, Platform, TextInput } from 'react-native';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() })

describe('inicio dos testes', () => {

    test(`componente existente`, () => {
        const component = shallow(<Main />);

        expect(component.exists()).toBe(true);
    });

    test('renderizando de forma correta', () => {
        const tree = renderer.create(<Main />).toJSON();
        expect(tree).toMatchSnapshot();
    });   

})