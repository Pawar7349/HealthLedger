
## HealthLedger

#### A blockchain-based Electrical Medical Records (EMR) system.

## Key Features

HealthLedger is powered by [IPFS](https://ipfs.tech/), where every patient's medical records are stored on the distributed file system, not owned by any centralized entity like hospitals or governments. Each patient has a digital identity on [Ethereum](https://ethereum.org/) blockchain, who and whose doctor can access medical records by interacting with smart contracts. 

On HealthLedger,

- A healthcare provider can register using a crypto wallet like Metamask.
- The healthcare provider can register a patient by using the public address of the patient’s wallet, usually provided during an appointment.
- The health provider can search for a patient’s records using the address, and upload a new record for the patient. 
- The patient can also view his or her records, after connected with a wallet which address is registered by the health provider.


## How It Works

There are three major components of HealthLedger:

1. React client (connected with MetaMask)
2. Solidity smart contract on Ethereum blockchain
3. Interplanetary file system (IPFS) via [Pinata](https://www.pinata.cloud/)

---

<p align="center"> <img src="https://drive.google.com/uc?id=1--4n0Ud9dWqh4kTj_g97LJPUwd5hoZdJ" width="700"/> </p>

---
The client first connects with crypto wallet, and use smart contract to mint a patient or doctor block if the public address of the user’s wallet is not registered.

The client can upload a record file to IPFS, which address is linked to a patient block in ETH chain. The client can get all record addressed stored in a patient block from smart contract, and get a record file by its address from IPFS.

## How To Use

Install Truffle globally if you haven't.

```sh
$ npm install -g truffle
```

Install Truffle dependencies and deploy smart contracts to local Ethereum network like [Ganache](https://trufflesuite.com/ganache/). 

```sh
$ cd truffle
$ npm install
$ truffle compile
$ truffle deploy
```

Install React dependencies and start React app. 

```sh
$ cd ../client
$ npm install
$ npm start
```

Add your Pinata IPFS project credentials to .env. You can create a project [here](https://pinata.cloud/):
```
VITE_PINATA_JWT={YOUR_PINATA_JWT}

```

You should be able to see the application running at http://localhost:3000.


## Support

If you like this project, please leave a star ⭐️. This helps more people to know this project.

---
> GitHub [https://github.com/Pawar7349/]

> Twitter [https://x.com/PratikP43786754]