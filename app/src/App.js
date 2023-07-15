import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';

const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

async function connectWallet() {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      console.log('Connected account:', accounts[0]);
    } catch (error) {
      console.error('User rejected connection request:', error);
    }
  } else {
    console.error('MetaMask is not installed. Please install it and try again.');
  }
}

export default App;
