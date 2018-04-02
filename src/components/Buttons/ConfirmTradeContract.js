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
import ModalButton from '../ModalButton'
import InputEther from './InputEther';


class ConfirmTradeContract extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      price: 0
    }
  }

  setPrice(value) {
    this.setState({ price: value });
  }

  ok() {
    if (this.props.success) {
      this.props.success( {buyer: this.props.address, price: this.state.price });
    }
  }

  render() {
    if (!this.props.contract)
      return null;

    return (
      <ModalButton visible={this.props.contract.contractState == 5} disabled={this.props.disabled} success={this.ok.bind(this)} buttonText="Purchase" title="Purchase Contract" content={<div>
        <h5>Buyer Address</h5>
          <Address address={this.props.address} showBalance={true}/>
          <h5>Enter Price (in Finney)</h5>
          <InputEther valueChange={this.setPrice.bind(this)} />
        </div>
      } bsStyle="primary" bsSize="medium" />
    );
  }
}

export default ConfirmTradeContract;
