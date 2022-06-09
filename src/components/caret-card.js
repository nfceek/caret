import { Box, Card, Text, Heading, Button } from 'theme-ui';
import React from 'react';
import List from './list';
import head from 'next/head';

//import Web3 from "web3";
//import detectEthereumProvider from '@metamask/detect-provider'
//import metaCoinArtifact from "../../build/contracts/MetaCoin.json";
import { create as ipfsHttpClient }  from 'ipfs-http-client'
//import jQuery from 'jquery';
//import user_artifacts from '../../build/contracts/User.json'


const projectId = `26IXlbgxpsdnDo4BOq6nFGoOmWx`;
const projectSecret = `b3b58185b53409baa4e6aa9fc0c95fb0`;

const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64')
  const ipfs = ipfsHttpClient({
    protocol: 'https',
    host: 'ipfs.infura.io',
    port: 5001,
    apiPath: '/api/v0',
    headers: {
      authorization: auth
    }
  })


export default function CaretCard() {

//const Signup = () => {
  var web3 = ''
  var account = ''
  var meta = '' 
  var accounts = ''
  var account = ''

  //var User = contract(user_artifacts);
  
/*
  React.useEffect(() => {

    const init = async () => {
        await getWeb3(true);
    }
    init();
}, []);

const getWeb3 = async (isFirstLoad = boolean) => {
    try {
        let web3 = Web3;
        if (window.ethereum) {
            web3 = new Web3(window.ethereum);
            // Ask User permission to connect to Metamask
            if (!isFirstLoad) {
                try {
                    await window.ethereum.enable();
                } catch (err) {
                    console.log('Transaction rejected by user:', err)
                };
            };
        } else if (window.web3) {
            web3 = new Web3(window.web3.currentProvider);
        } else {
            window.alert('Non-Ethereum browser detected. Please install MetaMask plugin');
            return;
        };

        dispatch(setWeb3(web3));  // Update web3 into Redux state

        // ...
    } catch (err) {
        console.log('Error in Web3.tsx -> getWeb3(): ', err);
    };
};

*/
  //window.$ = window.jQuery = jQuery;
  // When we compile + deploy the User contract, truffle stores the abi and deployed address in a json
  // file in /build. We use it here to setup a User class.
  //const ipfsAPI = require(ipfsHttpClient);
  // const ipfs = ipfsAPI('localhost', '5001');
  //const ipfs = ipfsAPI('ipfs.infura.io', '5001', {protocol: 'https'});

  // Fetches user with given index from the blockchain
  // see pattern at: https://ethereum.stackexchange.com/questions/26464/how-to-chain-functions-in-truffle-framework
  // current web3 call to getUserByIndex doesn't work well (it doesn't properly return bytes & bytes16 on same return / decoding it fails)
  // so we call for each individual datapoint for now
  
  function getAUser(instance, i) {

    var instanceUsed = instance
    var username = ''
    var ipfsHash = ''
    var address = ''
    var userCardId = 'user-card-' + i

    return instanceUsed.getUsernameByIndex.call(i).then(function(_username) {

      console.log('username:', username = web3.toAscii(_username), i);
        
      $('#' + userCardId).find('.card-title').text(username);
    
      return instanceUsed.getIpfsHashByIndex.call(i);

    }).then(function(_ipfsHash) {

      console.log('ipfsHash:', ipfsHash = web3.toAscii(_ipfsHash), i);

      if(ipfsHash != 'not-available') {
        var url = 'https://ipfs.io/ipfs/' + ipfsHash;
        console.log('getting user info from', url);

        $.getJSON(url, function(userJson) {

          console.log('got user info from ipfs', userJson);
          $('#' + userCardId).find('.card-subtitle').text(userJson.title);
          $('#' + userCardId).find('.card-text').text(userJson.intro);

        });
      }

      return instanceUsed.getAddressByIndex.call(i);
    
    }).then(function(_address) {

      console.log('address:', address = _address, i);
      
      $('#' + userCardId).find('.card-eth-address').text(address);

      return true;

    }).catch(function(e) {

      // There was an error! Handle it.
      console.log('error getting user #', i, ':', e);

    });

  }

  // Fetch all users from the blockchain - eventually we'll probably need to paginate this
  function getUsers() {
    var self = this;

    var instanceUsed;

    User.deployed().then(function(contractInstance) {

      instanceUsed = contractInstance;

      return instanceUsed.getUserCount.call();

    }).then(function(userCount) {

      userCount = userCount.toNumber();

      console.log('User count', userCount);

      var rowCount = 0;
      var usersDiv = $('#users-div');
      var currentRow;

      for(var i = 0; i < userCount; i++) {

        var userCardId = 'user-card-' + i;

        if(i % 4 == 0) {
          var currentRowId = 'user-row-' + rowCount;
          var userRowTemplate = '<div class="row" id="' + currentRowId + '"></div>';
          usersDiv.append(userRowTemplate);
          currentRow = $('#' + currentRowId);
          rowCount++;
        }

        var userTemplate = `
          <div className ="col-lg-3 mt-1 mb-1" id="` + userCardId + `">
            <div className ="card bg-gradient-primary text-white card-profile p-1">
              <div className ="card-body">
                <h5 className ="card-title"></h5>
                <h6 className ="card-subtitle mb-2"></h6>
                <p className ="card-text"></p>        
                <p className ="eth-address m-0 p-0">
                  <span className ="card-eth-address"></span>
                </p>
              </div>
            </div>
          </div>`;

        currentRow.append(userTemplate);

      }

      console.log("getting users...");
      for(var i = 0; i < userCount; i++) {
        self.getAUser(instanceUsed, i);
      }

    });

  }

  function startConnection() {
    var self = this;

    ipfs.id(function(err, res) {
      if (err) throw err
      console.log("Connected to IPFS node!", res.id, res.agentVersion, res.protocolVersion);
    });

    web3.eth.getAccounts(function(err, accs) {
      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }

      accounts = accs;
      account = accounts[0];

      // set the provider for the User abstraction
      User.setProvider(web3.currentProvider);

      // show current address
      var ethAddressIput = $('#sign-up-eth-address').val(accounts[0]);

      // trigger create user when sign up is clicked
      var signUpButton = $('#sign-up-button').click(function() {
        self.createUser();
        return false;
      });

      // populate users
      self.getUsers();

    });  

  }

  function createUser() {
    var username = $('#sign-up-username').val();
    var title = $('#sign-up-title').val();
    var intro = $('#sign-up-intro').val();
    var ipfsHash = '';

    console.log('creating user on ipfs for', username);

    var userJson = {
      username: username,
      title: title,
      intro: intro
    };

    ipfs.add([Buffer.from(JSON.stringify(userJson))], function(err, res) {
      if (err) throw err
      ipfsHash = res[0].hash

      console.log('creating user on eth for', username, title, intro, ipfsHash);

      User.deployed().then(function(contractInstance) {

        contractInstance.createUser(username, ipfsHash, {gas: 200000, from: web3.eth.accounts[0]}).then(function(success) {
          if(success) {
            console.log('created user on ethereum!');
          } else {
            console.log('error creating user on ethereum');
          }

          // todo: maybe refresh users here but this could take a while... needs spinner / or message to refresh
          
        }).catch(function(e) {
          // There was an error! Handle it.
          console.log('error creating user:', username, ':', e);
        });
      
      });
    });
    
  }

/*
  //window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source.");
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Please use MetaMask or Mist browser.");
  }
  //});

*/
  async function getDetails() {
    const { web3 } = this;
   
    const provider = await detectEthereumProvider()
    if (provider) {
      console.log('Ethereum successfully detected!')   
      // From now on, this should always be true:
      // provider === window.ethereum  
      // Access the decentralized web! 
      // Legacy providers may only have ethereum.sendAsync
      const chainId = await provider.request({
        method: 'eth_chainId'
      })
    } else {
   
      // if the provider is not detected, detectEthereumProvider resolves to null
      console.error('Please install MetaMask!', error)
    }
/*
    try {
      // get contract instance
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = metaCoinArtifact.networks[networkId];
      this.meta = new web3.eth.Contract(
        metaCoinArtifact.abi,
        deployedNetwork.address,
      );

      // get accounts
      const accounts = await web3.eth.getAccounts();
      this.account = accounts[0];

      this.refreshBalance();
    } catch (error) {
      console.error("Could not connect to contract or chain.");
    }
*/

  }
/*
  async function refreshBalance() {
    const { getBalance } = this.meta.methods;
    const balance = await getBalance(this.account).call();

    const balanceElement = document.getElementsByClassName("balance")[0];
    balanceElement.innerHTML = balance;
  }

  async function sendCoin() {
    const amount = parseInt(document.getElementById("amount").value);
    const receiver = document.getElementById("receiver").value;

    this.setStatus("Initiating transaction... (please wait)");

    const { sendCoin } = this.meta.methods;
    await sendCoin(receiver, amount).send({ from: this.account });

    this.setStatus("Transaction complete!");
    this.refreshBalance();
  }

  function setStatus(message) {
    const status = document.getElementById("status");
    status.innerHTML = message;
  }

*/

 //window.addEventListener("load", function() {
   /*
   if (window.ethereum) {     
     App.web3 = new Web3(window.ethereum);
     window.ethereum.enable();  
   } else {
     console.warn(
       "No web3 detected. Falling back to http:127.0.0.1:8545. You should remove this fallback when you deploy live",
     );
      //fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
     App.web3 = new Web3(
       new Web3.providers.HttpProvider("http:127.0.0.1:8545"),
     );
   }
*/
 //});


  return (
    <Card >

        <Box>
          <Box className="" sx={styles.caretCard}>

          </Box>
        </Box>
      </Card>
  );
}

const styles = {
  caretCard: {
    borderRadius: 20,
    position: 'relative',
    transition: 'all 0.3s',
    p: ['35px 25px', null, null, '40px'],
    width: ['100%', '75%', '100%'],
    mb: '40px',
    mt: '40px',
    mx: [0, 'auto', 0],
    '&:before': {
      position: 'absolute',
      content: "''",
      width: '100%',
      top: 0,
      left: 0,
      height: '100%',
      border: '1px solid rgba(38, 78, 118, 0.1)',
      borderRadius: 'inherit',
      transition: 'all 0.3s',
      zIndex: -1,
    },
    '&:hover': {
      boxShadow: '0px 4px 25px rgba(38, 78, 118, 0.1) !important',
      '&:before': {
        opacity: 0,
      },
    },
  },
  header: {
    height: ['28px', null, null, '32px'],
    backgroundColor: 'yellow',
    borderRadius: '5px',
    fontWeight: 'bold',
    fontSize: 1,
    lineHeight: 1.2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    position: 'absolute',
    top: '-17px',
    letterSpacing: '-.14px',
    px: '12px',
  },
  pricingHeader: {
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    mb: ['30px', null, null, null, '40px'],
    p: {
      fontSize: [1, 2],
      color: 'text',
      lineHeight: 'heading',
    },
    '.package__name': {
      marginBottom: [1, null, 2],
    },
  },
  price: {
    fontWeight: 500,
    fontSize: [4, null, 5, null, '30px'],
    lineHeight: 1,
    letterSpacing: '-0.55px',
    color: 'text',
    marginBottom: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    pt: [4, 6],
    '> span': {
      position: 'relative',
      pl: '3px',
      display: 'inline-block',
      fontSize: [1, 2],
      fontWeight: 'normal',
    },
  },
  listItem: {
    fontFamily: 'DM Sans',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: [1, 2],
    lineHeight: [1.75, 1.6],
    mb: 3,
    alignItems: 'flex-start',
    color: 'text',
    '&.closed': {
      opacity: 0.55,
      button: {
        color: '#788FB5',
      },
    },
  },
  buttonGroup: {
    textAlign: 'center',
    mt: ['30px', null, null, null, '35px'],
    '.free__trail': {
      color: 'secondary',
      width: '100%',
      justifyContent: 'center',
      fontWeight: 700,
      fontSize: ['14px', 1],
      p: '20px 0 0',
    },
  },
};
