import { FinancialRecord } from "./financial";

export type BalanceRecord = {
  asset: FinancialRecord;
  conversion: FinancialRecord;
};

export type Balance = {
  addr: string;
  records: Array<BalanceRecord>;
};
