import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

class Eth extends React.Component {
  constructor(props) {
    super(props);

    this.etherFormat = {
      name: 'Ether',
      conversion: 1e18,
    };

    this.format = this.etherFormat;

    this.formats = [
      {
        name: 'Szabo',
        conversion: 1e12,
      },
      {
        name: 'Finney',
        conversion: 1e15,
      },
      this.etherFormat,
      {
        name: 'Kether',
        conversion: 1 / 1000,
      },
    ];
    //

    const formats = this.formats.filter(
      x => x.name.toLowerCase() === props.format.toLowerCase(),
    );
    if (formats.length > 0) this.format = formats[0];
  }

  static propTypes = {
    wei: PropTypes.number.isRequired,
    format: PropTypes.string,
  };

  static defaultProps = {
    wei: 0,
    format: 'Ether',
  };

  getHint() {
    return this.applyFormat(this.props.wei, this.etherFormat);
  }

  applyFormat(wei, _format) {
    if (!_format) _format = this.format;

    return `${wei / _format.conversion} ${_format.name}`;
  }

  render() {
    const tooltip = (
      <Tooltip id="tooltip">
        {this.getHint()}
      </Tooltip>
    );
    return (
      <OverlayTrigger placement="top" overlay={tooltip}>
        <span>
          {this.applyFormat(this.props.wei)}
        </span>
      </OverlayTrigger>
    );
  }
}

export default Eth;
