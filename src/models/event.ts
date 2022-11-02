import { BalanceRecord } from "./balance"
import { CharSymbol, FinancialValue } from "./common"

export enum EventType {
  Withdrawal = "Withdrawal",
  Deposit = "Deposit",
}


export type EventRecord = {
  addr: string;
  type: EventType;
  record: BalanceRecord;
  datetime: Date;
}

export const JsonToEvents = (json: object): EventRecord[] => {
  if (json == undefined) return [];
  return (Object.entries(json) as [string, any])
    .map(([addr, value]) => {
      return value.events.map((eventObj: any) => {
        return <EventRecord>{
          addr,
          type: <EventType>eventObj.event_type,
          record: <BalanceRecord>{
            asset: <FinancialValue>{
              tickerSymbol: eventObj.asset,
              value: Number.parseFloat(eventObj.value.amount)
            },
            conversion: <FinancialValue>{
              tickerSymbol: "USD",
              charSymbol: <CharSymbol>{ symbol: "$", isLeftSide: true },
              value: Number.parseFloat(eventObj.value.usd_value)
            }
          },
          datetime: new Date(eventObj.timestamp * 1000)
        };
      })
    })
    .flat(1);
}
