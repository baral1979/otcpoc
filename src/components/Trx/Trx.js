import React from 'react';
import PropTypes from 'prop-types';
import { BarLoader } from 'react-spinners';
import Eth from '../Eth';
import ethConnect from '../../helpers/eth';

class Trx extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tx: props.tx,
    };
  }

  static propTypes = {
    tx: PropTypes.string.isRequired,
  };

  componentDidMount() {}

  render() {
    return (
      <div>
        <span>
          <a
            target="_blank"
            href={`https://ropsten.etherscan.io/tx/${this.state.tx}`}
          >
            {this.state.tx}
          </a>
        </span>
      </div>
    );
  }
}

export default Trx;
