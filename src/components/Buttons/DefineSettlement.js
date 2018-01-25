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


class DefineSettlement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fee: 0,
      settlement: ''
    }
  }

  setFee(value) {
    this.setState({ fee: value });
  }

  setSettlement(e) {
    this.setState({ settlement: e.target.value });
  }

  ok() {
    if (this.props.success) {
      this.props.success({seller: this.props.contract.seller, address: this.props.address, fee: this.state.fee, settlement: this.state.settlement});
    }
  }

  render() {
    if (!this.props.contract)
      return null;
    return (
      <ModalButton visible={this.props.contract.contractState == 2} disabled={this.props.disabled} success={this.ok.bind(this)} buttonText="Define Settlement" title="Post Settlement Contract" content={<div>
        <h5>Seller Address</h5>
          <Address address={this.props.contract.seller} showBalance={true}/>
          <h5>Enter Fee (in Finney)</h5>
          <InputEther valueChange={this.setFee.bind(this)} />
            <h5>Settlement</h5>
            <FormControl
              type="string"
              onChange={this.setSettlement.bind(this)}
              placeholder="Settlement"
              value={this.state.settlement}
            />
        </div>
      } bsStyle="primary" bsSize="medium" />
    );
  }
}

export default DefineSettlement;
