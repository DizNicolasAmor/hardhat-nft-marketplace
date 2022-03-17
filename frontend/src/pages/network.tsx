import React from 'react';
import { useSelector } from 'react-redux';
import { getUser } from '../redux/slices/userSlice';
import { getNetwork } from '../redux/slices/networkSlice';
import { renderSectionItem } from '../utils/utilFunctions';

const NetworkSection: React.FC = () => {
  const { chainId, name, symbol } = useSelector(getNetwork);
  const { address, balance } = useSelector(getUser);
  const chainIdText = chainId === 0 ? '' : String(chainId);

  const renderContent = () => (
    <div className="m-3">
      {renderSectionItem('Chain id', chainIdText)}
      {renderSectionItem('Network name', name)}
      {renderSectionItem('Balance', `${balance} ${symbol}`)}
      {renderSectionItem('Address', address)}
    </div>
  );

  const renderDefaultMessage = () => (
    <p className="m-3">You have to connect your wallet to see this section.</p>
  );

  return (
    <section aria-labelledby="network-section" className="text-center">
      <h1 id="network-section">Welcome to the Network section</h1>
      {chainId ? renderContent() : renderDefaultMessage()}
    </section>
  );
};

export default NetworkSection;
