import React from 'react';
import PropTypes from 'prop-types';
import { BarLoader } from 'react-spinners';
import Eth from '../Eth';
import ethConnect from '../../helpers/eth';

class Address extends React.Component {
  constructor(props) {
    super(props);

    const hideBalance = props.showBalance === false;

    this.state = {
      showBalance: !hideBalance,
      address: props.address,
      balance: 0,
      loading: true,
    };
    this.ethClient = undefined;
  }

  static propTypes = {
    address: PropTypes.string.isRequired,
  };

  updateBalance() {
    if (this.state.address)
      this.ethClient
        .getBalance(this.state.address)
        .then(bal => this.setState({ balance: bal }));
  }

  componentDidMount() {
    this.ethClient = new ethConnect();
    this.updateBalance();
  }

  render() {
    const self = this;
    function Balance(props) {
      if (self.state.showBalance)
        return (
          <span className="label label-primary">
            <Eth wei={self.state.balance} format="Ether" />
          </span>
        );

      return null;
    }

    return (
      <div>
        <span>
          <a
            target="_blank"
            href={`https://ropsten.etherscan.io/address/${this.state.address}`}
          >
            {this.state.address}
          </a>
          <Balance />
        </span>
      </div>
    );
  }
}

export default Address;
