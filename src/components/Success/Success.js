import React from 'react';

class Success extends React.Component {
    
    getClass(success) {
        if (success === true)
            return "glyphicon glyphicon-ok-circle";

        return "glyphicon glyphicon-remove-circle";
    }

    getStyle(success) {
        if (success === true)
            return { color: 'green' };

        return { color: 'red' };
    }

    render() {
        return (<span style={this.getStyle(this.props.success)}><i className={this.getClass(this.props.success)}/></span>);
    }
}

export default Success;
