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
import format from 'ethjs-format';

class PostResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModel: false,
      result: '',
      errorCount: 0
    };
    this.interval = null;
    this.ethClient = undefined;
  }

  updateAccount() {
    const self = this;
    this.ethClient.getAccounts().then(accounts => {

      if (!accounts || accounts.length === 0) {
        self.setState({address: "", errorCount: (self.state.errorCount+1)});

        return;
      }
      self.setState({
        address: accounts[0]
      });
    }).catch(err => {
      console.log('err', err)
    });
  }

  componentDidMount() {
    const self = this;
    this.ethClient = new ethConnect();
  }

  componentWillUnmount() {

  }

  close() {
    clearInterval(this.interval);
    this.setState({ showModal: false });
  }

  open() {
    const self = this;
    this.ethClient = new ethConnect();
    this.updateAccount();
    this.interval = setInterval(() => {
      self.updateAccount();
    }, 4000);
    this.setState({ showModal: true });
  }

  setSettlement(e) {
    this.setState({ settlement: e.target.value });
  }

  setFee(e) {
    this.setState({ fee: e.target.value });
  }


  create() {
      const self = this;
    const contract = this.ethClient.getContract(
      OTC.epayContract.abi,
      OTC.epayContract.address
    );

    if (contract) {
      const promise = contract.defineSettlement(10000000,  web3.fromAscii(this.state.settlement) ,{
        from: "0xc7833955f16c75650f5d3de117843f521cc3a947",
        gasLimit: 90000,
        gasPrice: 90000
      });
      promise
        .then(response => {
          self.props.onCreate(response);
          self.close();
        })
        .catch(err => console.log('error', err));
    }
  }

  render() {
    if (this.props.show !== true)
      return null;
    const readonly = true;

    function AddressStatus(props) {
      if (props.sellerAddress != '')
         return null;

      if (props.errorCount >=1) {
          return (<span className="label label-danger">Having trouble loading address... Make sure your are logged in Metamask!</span>);
      }

      return (<span className="label label-info">Loading input address from Metamask..</span>);
    }

    return (
      <div className="yoyo">
        <Button  bsStyle="success" bsSize="small" onClick={this.open.bind(this)}>
          Post Result
        </Button>

        <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
          <Modal.Header>
            <Modal.Title>Post Result</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>Reporter Address</h5>
            <span>{this.state.address}</span>
              <h5>Fee (in Finney)</h5>
              <FormControl
                type="number"
                onChange={this.setFee.bind(this)}
                placeholder="Fee"
              />

            <h5>Result</h5>
            <FormControl
              type="string"
              onChange={this.setSettlement.bind(this)}
              placeholder="Settlement"
              value={this.state.settlement}
            />

          </Modal.Body>
          <Modal.Footer>
            <Button className="btn-success" onClick={this.create.bind(this)}>
              Post Result
            </Button>
            <Button onClick={this.close.bind(this)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default withStyles(s)(PostResult);
