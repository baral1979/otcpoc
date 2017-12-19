import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip, OverlayTrigger, Button } from 'react-bootstrap';
import Address from '../Address';
import Amount from '../Eth';
import ClaimBalance from './ClaimBalance';
import SetRent from './SetRent';
import SellContract from './SellContract';
import LeaseContract from './LeaseContract';
import DefineSettlement from './DefineSettlement';
import DefineContingentPayment from './DefineContingentPayment';
import PostResult from './PostResult';
import { CopyToClipboard } from 'react-copy-to-clipboard';

class Contracts extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    function State(props) {
      let text = '';
      switch (props.state) {
        case '1':
          text = 'Initial state';
          break;
        case '2':
          text = 'Leased';
          break;
        case '6':
          text = 'Settlement pending';
          break;
        default:
          text = 'well';
      }

      if (text.length > 0) text = `${text} (${props.state})`;
      else text = props.state;
      return (
        <span>
          {text}
        </span>
      );
    }

    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h5>
            Selected Contract
            <Address address={this.props.contract.address} />
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
                  <State state={this.props.contract.contractState} />
                </td>
              </tr>
              <tr>
                <td>Description</td>
                <td>
                  {this.props.contract.description}
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
                  <Address address={this.props.contract.owner} />
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
          <h5>Actions</h5>
          <div>
            <ClaimBalance show={false} onCreate={this.props.onCreate} />
            <SetRent onCreate={this.props.onCreate} />
            <LeaseContract
              contract={this.props.contract}
              onLeased={this.props.onLeased}
              onError={this.props.onError}
              rent={this.props.contract.rent}
            />
            <DefineContingentPayment
              contract={this.props.contract}
              onCreate={this.props.onLeased}
              contract={this.props.contract}
              onError={this.props.onError}
            />
            <DefineSettlement
              show={this.props.contract.contractState === '2'}
              onCreate={this.props.onCreate}
              sellerAddress={this.props.contract.seller}
            />
            <PostResult
              show={this.props.contract.contractState === '6'}
              onCreate={this.props.onCreate}
            />
          </div>
          <br />
          <br />
          <h5>Owner Actions</h5>
          <div>
            <ClaimBalance show onCreate={this.props.onCreate} />
            <SetRent show onCreate={this.props.onCreate} />
            <SellContract show onCreate={this.props.onCreate} />
          </div>
        </div>
      </div>
    );
  }
}

export default Contracts;
