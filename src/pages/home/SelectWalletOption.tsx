import React from 'react';

interface SelectWalletOptionProps {
  walletMode: string;
  setWalletMode: (value: string) => void;
}

export default function SelectWalletOption({ walletMode, setWalletMode }: SelectWalletOptionProps) {
  // Function to handle changes in the select element
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setWalletMode(e.target.value); // Access the selected value through e.target.value
  };

  return (
    <div className="mt-8 mb-4 ">
      <label htmlFor="WalletMode" className='p-2 text-white block'>Change Wallet Mode</label>
      <select id="WalletMode" className='py-2 px-4  rounded-sm bg-slate-800 text-white w-[11em] border-blue-800  ' value={walletMode} onChange={handleChange}>
        <option value="demo">Demo Wallet</option>
        <option value="wallet">Wallet Adapter</option>
      </select>
    </div>
  );
}
