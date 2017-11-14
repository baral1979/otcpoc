import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Contracts.css';
import ethConnect from '../../helpers/eth';
import OTC from '../../helpers/otc';

import Loadable from 'react-loading-overlay';
import Contracts from '../../components/Contracts';

class ContractsCompoment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loadingMessage: 'Connecting to Ethereum Blockchain',
      loading: true,
      inputAddress: {
        address: '',
        balance: 0,
      },

      contracts: [],

      selectedContract: undefined,

      mascara_enabled: false,
    };

    this.ethClient = undefined;
  }

  // componentDidMount componentDidMount componentDidMount
  componentDidMount() {
    const self = this;

    try {
      this.ethClient = new ethConnect();
    } catch (e) {
      alert('Incompatible browser');
      return; // TODO Handle error
    } finally {
    }

    this.ethClient
      .getContracts(OTC.spawnContract.abi, OTC.spawnContract.address)
      .then(contracts => {
        self.setState({
          contracts: contracts[0],
        });
      })
      .catch(err => {
        console.log('contract error', err);
      });

    self.setState({
      loading: false,
    });
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <br />

          <Loadable
            active={this.state.loading}
            spinner
            text={`${this.state.loadingMessage}...`}
          >
            <Contracts contracts={this.state.contracts} />

            <br />
          </Loadable>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(ContractsCompoment);
