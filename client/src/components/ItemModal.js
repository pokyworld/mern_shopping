import React, { Component } from 'react';
import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter,
    Form, FormGroup, Label, Input
} from 'reactstrap';
import { connect } from 'react-redux';

import * as actions from '../actions/itemActions';
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
        return (
            <div>
                <Button color="dark" className="m-3" onClick={this.toggle}>{this.props.buttonLabel}</Button>
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
                                // autoFocus={true}
                                />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        <Button color="success" onClick={this.onSubmit}>Add Item</Button>{' '}
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = ({ item }) => ({ item, selectItems: selectItems(item.items) })
export default connect(mapStateToProps)(ItemModal);