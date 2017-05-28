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

  private CheckValue(value: any, fieldsNumber: number, observer: any) {
    if (value === null || value.length !== fieldsNumber) {
      observer.error('Not enough data');
      return
    }
  }

  private GetValueFromField(value: any, fieldName: string, observer: any): any {
    if (value == null) {
      observer.error('Not enough data');
      return;
    }
    let keyValue = value.find(data => data.$key === fieldName);
    if (keyValue === undefined) {
      observer.error('Field '+ fieldName + ' not found');
      return;
    }
 
    return keyValue.$value; 
  }

  public GetUserInformation() : Observable<UserInformation> {
    let userInformation = new Observable<UserInformation>(
      observer => {
        this.angularFireBase.list('/user').subscribe(
          value => {
            this.CheckValue(value, 2, observer);
            let userInformationData = <UserInformation>{
              email: this.GetValueFromField(value, 'email', observer), 
              name: this.GetValueFromField(value, 'name', observer)
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
    return new Observable<DistanceTarget>(
      observer => {
        this.angularFireBase.list('/distance-target').subscribe(
          value => {
            this.CheckValue(value, 2, observer);
            let distanceTarget = <DistanceTarget>{
              date: this.GetValueFromField(value, 'date', observer),
              distance: this.GetValueFromField(value, 'distance', observer)
            }
            observer.next(distanceTarget);
          }
        )
      });
  }

  public FetchWeightTargetByDate(date: Date): Observable<WeightTarget>{
    return Observable.create((observer) => {
      observer.next(<WeightTarget>{});
    });
  }

  public StoreDistanceTarget(target: DistanceTarget): Observable<void> {
    return Observable.create((observer) => {
      observer.next();
    });
  }
  
  public StoreWeightTarget(target: WeightTarget): Observable<void> {
    return Observable.create((observer) => {
      observer.next();
    });
  }

  // records
  public FetchWeightRecordsByDate(date: Date): Observable<WeightRecord[]> {
    return Observable.create((observer) => {
      observer.next([<WeightRecord>{}]);
    });
  }

  public FetchDistanceRecordsByDate(date: Date): Observable<DistanceRecord[]> {
    return Observable.create((observer) => {
      observer.next([<DistanceRecord>{}]);
    });
  }
  public FetchIngestionRecordsByDate(date: Date): Observable<IngestionRecord[]> {
    return Observable.create((observer) => {
      observer.next([<IngestionRecord>{}]);
    });
  }

  public StoreDistanceRecord(record: DistanceRecord): Observable<void> {
    return Observable.create((observer) => {
      observer.next();
    });
  }

  public StoreWeightRecord(record: WeightRecord): Observable<void> {
    return Observable.create((observer) => {
      observer.next();
    });
  }

  public StoreIngestionRecord(record: IngestionRecord): Observable<void> {
    return Observable.create((observer) => {
      observer.next();
    });
  }

}
