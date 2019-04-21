import React, { Component } from 'react';
import { connect } from 'react-redux';

export class LoginModal extends Component {
    render() {
        return (
            <div>

            </div>
        )
    }
}

const mapStateToProps = ({ auth }) => ({ auth });
export default connect(mapStateToProps)(LoginModal);