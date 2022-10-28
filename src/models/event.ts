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
          .map((jEvent: any) => {
            return <EventRecord>{
              type: <EventType>jEvent.event_type,
              record: <BalanceRecord>{
                asset: <FinancialRecord>{
                  tickerSymbol: jEvent.asset,
                  value: jEvent.value.amount
                },
                conversion: <FinancialRecord>{
                  tickerSymbol: "USD",
                  charSymbol: <CharSymbol>{ symbol: "$", isLeftSide: true },
                  value: jEvent.value.usd_value
                }
              },
              datetime: new Date(jEvent.timestamp)
            };
          })
      };
    });
}
