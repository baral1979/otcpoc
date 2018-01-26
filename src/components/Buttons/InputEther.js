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
    this.didSwitchParentObject = true;
      this.state ={ initialValue: 0 };
  }

  handleChange(e) {
    if (this.props.valueChange)
      this.props.valueChange(e.target.value * 1000000000000000000 / 1000);
  }

  componentDidUpdate ()
	{
	    if (this.didSwitchParentObject) {
	        this.didSwitchParentObject= false;
	        this.setState({ initialValue: this.props.value });
	        this.refs.input.value = this.props.value / 1000000000000000000 * 1000;
	    }
  }

  componentDidMount() {
      var self = this;
      setTimeout(function() {
          if (self.props.valueChange)
              self.props.valueChange(self.state.initialValue);
      }, 100)
       
   }

  render() {
    return (
      <div className="input-group">
        <input
          onChange={this.handleChange.bind(this)}
          type="number"
          className="form-control"
          ref="input"
        />
        <span className="input-group-addon">Finney</span>
      </div>
    );
  }
}

export default InputEther;
