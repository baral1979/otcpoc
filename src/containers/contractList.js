import React, { Component } from 'React';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import actions from '../actions';
import Card from '../components/Card';
import { Grid, Row, Col, Table } from 'react-bootstrap';
import ethConnect from '../helpers/eth';
import OTC from '../helpers/otc';

class ContractList extends Component {

  componentDidMount() {
    this.props.setContracts([]);

    try {
      var client = new ethConnect();
      client.getContracts(OTC.spawnContract.abi, OTC.spawnContract.address).then(data => {
        var addresses = data[0];
        var contracts = [];
        for (var i = 0; i < addresses.length; i++) {
          var address = addresses[i];

          client.getContractTicket(OTC.epayContract.abi, address)
          .then(data => {
            console.log('selected contract', data);
            this.props.addContract(data);

            //this.setState({ selectedContract: data });
          });

        }

      }).catch(err => {
        console.log('contract error', err);
        this.props.setContracts([]);
      });
    } catch (e) {

    }
  }


  render() {
    const thArray = ["Address","Description","State"];
    const tdArray = [
        [ "1" , "Dakota Rice" , "$36,738" , "Niger" , "Oud-Turnhout" ] ,
        [ "2" , "Minerva Hooper" , "$23,789" , "Curaçao" , "Sinaai-Waas" ] ,
        [ "3" , "Sage Rodriguez" , "$56,142" , "Netherlands" , "Baileux" ] ,
        [ "4" , "Philip Chaney" , "$38,735" , "Korea, South" , "Overland Park" ] ,
        [ "5" , "Doris Greene" , "$63,542" , "Malawi" , "Feldkirchen in Kärnten" ] ,
        [ "6" , "Mason Porter" , "$78,615" , "Chile" , "Gloucester" ]
    ];



    return (
      <Grid fluid>
                    <Row>
                        <Col md={8}>
                            <Card
                                title={this.props.contracts && this.props.contracts.length > 0 ? `Contracts (${this.props.contracts.length})` : 'Loading contracts...'}
                                category="List of OTC contracts"
                                ctTableFullWidth ctTableResponsive
                                content={
                                    <Table striped hover>
                                        <thead>
                                            <tr>
                                                {
                                                    thArray.map((prop, key) => {
                                                        return (
                                                          <th  key={key}>{prop}</th>
                                                        );
                                                    })
                                                }
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.props.contracts.map((contract,key) => {
                                                    return (
                                                        <tr key={key}>
                                                          <td>{contract.address}</td>
                                                          <td>{contract.description}</td>
                                                          <td>{contract.stateText}</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </Table>
                                }
                            />
                        </Col>


                        <Col md={4}>
                            <Card
                                plain
                                title="Selected Contract Data"
                                category="Current contract: "
                                ctTableFullWidth ctTableResponsive
                                content={
                                    <Table hover>
                                        <thead>
                                            <tr>
                                                {
                                                    thArray.map((prop, key) => {
                                                        return (
                                                        <th  key={key}>{prop}</th>
                                                        );
                                                    })
                                                }
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                tdArray.map((prop,key) => {
                                                    return (
                                                        <tr key={key}>{
                                                            prop.map((prop,key)=> {
                                                                return (
                                                                    <td  key={key}>{prop}</td>
                                                                );
                                                            })
                                                        }</tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </Table>
                                }
                            />
                        </Col>

                    </Row>
                </Grid>

    );
  }
}

function mapStateToProps(state) {
  return {
    contracts: state.contracts.items
  };
}

function mapDispatchToProps(dispath) {
  return bindActionCreators( { setContracts: actions.setContracts, addContract: actions.addContract }, dispath);
}

export default connect(mapStateToProps, mapDispatchToProps)(ContractList);
