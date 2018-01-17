import React, { Component } from 'React';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import actions from '../actions';
import Card from '../components/Card';
import { Grid, Row, Col, Table } from 'react-bootstrap';
import ethConnect from '../helpers/eth';
import OTC from '../helpers/otc';

class UserInfo extends Component {

    updateAccount() {
        const self = this;
        this.ethClient
          .getAccounts()
          .then(accounts => {
              if (!accounts || accounts.length === 0) {
                  self.props.setAddress('Unable to get address from Metamask!');
              } else
                  self.props.setAddress(accounts[0]);
          })
          .catch(err => {
              console.log('err', err);
          });
    }

    componentDidMount() {
        this.props.setAddress('Loading address from Metamask...');
        const self = this;
        this.ethClient = new ethConnect();
        this.interval = setInterval(() => {
            self.updateAccount();
        }, 4000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    getClass() {
      if (this.props.address.indexOf('Loading') === 0)
        return 'label label-warning big';

      if (this.props.address.indexOf('Unable') === 0)
        return 'label label-danger big';

      return 'label label-primary big';
    }

  render() {


    return (
      <span className={this.getClass()}>{this.props.address}</span>
    );
  }
}

function mapStateToProps(state) {
  return {
    address: state.user.address
  };
}

function mapDispatchToProps(dispath) {
  return bindActionCreators( { setAddress: actions.setAddress }, dispath);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
