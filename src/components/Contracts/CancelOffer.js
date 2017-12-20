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

class CancelOffer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModel: false,
      sellerAddress: ''
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

      const promise = contract.abort(
        {
          from: this.state.sellerAddress,
          gasLimit: 90000,
          gasPrice: 200000000000,
        }
      );

      promise
        .then(response => {
          self.props.onCreate(response);
          self.close();
// TODO: Set Description
          //           var valueData = this.epayContract.getTicket();
          // var SettlementDescription = valueData[10];
          // if (valueData[9].c[0] === 3 || valueData[9].c[0] === 4){
          //    SettlementDescription = this.ETHEREUM_CLIENT.eth.contract(epayContractABI).at(valueData[6]).description.call();
          // }
        })
        .catch(err => {
          self.props.onError(err);
          self.close();
        });
    }
  }

  render() {
    if (this.props.contract.contractState != '3') return null;

    const readonly = true;

    return (
      <div className="yoyo">
        <Button bsStyle="success" bsSize="small" onClick={this.open.bind(this)}>
          Cancel Offer
        </Button>

        <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
          <Modal.Header>
            <Modal.Title>Define Settlement</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>Cancel Offer</h5>
            <h5>Seller Address</h5>
            <MetaMaskAddress
              onAddress={this.handleMetaMaskAddress.bind(this)}
            />
            <h6>Are you sure you want to cancel this offer?</h6>
          </Modal.Body>
          <Modal.Footer>
            <Button
              disabled={!this.state.sellerAddress}
              className="btn-success"
              onClick={this.create.bind(this)}
            >
              Yes
            </Button>
            <Button onClick={this.close.bind(this)}>No</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default withStyles(s)(CancelOffer);
