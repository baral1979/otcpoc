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


class LeaseAny extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rent: 0
    }
  }

  setRent(value) {
    this.setState({ rent: value });
  }

  ok(contract) {
    console.log('contract', contract);
    return;
    if (this.props.success) {
      this.props.success({leaser: this.props.address, rent: this.state.rent, contract: this.props.contract.address});
    }
  }

  render() {
    if (!this.props.contracts)
      return null;

    return (
      <ModalButton showOk={false} visible={true} disabled={this.props.disabled} success={this.ok.bind(this)} buttonText="Lease a Contract" title="Lease a Contract" content={<div>
        <h5>Select a leasable contract</h5>
          {this.props.contracts.map(c => {
            return (
              <div>
                  <Button onClick={this.ok.bind(this,c)}>
                    {c.address} ( {c.rent / 1000000000000000000 * 1000} Finney)
                  </Button>
              </div>
            )
          })}


        </div>
      } bsStyle="primary" bsSize="large" />
    );
  }
}

export default LeaseAny;
