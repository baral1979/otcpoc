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

class CancelTradeContract extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      price: 0
    }
  }


  ok() {
    if (this.props.success) {
      this.props.success({address: this.props.contract.owner});
    }
  }

  render() {
    if (!this.props.contract)
    return null;

    return (
      <ModalButton visible={this.props.contract.contractState == 5} disabled={this.props.disabled} success={this.ok.bind(this)} buttonText="Cancel Offer" title="Cancel Offer" content={<div>
        <h5>Input Address</h5>
          <Address address={this.props.contract.owner} showBalance={true}/>
          </div>
      } bsStyle="primary" bsSize="medium" />
    );
  }
}

export default CancelTradeContract;
