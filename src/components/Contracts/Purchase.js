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

class Purchase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModel: false,
      buyerAddress: ''
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

  setUnits(value) {
    this.setState({
      units: value,
    });
  }

  handleMetaMaskAddress(address) {
    this.setState({
      buyerAddress: address,
    });
  }

  create() {
    const self = this;

    const contract = this.ethClient.getContract(
      OTC.epayContract.abi,
      self.props.contract.address,
    );

    if (contract) {

      const promise = contract.confirmPurchase(
        {
          from: this.state.buyerAddress,
          value: this.state.units,
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
          Purchase
        </Button>

        <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
          <Modal.Header>
            <Modal.Title>Define Settlement</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>Purchase</h5>
            <h5>Buyer Address</h5>
            <MetaMaskAddress
              onAddress={this.handleMetaMaskAddress.bind(this)}
            />
            <h5>Units (in Finney)</h5>
            <InputEther valueChange={this.setUnits.bind(this)} />
          </Modal.Body>
          <Modal.Footer>
            <Button
              disabled={!this.state.buyerAddress}
              className="btn-success"
              onClick={this.create.bind(this)}
            >
              Purchage
            </Button>
            <Button onClick={this.close.bind(this)}>Cancel</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default withStyles(s)(Purchase);
