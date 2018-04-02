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

class SetRent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rent: 0
    }
  }

  setRent(e) {
    this.setState({ rent: e.target.value });
  }

  ok() {
    if (this.props.success) {
      this.props.success({address: this.props.contract.owner, rent: this.state.rent});
    }
  }

  render() {
    if (!this.props.contract)
    return null;

    return (
      <ModalButton visible={this.props.contract.contractState == 1} disabled={this.props.disabled} success={this.ok.bind(this)} buttonText="Set Rent" title="Set Rent" content={<div>
        <h5>Input Address</h5>
          <Address address={this.props.contract.owner} showBalance={true}/>
          <h5>Rent (in Finney)</h5>
          <FormControl
            type="number"
            onChange={this.setRent.bind(this)}
            placeholder="Rent"
          /></div>
      } bsStyle="primary" bsSize="medium" />
    );
  }
}

export default SetRent;
