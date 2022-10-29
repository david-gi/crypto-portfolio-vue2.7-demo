import { BalanceRecord } from "./balance"
import { CharSymbol, FinancialRecord } from "./common"

export enum EventType {
  Withdrawal = "Withdrawal",
  Deposit = "Deposit",
}

export type EventRecord = {
  type: EventType;
  record: BalanceRecord;
  datetime: Date;
}

export type Event = {
  addr: string;
  records: Array<EventRecord>;
}

export const Convert = (json: any): Event[] => {
  return (Object.entries(json) as [string, any])
    .map(([addr, value]) => {
      return <Event>{
        addr,
        records: (<any[]>value.events)
          .map((record: any) => {
            return <EventRecord>{
              type: <EventType>record.event_type,
              record: <BalanceRecord>{
                asset: <FinancialRecord>{
                  tickerSymbol: record.asset,
                  value: record.value.amount
                },
                conversion: <FinancialRecord>{
                  tickerSymbol: "USD",
                  charSymbol: <CharSymbol>{ symbol: "$", isLeftSide: true },
                  value: record.value.usd_value
                }
              },
              datetime: new Date(record.timestamp * 1000)
            };
          })
      };
    });
}
