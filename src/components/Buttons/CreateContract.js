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

class CreateContract extends React.Component {
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
      this.props.success({address: this.props.address, rent: this.state.rent});
    }
  }

  render() {
    return (
      <ModalButton disabled={this.props.disabled} success={this.ok.bind(this)} buttonText="Create Contract" title="New Contract" content={<div>
        <h5>Input Address</h5>
          <Address address={this.props.address} showBalance={true}/>
          <h5>Rent (in Finney)</h5>
          <FormControl
            type="number"
            onChange={this.setRent.bind(this)}
            placeholder="Rent"
          /></div>
      } bsStyle="primary" bsSize="large" />
    );
  }
}

export default CreateContract;
