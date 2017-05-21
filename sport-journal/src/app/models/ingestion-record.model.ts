import {IngestionMenuItemRecord} from './ingestion-menu-item.model';

export interface IngestionRecord {
  date: Date;
  kind: "breakfast" | "lunch" | "dinner" | "unexpected";
  menu: IngestionMenuItemRecord[];
}
