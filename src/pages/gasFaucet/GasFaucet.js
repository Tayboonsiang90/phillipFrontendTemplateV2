import React from 'react'

const GasFaucet = () => {
  return (
      <div>
          HELLO GAS
          
          {process.env.REACT_APP_NODE_1_API_GATEWAY}
      </div>
  );
}

export default GasFaucet