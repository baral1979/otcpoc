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

class TradeContract extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      price: 0
    }
  }

  setPrice(e) {
    this.setState({ price: e.target.value });
  }

  ok() {
    if (this.props.success) {
      this.props.success({address: this.props.contract.owner, price: this.state.price});
    }
  }

  render() {
    if (!this.props.contract)
    return null;

    return (
      <ModalButton visible={this.props.contract.contractState == 1} disabled={this.props.disabled} success={this.ok.bind(this)} buttonText="Trade Contract" title="Trade Contract" content={<div>
        <h5>Input Address</h5>
          <Address address={this.props.contract.owner} showBalance={true}/>
          <h5>Price (in Finney)</h5>
          <FormControl
            type="number"
            onChange={this.setPrice.bind(this)}
            placeholder="Price"
          /></div>
      } bsStyle="primary" bsSize="medium" />
    );
  }
}

export default TradeContract;
