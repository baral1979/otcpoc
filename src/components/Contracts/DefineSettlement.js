import {
  OverlayTrigger,
  Modal,
  Button,
  Popover,
  Tooltip,
  FormControl,
} from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import React from 'react';
import ReactDOM from 'react-dom';
import Address from '../Address';
import ethConnect from '../../helpers/eth';
import OTC from '../../helpers/otc';
import s from './Claim.css';
import InputEther from './InputEther';
import MetaMaskAddress from './MetaMaskAddress';

class DefineSettlement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModel: false,
      settlement: '',
      fee: 0,
    };

    this.ethClient = undefined;
  }

  componentDidMount() {
    const self = this;
    this.ethClient = new ethConnect();
  }

  componentWillUnmount() {}

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  setSettlement(e) {
    this.setState({ settlement: e.target.value });
  }

  setFee(value) {
    this.setState({ fee: value });
  }

  handleMetaMaskAddress(address) {
    this.setState({
      sellerAddress: address,
    });
  }

  create() {
    const self = this;

    const contract = this.ethClient.getContract(
      OTC.epayContract.abi,
      OTC.epayContract.address,
    );

    if (contract) {
        console.log('fee', this.state.fee);
      const promise = contract.defineSettlement(
        10000000,
        web3.fromAscii(this.state.settlement),
        {
          from: this.state.sellerAddress,
          gasLimit: 90000,
          gasPrice: 200000000000,
        },
      );

      promise
        .then(response => {
          self.props.onCreate(response);
          self.close();
        })
        .catch(err => console.log('error', err));
    }
    // console.log(contract);
  }

  render() {
    if (this.props.contract.contractState !== '2') return null;
    const readonly = true;

    return (
      <div className="yoyo">
        <Button bsStyle="success" bsSize="small" onClick={this.open.bind(this)}>
          Define Settlement
        </Button>

        <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
          <Modal.Header>
            <Modal.Title>Define Settlement</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>Seller Address</h5>
            <MetaMaskAddress
              onAddress={this.handleMetaMaskAddress.bind(this)}
            />
            <h5>Fee (in Finney)</h5>
            <InputEther valueChange={this.setFee.bind(this)} />
            <h5>Settlement</h5>
            <FormControl
              type="string"
              onChange={this.setSettlement.bind(this)}
              placeholder="Settlement"
              value={this.state.settlement}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button
              disabled={!this.state.sellerAddress}
              className="btn-success"
              onClick={this.create.bind(this)}
            >
              Define Settlement
            </Button>
            <Button onClick={this.close.bind(this)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default withStyles(s)(DefineSettlement);
