export type CharSymbol = {
  symbol: string;
  isLeftSide: boolean;
}

export type FinancialRecord = {
  tickerSymbol: string;
  charSymbol?: CharSymbol;
  value: number;
}
