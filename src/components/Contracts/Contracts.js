import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
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
    this.ethClient = new ethConnect();
  }

  newContract(trx) {
    this.setState({ pendingTrx: trx });
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



    // {this.props.contracts.map((item, i) =>
    //   <div className={s.contractContainer} key={i}>
    //     <span
    //       onClick={this.selectContract.bind(this, item)}
    //       className={`label label-default ${s.contractAddress}`}
    //     >
    //       <span className="badge">{i}</span> {item}
    //     </span>
    //   </div>,
    // )}
    return (
      <div>
      <div className="panel panel-default">
        <div className="panel-heading">
          <h4>
            Spawn Contracts<div className="pull-right">
              <NewContractWrapper
                onCreate={this.newContract.bind(this)}
                pendingTrx={this.state.pendingTrx}
              />
            </div>
          </h4>{' '}
        </div>
        <div className="panel-body">
          <div className="row">
            <div className="col-md-5">
            <table className="table">
            <tbody>

            {this.props.contracts.map((item, i) =>
              <tr key={i}>
              <td>
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
