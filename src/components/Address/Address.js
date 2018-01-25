import React from 'react';
import PropTypes from 'prop-types';
import {BarLoader} from 'react-spinners';
import Eth from '../Eth';
import ethConnect from '../../helpers/eth';

class Address extends React.Component {
  constructor(props) {
    super(props);

    //const hideBalance = props.showBalance === false;

    this.state = {
      balance: 0
    };
  }

  static propTypes = {
    address: PropTypes.string.isRequired
  };

  updateBalance() {
      this.ethClient
        .getBalance(this.props.address)
        .then(bal => this.setState({ balance: bal }));
  }

  componentDidMount() {
    if (this.props.showBalance === true) {
      this.ethClient = new ethConnect();
      this.updateBalance();
    }
  }

  render() {
    const self = this;
    function Balance(props) {
      if (self.props.showBalance)
        return (<span className="label label-primary">
          <Eth wei={self.state.balance} format="Ether"/>
        </span>);

      return null;
    }

    return (<div>
      <span>
        <a target="_blank" href={`https://ropsten.etherscan.io/address/${this.props.address}`}>
          {this.props.address}
        </a>&nbsp;
        <Balance/>
      </span>
    </div>);
  }
}

export default Address;
