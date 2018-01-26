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


class CancelOffer extends React.Component {
  constructor(props) {
    super(props);

  }


  ok() {
    if (this.props.success) {
      this.props.success( { seller: this.props.address });
    }
  }

  render() {
    if (!this.props.contract)
      return null;

    return (
      <ModalButton visible={this.props.contract.contractState == 3} disabled={this.props.disabled} success={this.ok.bind(this)} buttonText="Cancel Offer" title="Cancel Offer" content={<div>
        <h5>Buyer Address</h5>
          <Address address={this.props.address} showBalance={true}/>
          <h5>Press OK to cancel this offer!</h5>
        </div>
      } bsStyle="primary" bsSize="medium" />
    );
  }
}

export default CancelOffer;
