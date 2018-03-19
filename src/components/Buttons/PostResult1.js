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

class PostResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: 0,
    };
  }

  setResult(value) {
    this.setState({ result: value });
  }

  ok() {
    if (this.props.success) {
      this.props.success({
        seller: this.props.contract.seller,
        address: this.props.address,
        result: this.state.result,
      });
    }
  }

  render() {
    if (!this.props.contract) return null;
    return (
      <ModalButton
        visible={this.props.contract.contractState == 6}
        disabled={this.props.disabled}
        success={this.ok.bind(this)}
        buttonText="Post Result"
        title="Post Result"
        content={
          <div>
            <h5>Reporter Address</h5>
            <Address address={this.props.contract.seller} showBalance />
            <h5>Enter Result [0,1000]</h5>
            <InputResult valueChange={this.setResult.bind(this)} />
          </div>
        }
        bsStyle="primary"
        bsSize="medium"
      />
    );
  }
}

export default PostResult;
