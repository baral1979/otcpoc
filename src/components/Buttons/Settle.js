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
import ModalButton from '../ModalButton';
import InputEther from './InputEther';

class Settle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fee: 0,
      settler: '0x0',
      buyer: '0x0',
    };
  }

  setPrice(value) {
    this.setState({ fee: value });
  }

  ok() {
    if (this.props.success) {
      this.props.success({
        buyer: this.props.address,
        settler: this.props.contract.set,
        fee: this.state.fee,
      });
    }
  }

  render() {
    if (!this.props.contract) return null;

    return (
      <ModalButton
        visible={this.props.contract.contractState == 4}
        disabled={this.props.disabled}
        success={this.ok.bind(this)}
        buttonText="Settle"
        title="Settle Offer"
        content={
          <div>
            <h5>Settler Address</h5>
            <Address address={this.props.contract.set} />
            <h5>Buyer Address</h5>
            <Address address={this.props.address} showBalance />
            <h5>Enter Fee (in Finney)</h5>
            <InputEther valueChange={this.setPrice.bind(this)} />
          </div>
        }
        bsStyle="primary"
        bsSize="medium"
      />
    );
  }
}

export default Settle;
