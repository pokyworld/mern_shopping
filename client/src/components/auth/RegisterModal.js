import React, { Component } from 'react';
import { connect } from 'react-redux';

export class RegisterModal extends Component {
    render() {
        return (
            <div>

            </div>
        )
    }
}

const mapStateToProps = ({ auth }) => ({ auth });
export default connect(mapStateToProps)(RegisterModal);