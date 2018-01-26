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

class ModalButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModel: false
    };
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
      this.setState({ showModal: true });
  }

  setRent(e) {
    this.setState({ rent: e.target.value });
  }

  ok() {
    if (this.props.success)
    {
      this.props.success();
    }

    this.setState({ showModal: false});
  }

  render() {

    function OkButton(props) {
        if (props.show === false)
            return null;

        return (
                <Button className="btn-success" onClick={props.onClick.bind(this)}>
                  OK
                </Button>
            );
    }

    if (this.props.visible === false)
      return null;

    return (
      <div style={{display:'block','margin-right': '1px', float: 'left'}}>
        <Button disabled={this.props.disabled} bsStyle={this.props.bsStyle} bsSize={this.props.bsSize} onClick={this.open.bind(this)}>
          {this.props.buttonText}
        </Button>

        <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
          <Modal.Header>
            <Modal.Title>{this.props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.props.content}
          </Modal.Body>
          <Modal.Footer>
            <OkButton show={this.props.showOk} onClick={this.ok.bind(this)}/>
            <Button onClick={this.close.bind(this)}>Cancel</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default ModalButton;
