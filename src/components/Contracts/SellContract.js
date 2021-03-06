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
import ethConnect from '../../helpers/eth';
import OTC from '../../helpers/otc';

class SellContract extends React.Component {
  constructor(props) {
    super(props);
    this.interval = null;
    this.state = {
      showModel: false,
      inputAddress: '',
      readOnly: '',
      errorCount: 0,
    };

    this.ethClient = undefined;
  }

  updateAccount() {
    const self = this;
    this.ethClient
      .getAccounts()
      .then(accounts => {
        if (!accounts || accounts.length === 0) {
          self.setState({
            inputAddress: '',
            errorCount: self.state.errorCount + 1,
          });

          return;
        }
        self.setState({
          inputAddress: accounts[0],
        });
      })
      .catch(err => {
        console.log('err', err);
      });
  }

  componentDidMount() {
    const self = this;
    this.ethClient = new ethConnect();
    this.interval = setInterval(() => {
      self.updateAccount();
    }, 4000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  close() {
    clearInterval(this.interval);
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  setRent(e) {
    this.setState({ rent: e.target.value });
  }

  create() {
    const self = this;
    // self.props.onCreate('ASDFASFD');
    // self.close();
    // return;
    const contract = this.ethClient.getContract(
      OTC.spawnContract.abi,
      OTC.spawnContract.address,
    );

    if (contract) {
      const promise = contract.createContract(
        parseInt(this.state.rent) * 1000000000000000,
        this.state.inputAddress,
        {
          from: this.state.inputAddress,
          gas: 2000000,
          gasPrice: 20000000000,
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
    if (this.props.show !== true) {
      return null;
    }
    const readonly = true;

    function AddressStatus(props) {
      if (props.inputAddress != '') return null;

      if (props.errorCount >= 1) {
        return (
          <span className="label label-danger">
            Having trouble loading address... Make sure your are logged in
            Metamask!
          </span>
        );
      }

      return (
        <span className="label label-info">
          Loading input address from Metamask..
        </span>
      );
    }

    return (
      <div className="yoyo">
        <Button
          disabled
          bsStyle="success"
          bsSize="small"
          onClick={this.open.bind(this)}
        >
          Sell
        </Button>

        <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
          <Modal.Header>
            <Modal.Title>New contract</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>Input Address</h5>
            {this.state.inputAddress}{' '}
            <AddressStatus
              inputAddress={this.state.inputAddress}
              errorCount={this.state.errorCount}
            />
            <h5>Rent (in Finney)</h5>
            <FormControl
              type="number"
              onChange={this.setRent.bind(this)}
              placeholder="Rent"
            />
          </Modal.Body>
          <Modal.Footer>
            <Button className="btn-success" onClick={this.create.bind(this)}>
              Claim Balance
            </Button>
            <Button onClick={this.close.bind(this)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default SellContract;
