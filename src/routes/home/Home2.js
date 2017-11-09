/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from "react";
import ReactDOM from "react-dom";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import PropTypes from "prop-types";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./Home2.css";
import ReactLoading from "react-loading";
import EthQuery from "eth-query";
import metamask from "metamascara";
import Accounts from "../../components/Accounts";
import Loadable from "react-loading-overlay";

function Loading(props) {
  if (props.isLoading) {
    return (
      <div>
        <span>Loading accounts...</span>
        <ReactLoading type="bubbles" color="#9073AC" />
      </div>
    );
  }

  return <div />;
}

class Home2 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      accounts: [],
      loading: true,
      mascara_enabled: false
    };
  }

  resolveMetamask() {
    return new Promise((resolve, reject) => {
      if (!global.web3) {
        if (!window.ENABLE_MASCARA) {
          reject();
        }

        const provider = metamask.createDefaultProvider({});
        global.web3 = {
          currentProvider: provider
        };
        resolve();
      }
      resolve();
    });
  }

  resolveAfter2Seconds(x) {
    return new Promise(resolve, reject => {
      setTimeout(() => {
        resolve(x);
      }, 2000);
    });
  }

  async add1(x) {
    const a = this.resolveAfter2Seconds(20);
    const b = this.resolveAfter2Seconds(30);
    return x + (await a) + (await b);
  }

  componentDidMount() {
    this.resolveMetamask()
      .then(() => {
        alert("OK");
      })
      .catch(() => {
        alert("error");
      });

    return;
    this.add1(10).then(v => {
      alert(v);
    });
    var that = this;
    if (!global.web3) {
      // abort
      if (!window.ENABLE_MASCARA) {
        alert("diabled");
        this.setState({
          loading: false
        });
        return;
      }

      // start mascara
      const provider = metamask.createDefaultProvider({});
      global.web3 = {
        currentProvider: provider
      };
    }

    // create query helper
    global.ethQuery = new EthQuery(global.web3.currentProvider);
    var updateInterval = null;
    var updateAccounts = function() {
      global.ethQuery.accounts(function(err, accounts) {
        if (err) return console.error(err);

        accounts = accounts.map(x => {
          return {
            address: x
          };
        });

        if (
          that.state.accounts &&
          that.state.accounts.length > 0 &&
          accounts &&
          that.state.accounts[0].address === accounts[0].address
        )
          return;

        // get account balance
        global.ethQuery.getBalance(accounts[0].address, function(err, result) {
          if (err) return console.error(err);

          accounts[0].balance = (parseInt(result, 16) / 1e18).toFixed(2);

          that.setState({
            accounts: accounts,
            loading: false
          });
        });
      });
    };

    //updateAccounts();
    setInterval(updateAccounts, 3000);
  }

  render() {
    return (
      <Loadable active={true} spinner text="Loading your content...">
        <p>Some content or children or something.</p>
        <div className={s.root}>
          <div className={s.container}>
            <h1> Welcome </h1>
            <Loading isLoading={this.state.loading} />
            {this.state.accounts.length > 0 ? (
              <Accounts accounts={this.state.accounts} />
            ) : null}
          </div>
        </div>
      </Loadable>
    );
  }
}

export default withStyles(s)(Home2);
