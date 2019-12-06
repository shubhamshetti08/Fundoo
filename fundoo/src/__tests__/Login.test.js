import React from 'react';
import {
    mount
} from 'enzyme';
import Login from '../components/loginComponent.jsx';
import {withRouter} from 'react-router-dom'
import '../setupTest'
const login=withRouter(Login)
/**
* describe what we are testing
**/
describe('Login Component', () => {
    /**
    * make our assertion and what we expect to happen 
    **/
    it('should render without throwing an error', () => {
        expect(mount(< login />).exists()).toBe(true)
    })
    /**
    * within the Login components describe function
    **/
    it('renders a email input', () => {
        expect(mount(< login />).find('#email').length).toEqual(1)
    })
    it('renders a password input', () => {
        expect(mount(< login />).find('#password').length).toEqual(1)
    })
    /**
    * within the Login components describe function
    **/
    describe('Email input', () => {
        it('should respond to change event and change the state of the Login Component', () => {
            const wrapper = mount(< login />);
            wrapper.find('#email')
                .simulate('change', {
                    target: {
                        name: 'email',
                        value: 'onetwo@gmail.com'
                    }
                });
            expect(wrapper.state('email')).toEqual('onetwo@gmail.com');
        })
    })
    describe('Password input', () => {
        it('should respond to change event and change the state of the Login Component', () => {
            const wrapper = mount(< login />);
            wrapper.find('#password')
                .simulate('change', {
                    target: {
                        name: 'password',
                        value: '1478523690'
                    }
                });
            expect(wrapper.state('password')).toEqual('1478523690');
        })
    })
})