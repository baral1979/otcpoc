import React, { Component } from 'React';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';
import Card from '../components/Card';
import Eth from '../components/Eth';
import Address from '../components/Address';
import { Alert, Grid, Row, Col, Table } from 'react-bootstrap';
import ethConnect from '../helpers/eth';
import OTC from '../helpers/otc';
import CreateContract from '../components/Buttons/CreateContract';
import LeaseAny from '../components/Buttons/LeaseAny';
import ClaimBalance from '../components/Buttons/ClaimBalance';
import TradeContract from '../components/Buttons/TradeContract';
import ChangeTradeContract from '../components/Buttons/ChangeTradeContract';
import ConfirmTradeContract from '../components/Buttons/ConfirmTradeContract';
import CancelTradeContract from '../components/Buttons/CancelTradeContract';
import SetRent from '../components/Buttons/SetRent';
import LeaseContract from '../components/Buttons/LeaseContract';
import AcceptOffer from '../components/Buttons/AcceptOffer';
import CancelOffer from '../components/Buttons/CancelOffer';
import DefineSettlement from '../components/Buttons/DefineSettlement';
import PostContingentPaymentContract from '../components/Buttons/PostContingentPaymentContract';
import PostResult1 from '../components/Buttons/PostResult1';
import Settle from '../components/Buttons/Settle';
import CollectFee from '../components/Buttons/CollectFee';
import Trx from '../components/Trx';
import ChangeBuyerPositionPrice from '../components/Buttons/ChangeBuyerPositionPrice';
import ChangeSellerPositionPrice from '../components/Buttons/ChangeSellerPositionPrice';
import PurchaseBuyerPosition from '../components/Buttons/PurchaseBuyerPosition';
import PurchaseSellerPosition from '../components/Buttons/PurchaseSellerPosition';

class ContractList extends Component {
  refreshContracts(selectAddress) {
    this.props.setContracts([]);

    try {
      const client = new ethConnect();
      client
        .getContracts(OTC.spawnContract.abi, OTC.spawnContract.address)
        .then(data => {
          const addresses = data[0];
          const contracts = [];

          for (let i = 0; i < addresses.length; i++) {
            const address = addresses[i];

            client
              .getContractTicket(OTC.epayContract.abi, address)
              .then(data => {
                if (selectAddress && data.address === selectAddress)
                  this.props.selectContract(data);

                this.props.addContract(data);
              });
          }
        })
        .catch(err => {
          console.log('contract error', err);
          this.props.setContracts([]);
        });
    } catch (e) {}
  }

  componentDidMount() {
    this.refreshContracts();
  }

  rowClick(contract) {
    this.props.selectContract(contract);
  }

  epayContract(client) {
    if (this.props.selectedContract && client) {
      return client.getContract(
        OTC.epayContract.abi,
        this.props.selectedContract.address,
      );
    }

    return null;
  }



  descriptionGet(data) {
    const self = this;
    if (data.contractState == 3 || data.contractState == 4) {
      for (let i = 0; i < this.props.contracts.length; i++) {
        if (this.props.contracts[i].address == data.set) {
          return this.props.contracts[i].description.toString();
        }
      }
    }
      return data.description.toString();
  }

  cancelOffer(data) {
    const self = this;
    const client = new ethConnect();

    const contract = this.epayContract(client);

    if (contract) {
      const promise = contract.abort({
        from: data.seller,
        gasLimit: 90000,
        gasPrice: 200000000000,
      });

      promise
        .then(response => {
          // self.refreshContracts(response);
          self.props.addNotification({
            style: 'success',
            title: 'Post Contingent Payment Contract Success',
            message:
              'Contingent Payment Contract was successully posted. Waiting for the transaction to be mined.',
          });
          self.props.addTransaction(response);
        })
        .catch(err => {
          console.log(err);
          self.props.addNotification({
            style: 'danger',
            title: 'Post Contingent Payment Contract Error',
            message: `An error has occured. ${err}`,
          });
        });
    }
  }

  purchaseContract(data) {
    const self = this;
    const client = new ethConnect();
    alert(data.buyer);
    alert(data.price);
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
          // self.refreshContracts(response);
          self.props.addNotification({
            style: 'success',
            title: 'Purchase Contract',
            message:
              'Purchase transation was posted. Waiting for the transaction to be mined.',
          });
          self.props.addTransaction(response);
        })
        .catch(err => {
          console.log(err);
          self.props.addNotification({
            style: 'danger',
            title: 'Purchase Contract Error',
            message: `An error has occured. ${err}`,
          });
        });
    }
  }

  postContingentPaymentContract(data) {
    // alert(data.settler);
    // return;
    console.log('postCPC', data);
    const self = this;
    const client = new ethConnect();

    const contract = this.epayContract(client);

    if (contract) {
      const promise = contract.confirmOffer(data.settler, data.enter, {
        from: data.seller,
        value: data.bid,
        gasLimit: 100000,
        gasPrice: 200000000000,
      });

      promise
        .then(response => {
          // self.refreshContracts(response);
          self.props.addNotification({
            style: 'success',
            title: 'Post Contingent Payment Contract Success',
            message:
              'Contingent Payment Contract was successully posted. Waiting for the transaction to be mined.',
          });
          self.props.addTransaction(response);

          alert(contract.address);
        })
        .catch(err => {
          console.log(err);
          self.props.addNotification({
            style: 'danger',
            title: 'Post Contingent Payment Contract Error',
            message: `An error has occured. ${err}`,
          });
        });
    }
  }

  postSettlementContract(data) {
    console.log('postSettlementContract', data);
    const self = this;
    const client = new ethConnect();

    const contract = this.epayContract(client);

    if (contract) {
      const promise = contract.defineSettlement(
        data.fee,
        web3.fromAscii(data.settlement),
        {
          from: data.seller,
          gasLimit: 90000,
          gasPrice: 200000000000,
        },
      );

      promise
        .then(response => {
          // TODO: Change description...
          self.refreshContracts(response);
          self.props.addNotification({
            style: 'success',
            title: 'Define Settlement Contract',
            message:
              'Settlement contract was successully defined. Waiting for the transaction to be mined.',
          });
          self.props.addTransaction(response);
        })
        .catch(err => {
          console.log(err);
          self.props.addNotification({
            style: 'danger',
            title: 'Define Settlement Contract Error',
            message: `An error has occured. ${err}`,
          });
        });
    }
  }

  postResult(data) {
    console.log('postResult', data);
    const self = this;
    const client = new ethConnect();

    const contract = this.epayContract(client);

    if (contract) {
      const promise = contract.postResult(data.result, {
        from: data.seller,
        gasLimit: 90000,
        gasPrice: 200000000000,
      });

      promise
        .then(response => {
          // TODO: Change description...
          self.refreshContracts(response);
          self.props.addNotification({
            style: 'success',
            title: 'Post Result',
            message:
              'Result was successully posted. Waiting for the transaction to be mined.',
          });
          self.props.addTransaction(response);
        })
        .catch(err => {
          console.log(err);
          self.props.addNotification({
            style: 'danger',
            title: 'Post Result to Settlement Contract Error',
            message: `An error has occured. ${err}`,
          });
        });
    }
  }

  collectFee(data) {
    const self = this;
    const client = new ethConnect();

    const contract = this.epayContract(client);

    if (contract) {
      const promise = contract.collectFee({
        from: data.seller,
        gasLimit: 90000,
        gasPrice: 200000000000,
      });

      promise
        .then(response => {
          // self.refreshContracts(response);
          self.props.addNotification({
            style: 'success',
            title: 'Collected Fees Reset Contract to Initial',
            message:
              'Settlement Contract was successully reset and fees collected. Waiting for the transaction to be mined.',
          });
          self.props.addTransaction(response);
        })
        .catch(err => {
          console.log(err);
          self.props.addNotification({
            style: 'danger',
            title: 'Settlement Contract Error',
            message: `An error has occured. ${err}`,
          });
        });
    }
  }

  settle(data) {
    console.log('Settle', data);
    const self = this;
    const client = new ethConnect();
    const cpc = this.epayContract(client);

    const contract = client.getContract(OTC.epayContract.abi, data.settler);

    if (contract) {
      const promise = contract.settle(cpc.address, {
        from: data.buyer,
        value: data.fee,
        gasLimit: 90000,
        gasPrice: 200000000000,
      });

      promise
        .then(response => {
          // TODO: Change description...
          self.refreshContracts(response);
          self.props.addNotification({
            style: 'success',
            title: 'Settle',
            message:
              'Settlement requested. Waiting for the transaction to be mined.',
          });
          self.props.addTransaction(response);
        })
        .catch(err => {
          console.log(err);
          self.props.addNotification({
            style: 'danger',
            title: 'Settlement Request Error',
            message: `An error has occured. ${err}`,
          });
        });
    }
  }

  claimBalance(data) {
    const self = this;
    const client = new ethConnect();

    const contract = this.epayContract(client);

    if (contract) {
      const promise = contract.claimBalance({
        from: data.owner,
        gasLimit: 90000,
        gasPrice: 200000000000,
      });

      promise
        .then(response => {
          // self.refreshContracts(response);
          self.props.addNotification({
            style: 'success',
            title: 'Collected Rent Reset Contract to Initial',
            message:
              'Contract was successully reset and rent collected. Waiting for the transaction to be mined.',
          });
          self.props.addTransaction(response);
        })
        .catch(err => {
          console.log(err);
          self.props.addNotification({
            style: 'danger',
            title: 'Contract Error',
            message: `An error has occured. ${err}`,
          });
        });
    }
  }
  tradeContract(data) {
    const self = this;
    const client = new ethConnect();

    const contract = this.epayContract(client);

    if (contract) {
      const promise = contract.tradeContract(
        parseInt(data.price) * 1000000000000000,
        {  from: data.address,
          gas: 2000000,
          gasPrice: 20000000000,
        }
      );

      promise
        .then(response => {
          self.refreshContracts(response);
          self.props.addNotification({
            style: 'success',
            title: 'Contract offered for sale',
            message:
              'Contract was offered for sale changed. Waiting for the transaction to be mined.',
          });
          self.props.addTransaction(response);
        })
        .catch(err =>
          self.props.addNotification({
            style: 'danger',
            title: 'Contract offered for sale',
            message: `Change failed. ${err}`,
          }),
        );
    }
  }
  changeTradeContract(data) {
    const self = this;
    const client = new ethConnect();

    const contract = this.epayContract(client);

    if (contract) {
      const promise = contract.changeContractTrade(
        parseInt(data.price) * 1000000000000000,
        {  from: data.address,
          gas: 2000000,
          gasPrice: 20000000000,
        }
      );

      promise
        .then(response => {
          self.refreshContracts(response);
          self.props.addNotification({
            style: 'success',
            title: 'Change offer price',
            message:
              'The contract offer price was changed. Waiting for the transaction to be mined.',
          });
          self.props.addTransaction(response);
        })
        .catch(err =>
          self.props.addNotification({
            style: 'danger',
            title: 'Change offer price',
            message: `Change failed. ${err}`,
          }),
        );
    }
  }

  cancelTradeContract(data) {
    const self = this;
    const client = new ethConnect();

    const contract = this.epayContract(client);

    if (contract) {
      const promise = contract.cancelContractTrade(
        {  from: data.address,
          gas: 2000000,
          gasPrice: 20000000000,
        }
      );

      promise
        .then(response => {
          self.refreshContracts(response);
          self.props.addNotification({
            style: 'success',
            title: 'Cancel offer',
            message:
              'Contract offer canceled. Waiting for the transaction to be mined.',
          });
          self.props.addTransaction(response);
        })
        .catch(err =>
          self.props.addNotification({
            style: 'danger',
            title: 'Cancel offer',
            message: `Change failed. ${err}`,
          }),
        );
    }
  }

  confirmTradeContract(data) {
    const self = this;
    const client = new ethConnect();

    const contract = this.epayContract(client);

    if (contract) {
      const promise = contract.confirmContractTrade(
        { from: data.buyer,
          value: data.price,
          gas: 2000000,
          gasPrice: 20000000000
        }
      );

      promise
        .then(response => {
          self.refreshContracts(response);
          self.props.addNotification({
            style: 'success',
            title: 'Purchase Contract',
            message:
              'Purchase order is posted. Waiting for the transaction to be mined.',
          });
          self.props.addTransaction(response);
        })
        .catch(err =>
          self.props.addNotification({
            style: 'danger',
            title: 'Purchase Contract',
            message: `Change failed. ${err}`,
          }),
        );
    }
  }
  changeBuyerPositionPrice(data) {
    const self = this;
    const client = new ethConnect();

    const contract = this.epayContract(client);

    if (contract) {
      const promise = contract.tradeBuyer(
        parseInt(data.price) * 1000000000000000,
        {  from: data.address,
          gas: 2000000,
          gasPrice: 20000000000,
        }
      );

      promise
        .then(response => {
          self.refreshContracts(response);
          self.props.addNotification({
            style: 'success',
            title: 'Change offer price',
            message:
              'The contract offer price was changed. Waiting for the transaction to be mined.',
          });
          self.props.addTransaction(response);
        })
        .catch(err =>
          self.props.addNotification({
            style: 'danger',
            title: 'Change offer price',
            message: `Change failed. ${err}`,
          }),
        );
    }
  }
  purchaseBuyerPosition(data) {
    const self = this;
    const client = new ethConnect();

    const contract = this.epayContract(client);

    if (contract) {
      const promise = contract.confirmBuyerTrade(
        { from: data.buyer,
          value: data.price,
          gas: 2000000,
          gasPrice: 20000000000,
        }
      );

      promise
        .then(response => {
          self.refreshContracts(response);
          self.props.addNotification({
            style: 'success',
            title: 'Purchase Buyer Position',
            message:
              'The purchase order was placed. Waiting for the transaction to be mined.',
          });
          self.props.addTransaction(response);
        })
        .catch(err =>
          self.props.addNotification({
            style: 'danger',
            title: 'Purchase Buyer Position',
            message: `Purchase failed. ${err}`,
          }),
        );
    }
  }
  changeSellerPositionPrice(data) {
    const self = this;
    const client = new ethConnect();

    const contract = this.epayContract(client);

    if (contract) {
      const promise = contract.tradeSeller(
        parseInt(data.price) * 1000000000000000,
        {  from: data.address,
          gas: 2000000,
          gasPrice: 20000000000,
        }
      );

      promise
        .then(response => {
          self.refreshContracts(response);
          self.props.addNotification({
            style: 'success',
            title: 'Change offer price',
            message:
              'The contract offer price was changed. Waiting for the transaction to be mined.',
          });
          self.props.addTransaction(response);
        })
        .catch(err =>
          self.props.addNotification({
            style: 'danger',
            title: 'Change offer price',
            message: `Change failed. ${err}`,
          }),
        );
    }
  }
  purchaseSellerPosition(data) {
    const self = this;
    const client = new ethConnect();

    const contract = this.epayContract(client);

    if (contract) {
      const promise = contract.confirmSellerTrade(
        { from: data.seller,
          value: data.price,
          gas: 2000000,
          gasPrice: 20000000000,
        }
      );

      promise
        .then(response => {
          self.refreshContracts(response);
          self.props.addNotification({
            style: 'success',
            title: 'Purchase Seller Position',
            message:
              'The purchase order was placed. Waiting for the transaction to be mined.',
          });
          self.props.addTransaction(response);
        })
        .catch(err =>
          self.props.addNotification({
            style: 'danger',
            title: 'Purchase Seller Position',
            message: `Purchase failed. ${err}`,
          }),
        );
    }
  }
  setRent(data) {
    const self = this;
    const client = new ethConnect();

    const contract = this.epayContract(client);

    if (contract) {
      const promise = contract.setRent(
        parseInt(data.rent) * 1000000000000000,
        {  from: data.address,
          gas: 2000000,
          gasPrice: 20000000000,
        }
      );

      promise
        .then(response => {
          self.refreshContracts(response);
          self.props.addNotification({
            style: 'success',
            title: 'New rent',
            message:
              'Rent was changed. Waiting for the transaction to be mined.',
          });
          self.props.addTransaction(response);
        })
        .catch(err =>
          self.props.addNotification({
            style: 'danger',
            title: 'Rent changed',
            message: `Change failed. ${err}`,
          }),
        );
    }
  }

  leaseContract(data) {
    alert(data.rent);
    const self = this;
    const client = new ethConnect();

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
          // self.refreshContracts(response);
          self.props.addNotification({
            style: 'success',
            title: 'Lease contract',
            message:
              'Contract was successully leased. Waiting for the transaction to be mined.',
          });
          self.props.addTransaction(response);
        })
        .catch(err => {
          console.log(err);
          self.props.addNotification({
            style: 'danger',
            title: 'Lease contract',
            message: `Lease contract failed. ${err}`,
          });
        });
    }
  }

  createContract(data) {
    const self = this;
    const client = new ethConnect();

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
          self.props.addNotification({
            style: 'success',
            title: 'New contract',
            message:
              'Contract was successully created. Waiting for the transaction to be mined.',
          });
          self.props.addTransaction(response);
        })
        .catch(err =>
          self.props.addNotification({
            style: 'danger',
            title: 'New contract',
            message: `Contract creation failed. ${err}`,
          }),
        );
    }
  }

  removeTransaction(trx) {
    this.props.removeTransaction(trx);
  }

  removeNotification(notif) {
    this.props.removeNotification(notif);
  }

  // <CreateContract success={this.createContract.bind(this)} disabled={this.props.user.address.indexOf("0x") !== 0} address={this.props.user.address} />
  // <LeaseAny success={this.createContract.bind(this)} disabled={this.props.user.address.indexOf("0x") !== 0} contracts={this.props.contracts.filter(x => {return x.contractState == 1; })} />

  render() {
    const thArray = ['Address', 'Description', 'State'];

    const options = {
      selectOnClick: true,
    };

    const SelectedContract = function(props) {
      if (props.contract) {//Insert conditions re state 
        if (props.contract.stateText == 'Initial state') {
        return (
          <Card
            plain
            title={props.contract.address}
            category={`${props.contract.stateText}`}
            ctTableFullWidth
            ctTableResponsive
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
                    <td>Contract Balance</td>
                    <td>
                      <Address address={props.contract.address} showBalance />
                    </td>
                  </tr>
                  <tr>
                    <td>Rent</td>
                    <td>
                      <Eth wei={props.contract.rent} />
                    </td>
                  </tr>
                  <tr>
                    <td>Owner</td>
                    <td>
                      <Address address={props.contract.owner} showBalance />
                    </td>
                  </tr>
                  <tr>
                  </tr>
                </tbody>
              </Table>
            }
          />
        );
      }
      else if (props.contract.stateText == 'Leased') {
        return (
          <Card
            plain
            title={props.contract.address}
            category={`${props.contract.stateText}`}
            ctTableFullWidth
            ctTableResponsive
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
                    <td>Contract Balance</td>
                    <td>
                      <Address address={props.contract.address} showBalance />
                    </td>
                  </tr>
                  <tr>
                    <td>Leaser</td>
                    <td>
                      <Address address={props.contract.seller} showBalance />
                    </td>
                  </tr>
                  <tr>
                  </tr>
                </tbody>
              </Table>
            }
          />
        );
      }
      else if (props.contract.stateText == 'Offered') {
        return (
          <Card
            plain
            title={props.contract.address}
            category={`${props.contract.stateText}`}
            ctTableFullWidth
            ctTableResponsive
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
                    <td>Settlement</td>
                    <td>
                      <Address address={props.contract.set} />
                    </td>
                  </tr>
                  <tr>
                    <td>Seller</td>
                    <td>
                      <Address address={props.contract.seller} showBalance />
                    </td>
                  </tr>
                  <tr>
                    <td>Asking</td>
                    <td>
                      <Eth wei={props.contract.units} />
                    </td>
                  </tr>
                  <tr>
                    <td>Offer</td>
                    <td>
                      <Eth wei={props.contract.value} />
                    </td>
                  </tr>
                  <tr>
                  </tr>
                </tbody>
              </Table>
            }
          />
        );
      }
      else if (props.contract.stateText == 'Matched') {
        //ContractValue should be moved to a function
        const contractEthValue = (props.contract.value/1000000000000000000) + (props.contract.units/1000000000000000000);
        return (
          <Card
            plain
            title={props.contract.address}
            category={`${props.contract.stateText}`}
            ctTableFullWidth
            ctTableResponsive
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
                    <td>Settlement</td>
                    <td>
                      <Address address={props.contract.set} />
                    </td>
                  </tr>
                  <tr>
                    <td>Buyer</td>
                    <td>
                      <Address address={props.contract.buyer} showBalance />
                    </td>
                  </tr>
                  <tr>
                    <td>Seller</td>
                    <td>
                      <Address address={props.contract.seller} showBalance />
                    </td>
                  </tr>
                  <tr>
                    <td>Contract Value</td>
                    <td>
                      <Eth wei={contractEthValue*1000000000000000000}/>
                    </td>
                  </tr>
                  <tr>
                    <td>Buyer Position Price</td>
                    <td>
                      <Eth wei={props.contract.unitsT}/>
                    </td>
                  </tr>
                  <tr>
                    <td>Seller Position Price</td>
                    <td>
                      <Eth wei={props.contract.valueT}/>
                    </td>
                  </tr>
                  <tr>
                  </tr>
                </tbody>
              </Table>
            }
          />
        );
      }
      else if (props.contract.stateText == 'Contract for sale') {
        return (
          <Card
            plain
            title={props.contract.address}
            category={`${props.contract.stateText}`}
            ctTableFullWidth
            ctTableResponsive
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
                    <td>Contract Balance</td>
                    <td>
                      <Address address={props.contract.address} showBalance />
                    </td>
                  </tr>
                  <tr>
                    <td>Contract Price</td>
                    <td>
                      <Eth wei={props.contract.valueT} />
                    </td>
                  </tr>
                  <tr>
                    <td>Owner</td>
                    <td>
                      <Address address={props.contract.owner} showBalance />
                    </td>
                  </tr>
                  <tr>
                  </tr>
                </tbody>
              </Table>
            }
          />
        );
      }
      else if (props.contract.stateText == 'Settlement pending') {
        return (
          <Card
            plain
            title={props.contract.address}
            category={`${props.contract.stateText} - ${props.contract.description.toString()
            } `}
            ctTableFullWidth
            ctTableResponsive
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
                    <td>Contract Balance</td>
                    <td>
                      <Address address={props.contract.address} showBalance />
                    </td>
                  </tr>
                  <tr>
                    <td>Settlement Fee</td>
                    <td>
                      <Eth wei={props.contract.value} />
                    </td>
                  </tr>
                  <tr>
                    <td>Reporter</td>
                    <td>
                      <Address address={props.contract.seller} showBalance />
                    </td>
                  </tr>
                  <tr>
                  </tr>
                </tbody>
              </Table>
            }
          />
        );
      }
      else if (props.contract.stateText == 'Settlement result posted') {
        return (
          <Card
            plain
            title={props.contract.address}
            category={`${props.contract.stateText} - ${props.contract.description.toString()
            } : ${props.contract.units}`}
            ctTableFullWidth
            ctTableResponsive
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
                    <td>Contract Balance</td>
                    <td>
                      <Address address={props.contract.address} showBalance />
                    </td>
                  </tr>
                  <tr>
                    <td>Settlement Fee</td>
                    <td>
                      <Eth wei={props.contract.value} />
                    </td>
                  </tr>
                  <tr>
                    <td>Accumulated Settlement Fees</td>
                    <td>
                      <Eth wei={props.contract.valueT} />
                    </td>
                  </tr>
                  <tr>
                    <td>Reporter</td>
                    <td>
                      <Address address={props.contract.seller} showBalance />
                    </td>
                  </tr>
                  <tr>
                  </tr>
                </tbody>
              </Table>
            }
          />
        );
      }
      else {
        return (
          <Card
            plain
            title={props.contract.address}
            category={`${props.contract.stateText} - ${props.contract.description.toString()
            } : ${props.contract.units}`}
            ctTableFullWidth
            ctTableResponsive
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
                    <td>Units</td>
                    <td>
                      <Eth wei={props.contract.units} />
                    </td>
                  </tr>
                  <tr>
                    <td>Value</td>
                    <td>
                      <Eth wei={props.contract.value} />
                    </td>
                  </tr>
                  <tr>
                    <td>Rent</td>
                    <td>
                      <Eth wei={props.contract.rent} />
                    </td>
                  </tr>
                  <tr>
                    <td>Owner</td>
                    <td>
                      <Address address={props.contract.owner} showBalance />
                    </td>
                  </tr>
                  <tr>
                    <td>Seller</td>
                    <td>
                      <Address address={props.contract.seller} showBalance />
                    </td>
                  </tr>
                  <tr>
                    <td>Buyer</td>
                    <td>
                      <Address address={props.contract.buyer} showBalance />
                    </td>
                  </tr>
                  <tr>
                  </tr>
                </tbody>
              </Table>
            }
          />
        );}
      }
      
      return null;
    };

    return (
      <Grid fluid>
        <Row>
          <Col md={12}>
            {this.props.notifications.map(n =>
              <Alert
                onDismiss={this.removeNotification.bind(this, n)}
                bsStyle={n.style}
              >
                <h4>
                  {n.title}
                </h4>
                {n.message}
              </Alert>,
            )}
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            {this.props.transactions.map(t =>
              <Alert
                onDismiss={this.removeTransaction.bind(this, t)}
                bsStyle="info"
              >
                <Trx showSpinner tx={t} />
              </Alert>,
            )}
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <CreateContract
              success={this.createContract.bind(this)}
              disabled={this.props.user.address.indexOf('0x') !== 0}
              address={this.props.user.address}
            />
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <br />
          </Col>
        </Row>
        <Row>
          <Col md={8}>
            <Card
              title={
                this.props.contracts && this.props.contracts.length > 0
                  ? `Contracts (${this.props.contracts.length})`
                  : 'Loading contracts...'
              }
              category="Conduit P2P"
              ctTableFullWidth
              ctTableResponsive
              content={
                <Table striped hover>
                  <thead>
                    <tr>
                      {thArray.map((prop, key) =>
                        <th key={key}>
                          {prop}
                        </th>,
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.contracts.map((contract, key) =>
                      <tr
                        style={
                          contract === this.props.selectedContract
                            ? { background: '#87cb16' }
                            : {}
                        }
                        onClick={this.rowClick.bind(this, contract)}
                        key={key}
                      >
                        <td>
                          {contract.address}
                        </td>
                        <td>
                          {this.descriptionGet(contract)//{contract.description.toString()}
                          }
                        </td>
                        <td>
                          {contract.stateText}
                        </td>
                      </tr>,
                    )}
                  </tbody>
                </Table>
              }
            />
          </Col>

          <Col md={4}>
            <SelectedContract contract={this.props.selectedContract} />
            <ClaimBalance
              contract={this.props.selectedContract}
              success={this.claimBalance.bind(this)}
              disabled={this.props.user.address.indexOf('0x') !== 0}//Should be disabled when user is not owner
              address={this.props.user.address}
            />
            <TradeContract
              contract={this.props.selectedContract}
              success={this.tradeContract.bind(this)}
              disabled={this.props.user.address.indexOf('0x') !== 0}//Should be disabled when user is not owner
              address={this.props.user.address}
            />
            <ChangeTradeContract
              contract={this.props.selectedContract}
              success={this.changeTradeContract.bind(this)}
              disabled={this.props.user.address.indexOf('0x') !== 0}//Should be disabled when user is not owner
              address={this.props.user.address}
            />
            <CancelTradeContract
              contract={this.props.selectedContract}
              success={this.cancelTradeContract.bind(this)}
              disabled={this.props.user.address.indexOf('0x') !== 0}//Should be disabled when user is not owner
              address={this.props.user.address}
            />
            <ConfirmTradeContract
              contract={this.props.selectedContract}
              success={this.confirmTradeContract.bind(this)}
              disabled={this.props.user.address.indexOf('0x') !== 0}//Should be disabled when user is not owner
              address={this.props.user.address}
            />
            <SetRent
              contract={this.props.selectedContract}
              success={this.setRent.bind(this)}
              disabled={this.props.user.address.indexOf('0x') !== 0}//Should be disabled when user is not owner
              address={this.props.user.address}
            />
            <LeaseContract
              contract={this.props.selectedContract}
              success={this.leaseContract.bind(this)}
              disabled={this.props.user.address.indexOf('0x') !== 0}
              address={this.props.user.address}
            />
            <AcceptOffer
              contract={this.props.selectedContract}
              success={this.purchaseContract.bind(this)}
              disabled={this.props.user.address.indexOf('0x') !== 0}
              address={this.props.user.address}
            />
            <ChangeBuyerPositionPrice
              contract={this.props.selectedContract}
              success={this.changeBuyerPositionPrice.bind(this)}
              disabled={this.props.user.address.indexOf('0x') !== 0}
              address={this.props.user.address}
            />
            <ChangeSellerPositionPrice
              contract={this.props.selectedContract}
              success={this.changeSellerPositionPrice.bind(this)}
              disabled={this.props.user.address.indexOf('0x') !== 0}
              address={this.props.user.address}
            />
            <PurchaseBuyerPosition
              contract={this.props.selectedContract}
              success={this.purchaseBuyerPosition.bind(this)}
              disabled={this.props.user.address.indexOf('0x') !== 0}
              address={this.props.user.address}
            />
            <PurchaseSellerPosition
              contract={this.props.selectedContract}
              success={this.purchaseSellerPosition.bind(this)}
              disabled={this.props.user.address.indexOf('0x') !== 0}
              address={this.props.user.address}
            />
            <CancelOffer
              contract={this.props.selectedContract}
              success={this.cancelOffer.bind(this)}
              disabled={this.props.user.address.indexOf('0x') !== 0}//Should be disabled when user is not seller
              address={this.props.user.address}
            />
            <DefineSettlement
              contract={this.props.selectedContract}
              success={this.postSettlementContract.bind(this)}
              disabled={this.props.user.address.indexOf('0x') !== 0}
            />
            <PostContingentPaymentContract
              settlers={this.props.contracts.filter(x => x.contractState == 6)}
              contract={this.props.selectedContract}
              success={this.postContingentPaymentContract.bind(this)}
              disabled={this.props.user.address.indexOf('0x') !== 0}
            />
            <PostResult1
              contract={this.props.selectedContract}
              success={this.postResult.bind(this)}
              disabled={this.props.user.address.indexOf('0x') !== 0}
            />
            <Settle
              contract={this.props.selectedContract}
              success={this.settle.bind(this)}
              disabled={this.props.user.address.indexOf('0x') !== 0}
              address={this.props.user.address}
            />
            <CollectFee
              contract={this.props.selectedContract}
              success={this.collectFee.bind(this)}
              disabled={this.props.user.address.indexOf('0x') !== 0}
              address={this.props.user.address}
            />
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
    notifications: state.notifications.items,
  };
}

function mapDispatchToProps(dispath) {
  return bindActionCreators(
    {
      removeTransaction: actions.removeTransaction,
      addTransaction: actions.addTransaction,
      selectContract: actions.selectContract,
      setContracts: actions.setContracts,
      addContract: actions.addContract,
      addNotification: actions.addNotification,
      removeNotification: actions.removeNotification,
    },
    dispath,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ContractList);
