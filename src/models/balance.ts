import { CharSymbol, FinancialRecord } from "./common";

export type BalanceRecord = {
  asset: FinancialRecord;
  conversion: FinancialRecord;
};

export type Balance = {
  addr: string;
  records: Array<BalanceRecord>;
};

export const Convert = (json: any): Balance[] => {
  return (Object.entries(json) as [string, any])
    .map(([addr, value1]) => {
      return <Balance>{
        addr,
        records:
          (Object.entries(value1) as [string, any])
            .map(([asset, value2]) => {
              return <BalanceRecord>{
                asset: <FinancialRecord>{
                  tickerSymbol: asset,
                  value: value2.amount
                },
                conversion: <FinancialRecord>{
                  tickerSymbol: "USD",
                  charSymbol: <CharSymbol>{ symbol: "$", isLeftSide: true },
                  value: value2.usd_value
                }
              };
            })
      };
    });
};