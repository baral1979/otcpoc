import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Loader.css';

class LoadingPage extends React.Component {
  render() {
    return (
      <div>
        <div className={s.face}>
          <div className={s.container}>
            <img
              src="http://otccontracts.com/wp-content/uploads/2017/10/logo.png"
              width="96px"
              height="96px"
            />
            <span className={s.loading} />
            <div className={s.caption}>
              <h2>CONDUIT P2P</h2>
              <ul>
                <li>L</li>
                <li>O</li>
                <li>A</li>
                <li>D</li>
                <li>I</li>
                <li>N</li>
                <li>G</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export { LoadingPage as ErrorPageWithoutStyle };
export default withStyles(s)(LoadingPage);
