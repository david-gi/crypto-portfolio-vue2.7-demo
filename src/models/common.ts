export type CharSymbol = {
  symbol: string;
  isLeftSide: boolean;
};

export type FinancialValue = {
  tickerSymbol: string;
  charSymbol?: CharSymbol;
  value: number;
};
