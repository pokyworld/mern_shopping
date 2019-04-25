import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter,
    Form, FormGroup, Label, Input, NavLink, Alert
} from 'reactstrap';

import * as actions from '../../actions';

export class LoginModal extends Component {
    state = {
        modal: false,
        email: "",
        password: ""
    };
    toggle = () => {
        this.props.dispatch(actions.clearErrors());
        this.setState({ modal: !this.state.modal });
    };

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = (e) => {
        e.preventDefault();
        const { email, password } = this.state;
        // Simple validation
        if (!email || !password) {
            // Send error to form
            this.props.dispatch(actions.getErrors("Please enter a value for all fields", "400", "REGISTER_FAIL"))
        }
        // Attempt to send user
        if (email && password) {
            // create user
            const user = { email, password };
            this.props.dispatch(actions.login(user));
        };
    };

    render() {
        const { message, _id } = this.props.error;
        return (
            <div>
                <NavLink href="#" onClick={this.toggle}>Login</NavLink>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>{this.props.modalTitle}</ModalHeader>
                    <ModalBody>
                        {message && _id === "LOGIN_FAIL" &&
                            < Alert color="danger">
                                {message}
                            </Alert>
                        }
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="email">Username</Label>
                                <Input
                                    type="text"
                                    name="email"
                                    id="email"
                                    placeholder="Enter username (email)"
                                    onChange={this.onChange}
                                    autoComplete="email"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="password">Password</Label>
                                <Input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Enter password"
                                    onChange={this.onChange}
                                    autoComplete="password"
                                />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" onClick={this.onSubmit} block>Login</Button>{' '}
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

LoginModal.propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired
};

const mapStateToProps = ({ auth, error }) => ({
    isAuthenticated: auth.isauthenticted,
    error: error
});

export default connect(mapStateToProps)(LoginModal);