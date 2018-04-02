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


class ClaimBalance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rent: 0
    }
  }


  ok() {
    if (this.props.success) {
      this.props.success({contract: this.props.contract.address, owner: this.props.contract.owner});
    }
  }


  render() {
    if (!this.props.contract)
      return null;

    return (
      <ModalButton visible={this.props.contract.contractState == 1} disabled={this.props.disabled} success={this.ok.bind(this)} buttonText="Claim Balance" title="Claim Balance" content={<div>
        <h5>Owner Address</h5>
          <Address address={this.props.contract.owner} showBalance={true}/>
          <h5>Claim Contract Balance</h5>
          <Address address={this.props.contract.address} showBalance={true}/>
        </div>
      } bsStyle="primary" bsSize="medium" />
    );
  }
}

export default ClaimBalance;
