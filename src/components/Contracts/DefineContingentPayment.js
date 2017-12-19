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

class ContingentPayment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModel: false,
      settlerAddress: '',
      bid: 0,
      contract: 0,
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

  setBid(value) {
    this.setState({ bid: value });
  }

  setContract(value) {
    this.setState({ contract: value });
  }

  setSettlerAddress(e) {
    this.setState({ settlerAddress: e.target.value });
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
      self.props.contract.address,
    );

    if (contract) {
      const promise = contract.confirmOffer(
        this.state.settlement,
        this.state.contract,
        {
          from: this.state.sellerAddress,
          value: this.state.bid,
          gasLimit: 90000,
          gasPrice: 90000,
        },
      );

      promise
        .then(response => {
          self.props.onCreate(response);
          self.close();
        })
        .catch(err => {
          self.props.onError(err);
          self.close();
        });
    }
  }

  render() {
    if (this.props.contract.contractState != '2') return null;

    const readonly = true;

    return (
      <div className="yoyo">
        <Button bsStyle="success" bsSize="small" onClick={this.open.bind(this)}>
          Define Contingent Payment
        </Button>

        <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
          <Modal.Header>
            <Modal.Title>Define Settlement</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>Settler Address</h5>
            <FormControl
              type="string"
              onChange={this.setSettlerAddress.bind(this)}
              placeholder="Settler Address"
            />

            <h5>Seller Address</h5>
            <MetaMaskAddress
              onAddress={this.handleMetaMaskAddress.bind(this)}
            />

            <h5>Contract (in Finney)</h5>
            <InputEther valueChange={this.setContract.bind(this)} />

            <h5>Bid (in Finney)</h5>
            <InputEther valueChange={this.setBid.bind(this)} />
          </Modal.Body>
          <Modal.Footer>
            <Button
              disabled={!this.state.sellerAddress}
              className="btn-success"
              onClick={this.create.bind(this)}
            >
              Define Contingent Payment
            </Button>
            <Button onClick={this.close.bind(this)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default withStyles(s)(ContingentPayment);
