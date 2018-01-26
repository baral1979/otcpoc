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


class LeaseContract extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rent: 0
    }
  }

  setRent(value) {
    this.setState({ rent: value });
  }

  ok() {
    if (this.props.success) {
      this.props.success({leaser: this.props.address, rent: this.state.rent, contract: this.props.contract.address});
    }
  }

  componentDidMount() {
      if (this.props.contract)
          this.setState({ rent: this.props.contract.rent });
  }

  render() {
    if (!this.props.contract)
      return null;

    return (
      <ModalButton visible={this.props.contract.contractState == 1} disabled={this.props.disabled} success={this.ok.bind(this)} buttonText="Lease Contract" title="Lease Contract" content={<div>
        <h5>Leaser Address</h5>
          <Address address={this.props.address} showBalance={true}/>
          <h5>Rent (in Finney)</h5>
          <InputEther value={this.props.contract.rent} valueChange={this.setRent.bind(this)} />
        </div>
      } bsStyle="primary" bsSize="medium" />
    );
  }
}

export default LeaseContract;
