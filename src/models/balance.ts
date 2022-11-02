import { CharSymbol, FinancialValue } from "./common";

export type BalanceRecord = {
  addr: string;
  asset: FinancialValue;
  conversion: FinancialValue;
};

export const JsonToBalances = (json: object): BalanceRecord[] => {
  if (json == undefined) return [];
  return (Object.entries(json) as [string, any])
    .map(([addr, assets]) => {
      return (Object.entries(assets) as [string, any])
        .map(([asset, assetObj]) => {
          return <BalanceRecord>{
            addr,
            asset: <FinancialValue>{
              tickerSymbol: asset,
              value: Number.parseFloat(assetObj.amount)
            },
            conversion: <FinancialValue>{
              tickerSymbol: "USD",
              charSymbol: <CharSymbol>{ symbol: "$", isLeftSide: true },
              value: Number.parseFloat(assetObj.usd_value)
            }
          };
        })
    })
    .flat(1);
};