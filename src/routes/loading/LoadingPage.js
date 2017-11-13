import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './LoadingPage.css';

class LoadingPage extends React.Component {
  static propTypes = {
    error: PropTypes.shape({
      name: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
      stack: PropTypes.string.isRequired,
    }),
  };

  static defaultProps = {
    error: null,
  };

  render() {
    if (__DEV__ && this.props.error) {
      return (
        <div>
          <h1>
            {this.props.error.name}
          </h1>
          <pre>
            {this.props.error.stack}
          </pre>
        </div>
      );
    }

    return (
      <div>
        <div className={s.face}>
          <div className={s.container}>
            <img src='http://otccontracts.com/wp-content/uploads/2017/10/logo.png' width= '96px' height= '96px'/>
            <span className={s.loading}></span>
            <div className={s.caption}>
              <h2>OTC CONTRACTS</h2>
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
