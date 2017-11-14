import React from 'react';
import PropTypes from 'prop-types';
import { BarLoader } from 'react-spinners';
import Eth from '../Eth';
import ethConnect from '../../helpers/eth';
import { ClipLoader } from 'react-spinners';
import s from './Trx.css';


class Trx extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tx: props.tx,
      transactionStatus: 1
    };
  }

  static propTypes = {
    tx: PropTypes.string.isRequired,
  };

  componentDidMount() {
    if (!this.props.tx)
      return;

    var that = this;
    var url = `https://ropsten.etherscan.io/api?module=transaction&action=getstatus&txhash=${this.props.tx}&apikey=XKZIW57V8EPH1MA1DPVHKWUFAY5QBCRSS1`

    fetch(url).then(function(response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      response.json().then(data => console.log('response', data));
    });
  }

  render() {
    function ShowSpinner(props) {
      if (props.show) {
        return (<span><ClipLoader size="12" color="#352A37"/></span>);
      }

      return null;
    }

    return (
      <div>
          <span className="label label-success">
              <a className={s.address} target="_blank" href={`https://ropsten.etherscan.io/tx/${this.state.tx}`}> NEW CONTRACT PENDING
          </a></span>
      </div>
    );
  }
}

export default Trx;
