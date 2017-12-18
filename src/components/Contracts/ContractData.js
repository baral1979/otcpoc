import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip, OverlayTrigger, Button } from 'react-bootstrap';
import Address from '../Address';
import Amount from '../Eth';
import ClaimBalance from './ClaimBalance';
import SetRent from './SetRent';
import LeaseContract from './LeaseContract';
import DefineSettlement from './DefineSettlement';


class Contracts extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h5>
            Selected Contract <Address address={this.props.contract.address} />
          </h5>
        </div>
        <div className="panel-body">
          <h5>Contract Variables</h5>
          <table className="table">
            <thead />
            <tbody>
              <tr>
                <td>Value</td>
                <td>
                  <Amount format="Finney" wei={this.props.contract.value} />
                </td>
              </tr>
              <tr>
                <td>Rent</td>
                <td>
                  <Amount format="Finney" wei={this.props.contract.rent} />
                </td>
              </tr>
              <tr>
                <td>State</td>
                <td>
                  {this.props.contract.contractState}
                </td>
              </tr>
              <tr>
                <td>Description</td>
                <td>
                  {this.props.contract.contractState}
                </td>
              </tr>
            </tbody>
          </table>

          <h5>Current Variables</h5>
          <table className="table">
            <tbody>
              <tr>
                <td>Owner</td>
                <td>
                  <Address address={this.props.contract.set} />
                </td>
              </tr>
              <tr>
                <td>Seller</td>
                <td>
                  <Address address={this.props.contract.seller} />
                </td>
              </tr>
              <tr>
                <td>Buyer</td>
                <td>
                  <Address address={this.props.contract.buyer} />
                </td>
              </tr>
            </tbody>
          </table>
          <div>
          <ClaimBalance onCreate={this.props.onCreate} />
          <SetRent onCreate={this.props.onCreate} />
          <LeaseContract onCreate={this.props.onCreate} rent={this.props.contract.rent}/>
          <DefineSettlement onCreate={this.props.onCreate} sellerAddress={this.props.contract.seller}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Contracts;
