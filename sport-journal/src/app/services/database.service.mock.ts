import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { DatabaseServiceInterface } from './database.service.interface';
import {DistanceTarget} from '../models/distance-target.model';
import {WeightTarget} from '../models/weight-target.model';
import {DistanceRecord} from '../models/distance-record.model';
import {WeightRecord} from '../models/weight-record.model';
import {IngestionRecord} from '../models/ingestion-record.model';

@Injectable()
export class DatabaseServiceMock implements DatabaseServiceInterface {

  constructor() {

  }

  // targets
  public FetchDistanceTargetByDate(date: Date): Observable<DistanceTarget> {
    return Observable.create((resolver) => {
      resolver.next(<DistanceTarget>{});
    });
  }
  public FetchWeightTargetByDate(date: Date): Observable<WeightTarget>{
    return Observable.create((resolver) => {
      resolver.next(<WeightTarget>{});
    });
  }

  public StoreDistanceTarget(target: DistanceTarget): Observable<void> {
    return Observable.create((resolver) => {
      resolver.next();
    });
  }
  
  public StoreWeightTarget(target: WeightTarget): Observable<void> {
    return Observable.create((resolver) => {
      resolver.next();
    });
  }

  // records
  public FetchWeightRecordsByDate(date: Date): Observable<WeightRecord[]> {
    return Observable.create((resolver) => {
      resolver.next([<WeightRecord>{}]);
    });
  }

  public FetchDistanceRecordsByDate(date: Date): Observable<DistanceRecord[]> {
    return Observable.create((resolver) => {
      resolver.next([<DistanceRecord>{}]);
    });
  }
  public FetchIngestionRecordsByDate(date: Date): Observable<IngestionRecord[]> {
    return Observable.create((resolver) => {
      resolver.next([<IngestionRecord>{}]);
    });
  }

  public StoreDistanceRecord(record: DistanceRecord): Observable<void> {
    return Observable.create((resolver) => {
      resolver.next();
    });
  }

  public StoreWeightRecord(record: WeightRecord): Observable<void> {
    return Observable.create((resolver) => {
      resolver.next();
    });
  }

  public StoreIngestionRecord(record: IngestionRecord): Observable<void> {
    return Observable.create((resolver) => {
      resolver.next();
    });
  }

}
