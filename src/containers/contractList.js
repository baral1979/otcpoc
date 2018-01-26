import React, { Component } from 'React';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import actions from '../actions';
import Card from '../components/Card';
import Eth from '../components/Eth';
import Address from '../components/Address';
import { Alert, Grid, Row, Col, Table } from 'react-bootstrap';
import ethConnect from '../helpers/eth';
import OTC from '../helpers/otc';
import CreateContract from '../components/Buttons/CreateContract'
import LeaseAny from '../components/Buttons/LeaseAny'
import LeaseContract from '../components/Buttons/LeaseContract'
import AcceptOffer from '../components/Buttons/AcceptOffer'
import CancelOffer from '../components/Buttons/CancelOffer'
import DefineSettlement from '../components/Buttons/DefineSettlement'
import PostContingentPaymentContract from '../components/Buttons/PostContingentPaymentContract'
import Trx from '../components/Trx';

class ContractList extends Component {

  refreshContracts(selectAddress) {
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
            if (selectAddress && data.address === selectAddress)
              this.props.selectContract(data);

            this.props.addContract(data);
          });
        }



      }).catch(err => {
        console.log('contract error', err);
        this.props.setContracts([]);
      });
    } catch (e) {

    }
  }

  componentDidMount() {
    this.refreshContracts();
  }

  rowClick(contract) {
    this.props.selectContract(contract);
  }

  epayContract(client) {

    if (this.props.selectedContract && client)
    {
      return client.getContract(
        OTC.epayContract.abi,
        this.props.selectedContract.address
      );
    }

    return null;
  }

  cancelOffer(data) {
      const self = this;
      var client = new ethConnect();

      const contract = this.epayContract(client);

      if (contract) {
          const promise = contract.abort({
              from: data.seller,
              gasLimit: 90000,
              gasPrice: 200000000000,
          });

          promise
            .then(response => {
                //self.refreshContracts(response);
                self.props.addNotification({ style: 'success', title: 'Post Contingent Payment Contract Success', message: 'Contingent Payment Contract was successully posted. Waiting for the transaction to be mined.'})
                self.props.addTransaction(response);
            })
            .catch(err => {console.log(err); self.props.addNotification({ style: 'danger', title: 'Post Contingent Payment Contract Error', message: `An error has occured. ${err}`}) });
      }
  }

  purchaseContract(data) {
      const self = this;
      var client = new ethConnect();

      const contract = this.epayContract(client);

      if (contract) {
          const promise = contract.confirmPurchase({
              from: data.buyer,
              value: data.price,
              gasLimit: 90000,
              gasPrice: 200000000000,
          });

          promise
            .then(response => {
                //self.refreshContracts(response);
                self.props.addNotification({ style: 'success', title: 'Post Contingent Payment Contract Success', message: 'Contingent Payment Contract was successully posted. Waiting for the transaction to be mined.'})
                self.props.addTransaction(response);
            })
            .catch(err => {console.log(err); self.props.addNotification({ style: 'danger', title: 'Post Contingent Payment Contract Error', message: `An error has occured. ${err}`}) });
      }
  }

  postContingentPaymentContract(data) {
    const self = this;
    var client = new ethConnect();

    const contract = this.epayContract(client);

    if (contract) {
      const promise = contract.confirmOffer(data.settler, data.enter, {
        from: data.seller,
        value: data.bid,
        gasLimit: 2000000,
        gasPrice: 200000000000,
      });

      promise
        .then(response => {
          //self.refreshContracts(response);
          self.props.addNotification({ style: 'success', title: 'Post Contingent Payment Contract Success', message: 'Contingent Payment Contract was successully posted. Waiting for the transaction to be mined.'})
          self.props.addTransaction(response);
        })
        .catch(err => {console.log(err); self.props.addNotification({ style: 'danger', title: 'Post Contingent Payment Contract Error', message: `An error has occured. ${err}`}) });
    }
  }

  postSettlementContract(data) {
      console.log('postSettlementContract', data);
    const self = this;
    var client = new ethConnect();

    const contract = this.epayContract(client);

    if (contract) {
      const promise = contract.defineSettlement(data.fee, web3.fromAscii(data.settlement), {
        from: data.seller,
        gasLimit: 90000,
        gasPrice: 200000000000,
      });

      promise
        .then(response => {
          //TODO: Change description...
          self.refreshContracts(response);
          self.props.addNotification({ style: 'success', title: 'Define Settlement Contract', message: 'Settlement contract was successully defined. Waiting for the transaction to be mined.'})
          self.props.addTransaction(response);
        })
        .catch(err => {console.log(err); self.props.addNotification({ style: 'danger', title: 'Define Settlement Contract Error', message: `An error has occured. ${err}`}) });
    }
  }

  leaseContract(data) {
    alert(data.rent);
    const self = this;
    var client = new ethConnect();

    const contract = this.epayContract(client);

    if (contract) {
      const promise = contract.lease({
        from: data.leaser,
        value: data.rent,
        gasLimit: 90000,
        gasPrice: 200000000000,
      });

      promise
        .then(response => {
          //self.refreshContracts(response);
          self.props.addNotification({ style: 'success', title: 'Lease contract', message: 'Contract was successully leased. Waiting for the transaction to be mined.'})
          self.props.addTransaction(response);
        })
        .catch(err => {console.log(err); self.props.addNotification({ style: 'danger', title: 'Lease contract', message: `Lease contract failed. ${err}`}) });
    }
  }

  createContract(data) {
    const self = this;
    var client = new ethConnect();

    const contract = client.getContract(
      OTC.spawnContract.abi,
      OTC.spawnContract.address,
    );

    if (contract) {
      const promise = contract.createContract(
        parseInt(data.rent) * 1000000000000000,
        data.address,
        web3.fromAscii('undefined'),
        {
          from: data.address,
          gas: 2000000,
          gasPrice: 20000000000,
        },
      );

      promise
        .then(response => {
          self.refreshContracts(response);
          self.props.addNotification({ style: 'success', title: 'New contract', message: 'Contract was successully created. Waiting for the transaction to be mined.'})
          self.props.addTransaction(response);
        })
        .catch(err => self.props.addNotification({ style: 'danger', title: 'New contract', message: `Contract creation failed. ${err}`}));
    }
  }

  removeTransaction(trx) {
    this.props.removeTransaction(trx);
  }

  removeNotification(notif) {
    this.props.removeNotification(notif);
  }

  //<CreateContract success={this.createContract.bind(this)} disabled={this.props.user.address.indexOf("0x") !== 0} address={this.props.user.address} />
  //<LeaseAny success={this.createContract.bind(this)} disabled={this.props.user.address.indexOf("0x") !== 0} contracts={this.props.contracts.filter(x => {return x.contractState == 1; })} />


  render() {
    const thArray = ["Address","Description","State"];

    var options = {
      selectOnClick: true,
    }

    var SelectedContract = function(props) {
      if (props.contract) {
        return (<Card
            plain
            title={props.contract.address}
            category={`${props.contract.stateText} - ${props.contract.description}`}
            ctTableFullWidth ctTableResponsive
            content={
                <Table hover>
                    <thead>
                        <tr>
                          <th>Variable</th>
                          <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                          <td>Value</td>
                          <td><Eth wei={props.contract.value}/></td>
                        </tr>
                        <tr>
                          <td>Rent</td>
                          <td><Eth wei={props.contract.rent}/></td>
                        </tr>
                        <tr>
                          <td>Owner</td>
                          <td><Address address={props.contract.owner} showBalance={true}/></td>
                        </tr>
                        <tr>
                          <td>Seller</td>
                          <td><Address address={props.contract.seller} showBalance={true}/></td>
                        </tr>
                        <tr>
                          <td>Buyer</td>
                          <td><Address address={props.contract.buyer} showBalance={true}/></td>
                        </tr>
                    </tbody>
                </Table>
            }
        />)
      }

      return null;
    }

    return (
          <Grid fluid>
                    <Row>
                        <Col md={12}>
                            {this.props.notifications.map(n => {
                              return (
                                <Alert onDismiss={this.removeNotification.bind(this, n)} bsStyle={n.style}><h4>{n.title}</h4>{n.message}</Alert>
                              );
                            })}
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            {this.props.transactions.map(t => {
                              return (
                                <Alert onDismiss={this.removeTransaction.bind(this, t)} bsStyle="info"><Trx showSpinner={true} tx={t}/></Alert>
                              );
                            })}
                        </Col>
                    </Row>
                    <Row>
                      <Col md={12}>
                          <CreateContract success={this.createContract.bind(this)} disabled={this.props.user.address.indexOf("0x") !== 0} address={this.props.user.address} />
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12}>
                        <br/>
                      </Col>
                    </Row>
                    <Row>
                        <Col md={8}>
                            <Card
                                title={this.props.contracts && this.props.contracts.length > 0 ? `Contracts (${this.props.contracts.length})` : 'Loading contracts...'}
                                category="OTC Contracts"
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
                                                        <tr style={contract === this.props.selectedContract?{background: '#87cb16'}: {}}  onClick={this.rowClick.bind(this, contract)} key={key}>
                                                          <td>{contract.address}</td>
                                                          <td>{contract.description.toString()}</td>
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
                            <SelectedContract contract={this.props.selectedContract}/>
                            <LeaseContract contract={this.props.selectedContract} success={this.leaseContract.bind(this)} disabled={this.props.user.address.indexOf("0x") !== 0} address={this.props.user.address}/>
                            <AcceptOffer contract={this.props.selectedContract} success={this.purchaseContract.bind(this)} disabled={this.props.user.address.indexOf("0x") !== 0} address={this.props.user.address}/>
                            <CancelOffer contract={this.props.selectedContract} success={this.cancelOffer.bind(this)} disabled={this.props.user.address !== (this.props.contract ? this.props.contract.seller: "none")} address={this.props.user.address}/>
                            <DefineSettlement contract={this.props.selectedContract} success={this.postSettlementContract.bind(this)} disabled={this.props.user.address.indexOf("0x") !== 0} />
                            <PostContingentPaymentContract settlers={this.props.contracts.filter(x => {return x.contractState == 6; })} contract={this.props.selectedContract} success={this.postContingentPaymentContract.bind(this)} disabled={this.props.user.address.indexOf("0x") !== 0} />


                        </Col>
                    </Row>
                </Grid>
    );
  }
}

function mapStateToProps(state) {
  return {
    contracts: state.contracts.items,
    selectedContract: state.contracts.selected,
    user: state.user,
    transactions: state.transactions.items,
    notifications: state.notifications.items
  };
}

function mapDispatchToProps(dispath) {
  return bindActionCreators({
    removeTransaction: actions.removeTransaction,
    addTransaction: actions.addTransaction,
    selectContract: actions.selectContract,
    setContracts: actions.setContracts,
    addContract: actions.addContract,
    addNotification: actions.addNotification,
    removeNotification: actions.removeNotification
  }, dispath);
}

export default connect(mapStateToProps, mapDispatchToProps)(ContractList);
