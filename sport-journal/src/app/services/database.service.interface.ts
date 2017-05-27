import { Observable } from 'rxjs/Observable';
import {DistanceTarget} from '../models/distance-target.model';
import {WeightTarget} from '../models/weight-target.model';
import {DistanceRecord} from '../models/distance-record.model';
import {WeightRecord} from '../models/weight-record.model';
import {IngestionRecord} from '../models/ingestion-record.model';

export abstract class DatabaseServiceInterface {
  // targets
  FetchDistanceTargetByDate: (date: Date) => Observable<DistanceTarget>;
  FetchWeightTargetByDate: (date: Date) => Observable<WeightTarget> | WeightTarget;

  StoreDistanceTarget: (target: DistanceTarget) => Observable<void> | void;
  StoreWeightTarget: (target: WeightTarget) => Observable<void> | void;

  // records
  FetchWeightRecordsByDate: (date: Date) => Observable<WeightRecord[]> | WeightRecord[];
  FetchDistanceRecordsByDate: (date: Date) => Observable<DistanceRecord[]> | DistanceRecord[];
  FetchIngestionRecordsByDate: (date: Date) => Observable<IngestionRecord[]> | IngestionRecord[];

  StoreDistanceRecord: (record: DistanceRecord) => Observable<void> | void;
  StoreWeightRecord: (record: WeightRecord) => Observable<void> | void;
  StoreIngestionRecord: (record: IngestionRecord) => Observable<void> | void;
}
