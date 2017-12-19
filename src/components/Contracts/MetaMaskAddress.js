import {
  OverlayTrigger,
  Modal,
  Button,
  Popover,
  Tooltip,
  FormControl,
} from 'react-bootstrap';
import React from 'react';
import ReactDOM from 'react-dom';
import Address from '../Address';
import ethConnect from '../../helpers/eth';
import OTC from '../../helpers/otc';

class MetaMaskAddress extends React.Component {
  constructor(props) {
    super(props);
    this.interval = null;
    this.state = {
      address: '',
    };

    this.ethClient = undefined;
  }

  updateAccount() {
    const self = this;
    console.log('update Metamask');
    this.ethClient.getAccounts().then(accounts => {

      if (!accounts || accounts.length === 0) {
        self.setState({address: "", errorCount: (self.state.errorCount+1)});
        return;
      }

      if (accounts[0] !== self.state.address) {
        self.setState({
          address: accounts[0]
        });
        self.props.onAddress(accounts[0]);
      }
    }).catch(err => {
      console.log('err', err)
    });
  }

  componentDidMount() {
    const self = this;
    this.ethClient = new ethConnect();
    this.interval = setInterval(() => {
      self.updateAccount();
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    function AddressStatus(props) {
      if (props.address != '')
         return null;

      if (props.errorCount >=1) {
          return (<span className="label label-danger">Having trouble loading address... Make sure your are logged in Metamask!</span>);
      }

      return (<span className="label label-info">Loading input address from Metamask..</span>);
    }

    return (
      <span>{this.state.address}<AddressStatus errorCount={this.state.errorCount} address={this.state.address}/></span>
    );
  }
}

export default MetaMaskAddress;
