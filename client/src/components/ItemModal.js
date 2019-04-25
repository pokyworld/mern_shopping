import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter,
    Form, FormGroup, Label, Input
} from 'reactstrap';

import * as actions from '../actions';
import { selectItems } from '../selectors';

export class ItemModal extends Component {
    state = { modal: false, name: "" };
    toggle = () => this.setState({ modal: !this.state.modal });

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    onSubmit = (e) => {
        e.preventDefault();
        const name = this.state.name;
        this.props.dispatch(actions.addItem({ name }));
        this.toggle();
    };

    render() {
        const { isAuthenticated } = this.props;
        return (
            <div>
                {isAuthenticated ? (
                    <Fragment>
                        <Button color="dark" className="mt-3 mb-3" onClick={this.toggle}>{this.props.buttonLabel}</Button>
                        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                            <ModalHeader toggle={this.toggle}>{this.props.modalTitle}</ModalHeader>
                            <ModalBody>
                                <Form onSubmit={this.onSubmit}>
                                    <FormGroup>
                                        <Label for="item">Item</Label>
                                        <Input
                                            type="text"
                                            name="name"
                                            id="item"
                                            placeholder="Name of Item"
                                            onChange={this.onChange}
                                            autoComplete="item"
                                        />
                                    </FormGroup>
                                </Form>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="success" onClick={this.onSubmit} block>Add Item</Button>{' '}
                            </ModalFooter>
                        </Modal>
                    </Fragment>
                ) : (
                        <h5 className="mt-3 mb-3">Login to Edit list</h5>
                    )}
            </div>
        )
    }
}

const mapStateToProps = ({ auth, item }) => ({
    isAuthenticated: auth.isAuthenticated,
    item,
    selectItems: selectItems(item.items)
})
export default connect(mapStateToProps)(ItemModal);