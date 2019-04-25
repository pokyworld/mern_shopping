import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter,
    Form, FormGroup, Label, Input, NavLink, Alert
} from 'reactstrap';

import * as actions from '../../actions';

export class RegisterModal extends Component {
    state = {
        modal: false,
        name: "",
        email: "",
        password: "",
        repeat: "",
        showPassword: false,
        matchPassword: false
    };

    toggle = () => {
        this.props.dispatch(actions.clearErrors());
        this.setState({ modal: !this.state.modal });
    };

    togglePassword = () => this.setState({ showPassword: !this.state.showPassword });

    onChange = (e) => {
        const { password, repeat } = this.state;
        if (e.target.name === "password") {
            this.setState({ [e.target.name]: e.target.value, matchPassword: e.target.value === repeat });
        } else if (e.target.name === "repeat") {
            this.setState({ [e.target.name]: e.target.value, matchPassword: password === e.target.value });
        } else {
            this.setState({ [e.target.name]: e.target.value });
        };
    };

    onSubmit = (e) => {
        e.preventDefault();
        const { name, email, password, repeat, matchPassword } = this.state;
        // Simple validation
        if (!name || !email || !password || !repeat) {
            // Send error to form
            this.props.dispatch(actions.getErrors("Please enter a value for all fields", "400", "REGISTER_FAIL"))
        } else if (!matchPassword) {
            // Send error to form
            this.props.dispatch(actions.getErrors("Passwords do not match", "400", "REGISTER_FAIL"))
        }
        // Check passwords match
        if (name && email && password && matchPassword) {
            // create new user
            const newUser = { name, email, password };

            // attempt to send
            this.props.dispatch(actions.registerUser(newUser));
        }
    };

    componentDidUpdate = () => {
        if (this.state.modal && this.props.auth.isAuthenticated) {
            this.toggle();
        }
    }

    render() {
        const { message, _id } = this.props.error;
        return (
            <div>
                <NavLink href="#" onClick={this.toggle}>Register</NavLink>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>{this.props.modalTitle}</ModalHeader>
                    <ModalBody>
                        {message && _id === "REGISTER_FAIL" &&
                            < Alert color="danger">
                                {message}
                            </Alert>
                        }
                        <Form onSubmit={this.onSubmit}>

                            <FormGroup>
                                <Label for="name">Name:</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Enter full name"
                                    onChange={this.onChange}
                                    autoComplete="name"
                                // autoFocus={true}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label for="email">Email: </Label>
                                <Input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Enter email address"
                                    onChange={this.onChange}
                                    autoComplete="email"
                                // autoFocus={true}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label for="password">Password</Label>
                                <Input
                                    type={this.state.showPassword ? "text" : "password"}
                                    name="password"
                                    id="password"
                                    placeholder="Enter password"
                                    onChange={this.onChange}
                                    autoComplete="password"
                                // autoFocus={true}
                                />
                                {this.state.showPassword ? (
                                    <i className="fas fa-eye-slash" style={styles.faEye} onClick={this.togglePassword}></i>
                                ) : (
                                        <i className="fas fa-eye" style={styles.faEye} onClick={this.togglePassword}></i>
                                    )}
                            </FormGroup>

                            <FormGroup>
                                <Label for="repeat">Repeat Password</Label>
                                <Input
                                    type={this.state.showPassword ? "text" : "password"}
                                    name="repeat"
                                    id="repeat"
                                    placeholder="Enter password again"
                                    onChange={this.onChange}
                                    autoComplete="repeat"
                                // autoFocus={true}
                                />
                                {this.state.showPassword ? (
                                    <i className="fas fa-eye-slash" style={styles.faEye} onClick={this.togglePassword}></i>
                                ) : (
                                        <i className="fas fa-eye" style={styles.faEye} onClick={this.togglePassword}></i>
                                    )}
                            </FormGroup>

                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" onClick={this.onSubmit} block>Register</Button>{' '}
                    </ModalFooter>
                </Modal>
            </div >
        )
    }
};

const styles = {
    faEye: {
        float: "right",
        marginTop: "-1.7rem",
        marginRight: "0.7rem"
    }
};

RegisterModal.propTypes = {
    auth: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired
};

const mapStateToProps = ({ auth, error }) => ({ auth, error });

export default connect(mapStateToProps)(RegisterModal);