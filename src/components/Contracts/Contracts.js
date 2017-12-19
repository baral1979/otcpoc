import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip, OverlayTrigger, Alert, Pagination } from 'react-bootstrap';
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
      pendingTrx: undefined,
      activePage: 1,
      itemsPerPage: 12
    };

    this.ethClient = undefined;
    this.getContracts = this.getContracts.bind(this);
  }

  selectContract(event) {
    var contract = event;
    console.log(event);
    this.ethClient
      .getContractTicket(OTC.epayContract.abi, contract)
      .then(data => {console.log('selected contract',data);this.setState({ selectedContract: data })});
  }

  componentDidMount() {
    this.ethClient = new ethConnect();
  }

  newContract(trx) {
    if (trx)
       this.setState({ pendingTrx: trx });
  }

  handleDismiss() {
    this.setState({ pendingTrx: undefined, error: undefined });
  }

  handleChangeRent(contract) {
    alert(`Change rent for ${contract.address}`);
  }

  getContracts() {
    return this.state.contracts;
  }

  handleOnLeased(trx) {
    if (trx)
       this.setState({ pendingTrx: trx });
  }

  handleOnError(err) {
    this.setState({
      error: 'An error has occured. Check console for more details!'
    })
  }

  changePage(page) {
    this.setState({ activePage: page});
  }

  render() {
    function SelectedContract(props) {
      if (props && props.contract) {
        return <ContractData settlerContracts={props.settlerContracts} onLeased={props.onLeased} onError={props.onError} changeRent={props.changeRent} contract={props.contract} />;
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

    function Error(props) {
      if (props.error) {
        return (
          <Alert bsStyle="danger" onDismiss={props.handleDismiss}>
            <h4>Oups! An error occured!</h4>
            <p>{props.error}</p>
          </Alert>
        )
      }

      return null;
    }



    function ContractList(props) {

      if (!props || !props.contracts ||props.contracts.length === 0)
          return null;

      var firstItemIndex = props.itemsPerPage * (props.activePage-1);
      var items = props.contracts.slice(firstItemIndex, firstItemIndex + props.itemsPerPage);

      return (
        <tbody>
        {items.map((item, i) =>
          <tr key={i}>
          <td className={s.numCol}>
            {i+1+firstItemIndex}
          </td>
          <td>
          <span
              onClick={props.handleClick.bind(this, item)}
              className={s.contractAddress}>
            {item}
          </span>
          </td>
          </tr>
        )}
          </tbody>
      )


    }

    function Pager(props) {
      if (props.nbItems <= 0)
        return null;

      return (  <Pagination
        bsSize="medium"
        items={Math.ceil(props.nbItems / props.itemsPerPage)}
        activePage={props.activePage}
        onSelect={props.handleSelect}
        />)
    }

    return (
      <div>
      <Transaction pendingTrx={this.state.pendingTrx} handleDismiss={this.handleDismiss.bind(this)}/>
      <Error error={this.state.error} handleDismiss={this.handleDismiss.bind(this)} />
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
                <ContractList contracts={this.props.contracts} activePage={this.state.activePage} itemsPerPage={this.state.itemsPerPage} handleClick={this.selectContract.bind(this)}/>
              </table>
              <Pager nbItems={this.props.contracts.length} handleSelect={this.changePage.bind(this)} activePage={this.state.activePage} itemsPerPage={this.state.itemsPerPage}/>
            </div>
            <div className="col-md-7">
              <SelectedContract settlerContracts={this.props.contracts.filter(c => {return c.contractState === '6';})} onLeased={this.handleOnLeased.bind(this)} onError={this.handleOnError.bind(this)} changeRent={this.handleChangeRent.bind(this)} contract={this.state.selectedContract} />
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default withStyles(s)(Contracts);
