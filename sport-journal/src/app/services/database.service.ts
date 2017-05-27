import { Observable } from 'rxjs/Observable';
import { UserInformation } from './../models/user-information.model';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { DatabaseServiceInterface } from './database.service.interface';
import {DistanceTarget} from '../models/distance-target.model';
import {WeightTarget} from '../models/weight-target.model';
import {DistanceRecord} from '../models/distance-record.model';
import {WeightRecord} from '../models/weight-record.model';
import {IngestionRecord} from '../models/ingestion-record.model';

@Injectable()
export class DatabaseService implements DatabaseServiceInterface {

  constructor(private angularFireBase: AngularFireDatabase) {

  }

  public GetUserInformation() : Observable<UserInformation> {
    let userInformation = new Observable<UserInformation>(
      observer => {
        this.angularFireBase.list('/user').subscribe(
          value => {
            if (value === null || value.length !== 2) {
              observer.error('Not enough data');
              return;
            }
            let email = value.find(data => data.$key === 'email');
            let name = value.find(data => data.$key === 'name');
            let userInformationData = <UserInformation>{
              email: email.$value, 
              name: name.$value
            }
            observer.next(userInformationData);
          }
        )
      }
    );
    return userInformation;
  }


  // targets
  public FetchDistanceTargetByDate(date: Date): Observable<DistanceTarget> {
    return Observable.create((resolver) => {
      resolver.next(<DistanceTarget>{date: new Date(), distance: 12});
      return function() {
        console.log('Disposed');
      };
    });
  }
  public FetchWeightTargetByDate(date: Date): Observable<WeightTarget> | WeightTarget {
    return <WeightTarget>{};
  }

  public StoreDistanceTarget(target: DistanceTarget): Observable<void> | void {
  }
  
  public StoreWeightTarget(target: WeightTarget): Observable<void> | void {
  }

  // records
  public FetchWeightRecordsByDate(date: Date): Observable<WeightRecord[]> | WeightRecord[] {
    return [<WeightRecord>{}];
  }

  public FetchDistanceRecordsByDate(date: Date): Observable<DistanceRecord[]> | DistanceRecord[] {
    return [<DistanceRecord>{}];
  }
  public FetchIngestionRecordsByDate(date: Date): Observable<IngestionRecord[]> | IngestionRecord[] {
    return [<IngestionRecord>{}];
  }

  public StoreDistanceRecord(record: DistanceRecord): Observable<void> | void {
  }

  public StoreWeightRecord(record: WeightRecord): Observable<void> | void {
  }

  public StoreIngestionRecord(record: IngestionRecord): Observable<void> | void {
  }

}
