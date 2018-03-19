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
import InputResult from './InputResult';

class CollectFee extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: 0,
      seller: '0x0',
    };
  }

  ok() {
    if (this.props.success) {
      this.props.success({
        seller: this.props.address,
      });
    }
  }

  render() {
    if (!this.props.contract) return null;
    return (
      <ModalButton
        visible={this.props.contract.contractState == 7}
        disabled={this.props.disabled}
        success={this.ok.bind(this)}
        buttonText="Reset and Collect Fee"
        title="Collect Fee"
        content={
          <div>
            <h5>Reporter Address</h5>
            <Address address={this.props.address} showBalance />
          </div>
        }
        bsStyle="primary"
        bsSize="medium"
      />
    );
  }
}

export default CollectFee;
