

import { Container, Box, Grid, Text, Heading, Button, Image } from 'theme-ui';
import { keyframes } from '@emotion/react';
import SectionHeader from 'components/section-header';
import SignupFeature from 'components/signup-feature';
import Theme from '../theme';

const shapePattern = '../assets/shape-pattern1.png';
const Smart = '../assets/services/smart.svg';
const Secure = '../assets/services/secure.svg';

import Head from 'next/head'
//import Web3 from "web3";
//import detectEthereumProvider from '@metamask/detect-provider'
//import metaCoinArtifact from "../../build/contracts/MetaCoin.json";
//import { create as ipfsHttpClient }  from 'ipfs-http-client'
//import jQuery from 'jquery';
//import user_artifacts from '../../build/contracts/User.json'


const projectId = `26IXlbgxpsdnDo4BOq6nFGoOmWx`;
const projectSecret = `b3b58185b53409baa4e6aa9fc0c95fb0`;
/*
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
*/

const data = {
  subTitle: 'How it works',
  title: 'Create Your Caret',
  features: [
    {
      id: 1,
      imgSrc: Smart,
      alttext: 'Remember',
      title: 'Pick a word, name or phrase',
      text:
        'Choose a word or phrase to use as your Caret Label.',
    },
    {
      id: 2,
      imgSrc: Smart,
      alttext: 'Remember',
      title: 'Don`t add the Caret ( ^ )',
      text:
        'Do Not put a ^ before your Caret Label, we will add that create your Caret Tag',
    },
    {
      id: 3,
      imgSrc: Smart,
      alttext: 'Remember',
      title: 'Why are there Numbers on the end?',
      text:
        'See Below',
    },
    {
      id: 4,
      imgSrc: Smart,
      alttext: 'Remember',
      title: 'Why upgrade to a Pro or Premium plan.',
      text:
        'See Below'
    },

  ],
};


export default function Signup() {
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
    <Box sx={{ variant : 'section.signup' }}>
      <Container sx={styles.containerBox} >
        <Box sx={styles.halfLBox} >
          <SignupFeature subTitle={data.subTitle} />
          <Grid sx={styles.grid}>
            {data.features.map((feature, i) =>(
              <Box sx={styles.card} key={feature.id}>
                <Image src={feature.imgSrc} alt={feature.alttext} sx={styles.icon} />
                <Box sx={styles.wrapper}>
                  <Heading sx={styles.wrapper.title}>{feature.title}</Heading>
                  <Text sx={styles.wrapper.subTitle}>{feature.text}</Text>
                </Box>
              </Box>
            ))}
          </Grid>
        </Box>
        <Box sx={styles.halfRBox}>
          <SignupFeature title={data.title} />

                <form>
                  <div className ="card-body">
                    {/*
                    <div className ="form-group">
                      <label htmlFor="tagname">Caret Tag : </label>
                      <input type="text" className ="form-control" id="sign-up-username" required="required" />
                    </div>

                    <div className ="form-group">
                      <label htmlFor="username">Your Name : </label>
                      <input type="text" className ="form-control" id="sign-up-title" />
                    </div>

                   
                    <div className ="form-group">
                      <label htmlFor="nftname">Add NFT</label>
                      <input type="text" className ="form-control" id="sign-up-title" />
                    </div>
                  
                    <div className ="form-group">
                      <label htmlFor="email">Your Email : </label>
                      <input type="text" className ="form-control" id="sign-up-title" />
                    </div>
                      <p>checkbox - if no wallet address require pwd</p>

                    <div className ="form-group">
                      <label htmlFor="pwd">Password : </label>
                      <input type="text" className ="form-control" id="sign-up-title" />
                    </div>

                    <div className ="form-group">
                      <label htmlFor="username">Wallet Address :</label>
                      <span className ="eth-address"></span>
                        <input type="text" className ="form-control" id="sign-up-eth-address" value="0x..." disabled />                   
                    </div> 
                     */}
                    <div>                                 
                      <button type="submit" className ="btn btn-primary" id="sign-up-button">Coming Soon</button>  
                    </div>                                 
                  </div>
                </form>

        </Box>                       
      </Container>
    </Box>
  )


}

const styles = {
  coreFeature: {
    py: [0, null, null, 2, null, 7],
    position: 'relative',
  },
  containerBox: {
    display: 'flex',
    alignItems: ['flex-start', null, null, 'center'],
    justifyContent: ['flex-start', null, null, 'space-between'],
    flexDirection: ['column', null, null, 'row'],
    pb: [0, null, null, null, null, 7],
  },
  shapeBox: {
    position: 'absolute',
    bottom: -68,
    left: -160,
    zIndex: -1,
    display: ['none', null, null, null, null, 'inline-block'],
  },
  halfLBox: {
    width: ['100%', null, null, 315, 390, 450, null, 500],
    flexShrink: 0,
    mb: [7, null, 60, 0],
    textAlign: ['center', null, null, 'left'],
  },
  halfRBox: {
    width: ['100%', null, null, 315, 390, 450, null, 500],
    flexShrink: 0,
    mb: [7, null, 60, 0],
    textAlign: ['center', null, null, 'left'],
  },
  grid: {
    pr: [2, 0, null, null, 6, '70px'],
    pl: [2, 0],
    pt: [2, null, null, null, 3],
    mx: 'auto',
    width: ['100%', 370, 420, '100%'],
    gridGap: ['35px 0', null, null, null, '50px 0'],
    gridTemplateColumns: ['repeat(1,1fr)'],
  },
  card: {
    display: 'flex',
    alignItems: 'flex-start',
    transition: 'all 0.3s',
  },

  icon: {
    width: ['45px', null, null, null, '55px'],
    height: 'auto',
    flexShrink: 0,
    mr: [3, null, null, null, 4],
  },
  wrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
    mt: '-5px',
    title: {
      fontSize: 3,
      color: 'heading_secondary',
      lineHeight: 1.4,
      fontWeight: 700,
      mb: [2, null, 3, 2, 3],
    },

    subTitle: {
      fontSize: [1, null, null, '14px', 1],
      fontWeight: 400,
      lineHeight: 1.9,
    },
  },
  videoWrapper: {
    maxWidth: '100%',
    position: 'relative',
    width: '900px',
    '&:before': {
      content: '""',
      display: 'block',
      paddingTop: '56.25%',
    },
    iframe: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
    },
  },
};
