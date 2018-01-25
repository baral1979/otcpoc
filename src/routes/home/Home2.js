import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Home2.css';
import ethConnect from '../../helpers/eth';
import OTC from '../../helpers/otc';
import ContractList from '../../containers/contractList';
import Loader from '../../components/Loader';
import Contracts from '../../components/Contracts';
import Error from '../../components/Error';
import Actions from '../../actions';


class Home2 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loadingMessage: 'Connecting to Ethereum Blockchain',
      loading: true,
      inputAddress: {
        address: '',
        balance: 0,
      },
      state: 1,
      contracts: [],

      selectedContract: undefined,

      mascara_enabled: false,
    };

    this.ethClient = undefined;
  }

  init() {
    const self = this;
    try {
      this.ethClient = new ethConnect();
      Actions.setClient(new ethConnect());
    } catch (e) {
      self.setState({state: 2});
      return;
    }

    this.ethClient.getContracts(OTC.spawnContract.abi, OTC.spawnContract.address).then(contracts => {
      self.setState({contracts: contracts[0]});
    }).catch(err => {
      console.log('contract error', err);
    });

    self.setState({loading: false, state: 3});
  }

  // componentDidMount componentDidMount componentDidMount
  componentDidMount() {
    const self = this;
    setTimeout(function() { self.init();}, 2500);
    return;
  }

  render() {

        return (
          <div className="content">
                <ContractList/>
          </div>
        );


  }
}

export default withStyles(s)(Home2);
