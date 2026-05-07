import { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateUser } from '../store/authSlice';

/**
 * MetaMask Wallet Connection Hook
 */
export const useMetaMaskConnection = () => {
    const dispatch = useDispatch();

    const [walletAddress, setWalletAddress] = useState('');
    const [isConnecting, setIsConnecting] = useState(false);
    const [error, setError] = useState('');

    /**
     * Validate Ethereum Address
     */
    const isValidEthereumAddress = (address) => {
        return /^0x[a-fA-F0-9]{40}$/.test(address);
    };

    /**
     * Handle account changes
     */
    const handleAccountsChanged = useCallback(
        (accounts) => {
            if (!accounts || accounts.length === 0) {
                setWalletAddress('');
                dispatch(updateUser({ wallet_address: null }));
                return;
            }

            const account = accounts[0];

            if (isValidEthereumAddress(account)) {
                setWalletAddress(account);

                dispatch(
                    updateUser({
                        wallet_address: account
                    })
                );
            }
        },
        [dispatch]
    );

    /**
     * Connect Wallet
     */
    const connectWallet = useCallback(async () => {
        setError('');
        setIsConnecting(true);

        try {
            // MetaMask check
            if (!window.ethereum) {
                throw new Error('MetaMask is not installed');
            }

            // Request wallet connection
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts'
            });

            if (!accounts || accounts.length === 0) {
                throw new Error('No wallet account found');
            }

            const account = accounts[0];

            // Validate address
            if (!isValidEthereumAddress(account)) {
                throw new Error('Invalid Ethereum wallet address');
            }

            // Save wallet
            setWalletAddress(account);

            dispatch(
                updateUser({
                    wallet_address: account
                })
            );

            return account;
        } catch (err) {
            console.error('MetaMask Connection Error:', err);

            // User rejected request
            if (err.code === 4001) {
                setError('User rejected wallet connection');
            } else {
                setError(err.message || 'Failed to connect wallet');
            }
        } finally {
            setIsConnecting(false);
        }
    }, [dispatch]);

    /**
     * Disconnect Wallet
     */
    const disconnectWallet = useCallback(() => {
        setWalletAddress('');
        setError('');

        dispatch(
            updateUser({
                wallet_address: null
            })
        );
    }, [dispatch]);

    /**
     * Auto check existing connection
     */
    useEffect(() => {
        const checkWalletConnection = async () => {
            try {
                if (!window.ethereum) return;

                const accounts = await window.ethereum.request({
                    method: 'eth_accounts'
                });

                if (accounts.length > 0) {
                    handleAccountsChanged(accounts);
                }
            } catch (err) {
                console.error(err);
            }
        };

        checkWalletConnection();
    }, [handleAccountsChanged]);

    /**
     * Event listeners
     */
    useEffect(() => {
        if (!window.ethereum) return;

        window.ethereum.on('accountsChanged', handleAccountsChanged);

        return () => {
            if (window.ethereum.removeListener) {
                window.ethereum.removeListener(
                    'accountsChanged',
                    handleAccountsChanged
                );
            }
        };
    }, [handleAccountsChanged]);

    return {
        walletAddress,
        isConnecting,
        error,
        connectWallet,
        disconnectWallet
    };
};

export default useMetaMaskConnection;