import {
  OverlayTrigger,
  Modal,
  Button,
  Popover,
  Tooltip,
  FormControl,
} from 'react-bootstrap';
import React from 'react';
import ReactDOM from 'react-dom';

class InputEther extends React.Component {
  constructor(props) {
    super(props);
  }

  handleChange(e) {
    if (this.props.valueChange)
      this.props.valueChange(e.target.value * 1000000000000000000 / 1000);
  }

  render() {
    return (
      <div className="input-group">
        <input
          onChange={this.handleChange.bind(this)}
          type="number"
          className="form-control"
        />
        <span className="input-group-addon">Finney</span>
      </div>
    );
  }
}

export default InputEther;
