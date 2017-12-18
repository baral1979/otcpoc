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


class DefineSettlement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModel: false,
      sellerAddress: this.props.sellerAddress,
      settlement: '',
      fee: 0,
      errorCount: 0,
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

  setSettlement(e) {
    this.setState({ settlement: e.target.value });
  }

  setFee(e) {
    this.setState({ fee: e.target.value });
  }


  create() {
      const self = this;
      alert(OTC.epayContract.address);

    const contract = this.ethClient.getContract(
      OTC.epayContract.abi,
      OTC.epayContract.address
    );

    if (contract) {
        //        var TF = this.epayContract.defineSettlement(
        //              this.ETHEREUM_CLIENT.toWei(event.target.FEE.value, 'finney'),
        //              event.target.Description.value , 
        //              {from: event.target.SELLER.value, gasLimit:90000, gasPrice:200000000000} 
        //);
  //      alert('A result was posted: ' + TF );
        //alert(this.state.settlement);
        // console.log('this.state.sellerAddress', this.state.sellerAddress);
        var a = {
            arg1:  10000000,
            arg2: this.state.settlement,
            from: "0xc7833955f16c75650f5d3de117843f521cc3a947",
            gasLimit: 90000,
            gasPrice: 200000000000
        }
        console.log('args', a);
      const promise = contract.defineSettlement(10000000, this.state.settlement, {
          from: "0xc7833955f16c75650f5d3de117843f521cc3a947",
        gasLimit: 90000,
        gasPrice: 200000000000
      });
      // const promise = contract.createContract(
      //   parseInt(this.state.rent) * 1000000000000000,
      //   this.state.inputAddress,
      //   {
      //     from: this.state.inputAddress,
      //     gas: 2000000,
      //     gasPrice: 20000000000,
      //   },
      // );

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
          Define Settlement
        </Button>

        <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
          <Modal.Header>
            <Modal.Title>Define Settlement</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>Seller Address</h5>
            <span>{this.state.sellerAddress}</span>
              <h5>Fee (in Finney)</h5>
              <FormControl
                type="number"
                onChange={this.setFee.bind(this)}
                placeholder="Fee"
              />

            <h5>Settlement</h5>
            <FormControl
              type="string"
              onChange={this.setSettlement.bind(this)}
              placeholder="Settlement"
              value={this.state.settlement}
            />

          </Modal.Body>
          <Modal.Footer>
            <Button className="btn-success" onClick={this.create.bind(this)}>
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
