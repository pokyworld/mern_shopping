import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '../actions/itemActions';
import { selectItems } from '../selectors';

import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ItemModal from './ItemModal';

export class ShoppingList extends Component {

    componentWillMount = () => {
        // this.props.dispatch(actions.addSampleData());
        this.props.dispatch(actions.getItems());
    }

    componentDidUpdate = () => {
        // console.log(this.props);
    }

    onAddClick = () => {
        const name = prompt("Enter Item");
        if (name) {
            this.props.dispatch(actions.addItem({ name }));
        }
    }

    onDeleteClick = (id) => {
        this.props.dispatch(actions.deleteItem(id));
    }

    render() {
        // const { items } = this.props.item;
        const { selectItems } = this.props;

        return (
            <Fragment>
                {this.props.item.loading &&
                    <div className="loading">Loading&#8230;</div>
                }
                <Container>
                    <ItemModal buttonLabel="Add Item" modalTitle="Add to Shopping List" />
                    <ListGroup>
                        <TransitionGroup className="shopping-list">
                            {
                                selectItems.map(({ _id, name }) => (
                                    <CSSTransition
                                        key={_id}
                                        timeout={500}
                                        classNames="fade"
                                    >
                                        <ListGroupItem
                                        >
                                            <Button
                                                color="danger"
                                                className="remove-btn"
                                                size="sm"
                                                onClick={() => this.onDeleteClick(_id)}
                                            >&times;</Button>
                                            {name}
                                        </ListGroupItem>
                                    </CSSTransition>
                                ))
                            }
                        </TransitionGroup>
                    </ListGroup>
                </Container>
            </Fragment>
        )
    }
}
ShoppingList.props = {
    item: PropTypes.object.isRequired,
    selectItems: PropTypes.object.isRequired
};

const mapStateToProps = ({ item }) => ({
    item, selectItems: selectItems(item.items)
});

export default connect(mapStateToProps)(ShoppingList);