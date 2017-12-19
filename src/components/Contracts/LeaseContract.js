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
import MetaMaskAddress from './MetaMaskAddress';
import InputEther from './InputEther';

class LeaseContract extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModel: false,
      errorCount: 0
    };

    this.ethClient = undefined;
  }

  componentDidMount() {
    const self = this;
    this.ethClient = new ethConnect();
  }

  componentWillUnmount() {

  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  setRent(value) {
    this.setState({ rent: value });
  }

  handleMetaMaskAddress(address) {
    this.setState({
      leaserAddress: address
    })
  }

  create() {
    const self = this;

    const contract = this.ethClient.getContract(
      OTC.epayContract.abi,
      this.props.contract.address,
    );

    if (contract) {
      const promise = contract.lease({
        from: this.state.leaserAddress,
        value: this.state.rent ,
        gasLimit: 90000,
        gasPrice: 200000000000
      });

      promise
        .then(response => {
          self.props.onLeased(response);
          self.close();
        })
        .catch(err => {
          self.props.onError(err);
          self.close();
        });
    }

  }

  render() {
    if (this.props.contract.contractState != '1')
       return null;

    const readonly = true;

    return (
      <div className="yoyo">
        <Button  bsStyle="success" bsSize="small" onClick={this.open.bind(this)}>
          Lease Contract
        </Button>

        <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
          <Modal.Header>
            <Modal.Title>Lease contract</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>Leaser Address</h5>
             <MetaMaskAddress onAddress={this.handleMetaMaskAddress.bind(this)} />
            <h5>Rent (in Finney)</h5>
            <InputEther valueChange={this.setRent.bind(this)}/>
          </Modal.Body>
          <Modal.Footer>
            <Button disabled={!this.state.leaserAddress} className="btn-success" onClick={this.create.bind(this)}>
              Lease Contract
            </Button>
            <Button onClick={this.close.bind(this)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default withStyles(s)(LeaseContract);
