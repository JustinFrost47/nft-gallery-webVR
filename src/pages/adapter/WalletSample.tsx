// MyComponent.js


import { useWallet } from '@solana/wallet-adapter-react';


const WalletSample = () => {
    const { wallet, connect, disconnect, connected, publicKey} = useWallet();
    // const { connection } = useConnection();

    const handleConnect = async () => {
        try {
            await connect();
        } catch (error) {
            console.error('Failed to connect wallet:', error);
        }
    };

    const handleDisconnect = async () => {
        try {
            await disconnect();
        } catch (error) {
            console.error('Failed to disconnect wallet:', error);
        }
    };

    return (
        <div>
            {connected ? (
                <div>
                    <p>Connected with {wallet?.adapter.name} {publicKey?.toBase58()}</p>
                    <div onClick={handleDisconnect}>Disconnect</div>
                </div>
            ) : (
                <div onClick={handleConnect}>Connect Wallet</div>
            )}
        </div>
    );
};

export default WalletSample;
