import { useMemo } from 'react';

const priceSymbols = ['N/A', '$', '$$', '$$$'];

const usePriceSymbol = (priceLevel?: number) => {
  return useMemo(() => {
    if (priceLevel == null || priceLevel < 0 || priceLevel > priceSymbols.length - 1) {
      return priceSymbols[0]; // 'N/A' for invalid or missing price level
    }
    return priceSymbols[priceLevel];
  }, [priceLevel]);
};

export default usePriceSymbol;
