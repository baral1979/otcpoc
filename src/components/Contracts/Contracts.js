import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip, OverlayTrigger, Alert } from 'react-bootstrap';
import NewContract from './NewContract';
import ContractData from './ContractData';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Contracts.css';
import ethConnect from '../../helpers/eth';
import OTC from '../../helpers/otc';
import Trx from '../Trx';

class Contracts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      contracts: props.contracts,
      selectedContract: undefined,
      pendingTrx: undefined,
    };

    this.ethClient = undefined;
  }

  selectContract(contract) {
    this.ethClient
      .getContractTicket(OTC.epayContract.abi, contract)
      .then(data => this.setState({ selectedContract: data }));
  }

  componentDidMount() {
    this.setState({
      displayedContracts: this.state.contracts
    });

    this.ethClient = new ethConnect();
  }

  newContract(trx) {
    if (trx)
       this.setState({ pendingTrx: trx });
  }

  handleDismiss() {
    this.setState({ pendingTrx: undefined });
  }

  render() {
    function SelectedContract(props) {
      if (props && props.contract) {
        return <ContractData contract={props.contract} />;
      }
      return <div className={s.noContractWrapper}>Select a contract</div>;
    }

    function NewContractWrapper(props) {
      if (props.pendingTrx) return <Trx tx={props.pendingTrx} />;

      return <NewContract onCreate={props.onCreate} />;
    }

    function Transaction(props) {
      if (props.pendingTrx) {
      return (
          <Alert bsStyle="success" onDismiss={props.handleDismiss}>
           <h4>Great! The contract was create successfully!</h4>
           <p>The transaction is currently pending and waiting for confirmations... <a target="_blank" href={`https://ropsten.etherscan.io/tx/${props.pendingTrx}`}>Click here to see more details about the transaction.</a></p>
          </Alert>)
      }

      return null;
    }

    return (
      <div>
      <Transaction pendingTrx={this.state.pendingTrx} handleDismiss={this.handleDismiss.bind(this)}/>
      <div className="panel panel-default">
        <div className="panel-heading">
          <h4>
            Spawn Contracts<div className="pull-right">
              <NewContract
                onCreate={this.newContract.bind(this)}
              />
            </div>
          </h4>{' '}
        </div>
        <div className="panel-body">
          <div className="row">
            <div className="col-md-5">
            <table className="table">
              <thead>
               <tr>
                 <th>#</th>
                 <th>Contract Address</th>
               </tr>
             </thead>
            <tbody>

            {this.props.contracts.map((item, i) =>
              <tr key={i}>
              <td className={s.numCol}>
              {i+1}
              </td>
              <td>
              <span
                onClick={this.selectContract.bind(this, item)}
              className={s.contractAddress}>
                {item}
              </span>
              </td>
              </tr>,
            )}
              </tbody>
              </table>
            </div>
            <div className="col-md-7">
              <SelectedContract contract={this.state.selectedContract} />
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default withStyles(s)(Contracts);
