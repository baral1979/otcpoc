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

class ChangeBuyerPositionPrice extends React.Component {
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
      this.props.success({address: this.props.contract.buyer, price: this.state.price});
    }
  }

  render() {
    if (!this.props.contract)
    return null;

    return (
      <ModalButton visible={this.props.contract.contractState == 4} disabled={this.props.disabled} success={this.ok.bind(this)} buttonText="Change Buyer Price" title="Change Buyer Price" content={<div>
        <h5>Input Address</h5>
          <Address address={this.props.contract.buyer} showBalance={true}/>
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

export default ChangeBuyerPositionPrice;
