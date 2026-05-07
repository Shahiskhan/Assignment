import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from './store';
import { Provider } from 'react-redux';

import 'react-datepicker/dist/react-datepicker.css';
import './styles/tailwind.css';
import './scss/style.scss';

import useMetaMaskConnection from './hooks/useMetaMaskConnection';

// Suppress react-intl-tel-input defaultProps warning
const originalError = console.error;

console.error = (...args) => {
  if (
    typeof args[0] === 'string' &&
    args[0].includes('Support for defaultProps will be removed from function components')
  ) {
    return;
  }

  originalError.call(console, ...args);
};

/**
 * TEMP TEST COMPONENT
 */
const WalletTest = () => {
  const {
    walletAddress,
    connectWallet,
    disconnectWallet,
    isConnecting,
    error
  } = useMetaMaskConnection();

  return (
    <div
      style={{
        padding: '20px',
        position: 'fixed',
        top: 20,
        right: 20,
        zIndex: 999999,
        background: '#111',
        borderRadius: '10px',
        color: '#fff'
      }}
    >
      <h3>MetaMask Test</h3>

      {!walletAddress ? (
        <button
          onClick={connectWallet}
          disabled={isConnecting}
          style={{
            padding: '10px 15px',
            cursor: 'pointer'
          }}
        >
          {isConnecting ? 'Connecting...' : 'Connect MetaMask'}
        </button>
      ) : (
        <>
          <p
            style={{
              marginTop: '10px',
              wordBreak: 'break-all',
              maxWidth: '250px'
            }}
          >
            {walletAddress}
          </p>

          <button
            onClick={disconnectWallet}
            style={{
              padding: '10px 15px',
              cursor: 'pointer',
              marginTop: '10px'
            }}
          >
            Disconnect
          </button>
        </>
      )}

      {error && (
        <p
          style={{
            color: 'red',
            marginTop: '10px'
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <WalletTest />
    <App />
  </Provider>
);