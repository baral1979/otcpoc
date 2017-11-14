import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Error.css';

class Error extends React.Component {

  render() {
        return (
          <div className={s.containerWrapper}>
            <div className={s.container}>
            <h1>Error</h1>

            <p>Sorry, a critical error occurred on this page.</p>
            <p>It looks like your browser cannot access the <b>Ethereum</b> network.</p>
            <p>Make sure to you are using <span className={s.softwareLink}><a href="https://www.google.com/chrome/">Google Chrome</a></span>
               &nbsp;and that you have installed and activated <span className={s.softwareLink}><a href="https://metamask.io/">Metamask</a></span>

            </p>

          </div>
          </div>
        );
  }
}

export default withStyles(s)(Error);
