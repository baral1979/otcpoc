import React from "react";
import PropTypes from "prop-types";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./Accounts.css";

class Accounts extends React.Component {
  static propTypes = {
    accounts: PropTypes.array
  };

  render() {
    return (
      <div>
        <h3>Accounts</h3>
        {this.props.accounts.map(item => (
          <p key="{item.address}">{item.address} <span className="balance">{item.balance} ether</span></p>
        ))}
      </div>
    );
  }
}

export default withStyles(s)(Accounts);
