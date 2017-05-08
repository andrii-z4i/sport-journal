import { Observable } from 'rxjs/Observable';
import { UserInformation } from './../models/user-information.model';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";

@Injectable()
export class DatabaseService {

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
}
