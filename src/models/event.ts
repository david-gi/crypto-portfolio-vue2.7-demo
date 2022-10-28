import { BalanceRecord } from "./balance"

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

