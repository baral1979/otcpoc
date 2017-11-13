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

class NewContract extends React.Component {
  constructor(props) {
    super(props);
    this.interval = null;
    this.state = {
      showModel: false,
      inputAddress: '',
      readOnly: '',
    };

    this.ethClient = undefined;
  }

  updateAccount() {
    const self = this;
    this.ethClient.getAccounts().then(accounts => {
      self.setState({ inputAddress: accounts[0] });
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
    const readonly = true;

    return (
      <div>
        <Button bsStyle="success" bsSize="small" onClick={this.open.bind(this)}>
          Create new contract
        </Button>

        <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
          <Modal.Header>
            <Modal.Title>New contract</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>Input Address</h5>
            {this.state.inputAddress}

            <h5>Rent (in Finney)</h5>
            <FormControl
              type="number"
              onChange={this.setRent.bind(this)}
              placeholder="Rent"
            />
          </Modal.Body>
          <Modal.Footer>
            <Button className="btn-success" onClick={this.create.bind(this)}>
              Create contract
            </Button>
            <Button onClick={this.close.bind(this)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default NewContract;
