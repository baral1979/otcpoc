import React from 'react';
import PropTypes from 'prop-types';
import { BarLoader } from 'react-spinners';
import Eth from '../Eth';
import Success from '../Success';
import ethConnect from '../../helpers/eth';
import { ClipLoader } from 'react-spinners';
import s from './Trx.css';


class Trx extends React.Component {
  constructor(props) {
    super(props);
    this.interval = null;
    this.state = {
      tx: props.tx,
      statusText: 'Pending...',
      pending: true,

    };
  }
    //0x5d56d89b6fb0e393e5786dac828ccfadf0fc3b0d
  static propTypes = {
    tx: PropTypes.string.isRequired,
  };

  updateStatus() {
      if (!this.state.tx) {
          this.setState({ pending: false });
          return;
      }

      var that = this;
      var url = `https://ropsten.etherscan.io/api?module=transaction&action=getstatus&txhash=${this.props.tx}&apikey=XKZIW57V8EPH1MA1DPVHKWUFAY5QBCRSS1`

      this.ethClient.getTransactionReceipt(this.props.tx)
          .then((data) => {
              if (!data)
                  return;
              console.log(data);
              clearInterval(that.interval);
              this.setState({
                  pending: false,
                  statusText: data.status,
                  success: data.status === "0x1"
              });
          })
          .catch((err) => console.log('err checking transaction status', err));
  }

  componentWillUnmount() {
      clearInterval(this.interval);
  }

  componentDidMount() {
      this.ethClient = new ethConnect();
      this.interval = setInterval(this.updateStatus.bind(this), 2000);
  }

  render() {
      function Spinner(props) {
          if (props.show) {
            return (<span><ClipLoader size="12" color="#352A37"/>{props.text}</span>);
          }



      return null;
      }

      function ShowSuccess(props) {
          if (props.show === true) {
             return <Success success={props.success} />
          }

          return null;
      }

      return (<div>
                <h5>Transaction</h5>
                <span>
                    <a target="_blank" href={`https://ropsten.etherscan.io/tx/${this.props.tx}`}>
                        {this.props.tx}
                    </a>&nbsp;
                    <Spinner show={this.state.pending} text={this.state.statusText}/>
                    <ShowSuccess show={!this.state.pending} success={this.state.success} />

                </span>

              </div>
    );
  }
}

export default Trx;
