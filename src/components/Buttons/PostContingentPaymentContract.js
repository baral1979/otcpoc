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
import InputEther from './InputEther';

class PostContingentPaymentContract extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      enter: 0,
      bid: 0,
      settler: '0x0', // this.props.settlers[0]
    };
  }

  setEnter(value) {
    this.setState({ enter: value });
  }

  setSettler(e) {
    this.setState({ settler: e.target.value });
  }

  setBid(value) {
    this.setState({ bid: value });
  }

  ok() {
    if (this.props.success) {
      this.props.success({
        seller: this.props.contract.seller,
        settler: this.state.settler,
        bid: this.state.bid,
        enter: this.state.enter,
      });
    }
  }

  render() {
    if (!this.props.contract) return null;

    return (
      <ModalButton
        visible={this.props.contract.contractState == 2}
        disabled={this.props.disabled}
        success={this.ok.bind(this)}
        buttonText="Post Contingent Payment Contract"
        title="Post Contingent Payment Contract"
        content={
          <div>
            <h5>Select Settler Address</h5>
            <FormControl
              componentClass="select"
              onChange={this.setSettler.bind(this)}
            >
              <option value={null} />
              {this.props.settlers.map(c => 
               (<option value={c.address}>{c.address}</option>)//c.description
            )
            </FormControl>
            <h5>Seller Address</h5>
            <Address address={this.props.contract.seller} showBalance={true} />
            <h5>Enter Contract (in Finney)</h5>
            <InputEther valueChange={this.setEnter.bind(this)} />
            <h5>Enter Bid (in Finney)</h5>
            <InputEther valueChange={this.setBid.bind(this)} />
          </div>
        }
        bsStyle="primary"
        bsSize="medium"
      />
    );
  }
}

export default PostContingentPaymentContract;
