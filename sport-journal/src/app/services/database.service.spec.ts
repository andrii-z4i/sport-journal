import { UserInformation } from './../models/user-information.model';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { TestBed, inject } from '@angular/core/testing';

import { DatabaseService } from './database.service';

let angularFireDatabaseStub = { list: () => {} };
let listReturnMock = Observable.of([
  {$key: 'email', $value: 'AAA@gmail.com'},
  {$key: 'name', $value: 'AAA'}
]);

let spyObject: jasmine.Spy;

describe('DatabaseService', () => {
  
  beforeEach(() => {
    spyObject = spyOn(angularFireDatabaseStub, 'list');
    spyObject.and.returnValue(listReturnMock);

    TestBed.configureTestingModule({
      providers: [
        DatabaseService,
        {provide: AngularFireDatabase, useValue: angularFireDatabaseStub}]
    });
  });

  it('should ...', inject([DatabaseService], (service: DatabaseService) => {
    expect(service).toBeTruthy();
  }));

  it('should return userInfo', inject([DatabaseService],  (service: DatabaseService) => {
    service.GetUserInformation().subscribe(
      value => {
        expect(value.name).toEqual('AAA');
        expect(value.email).toEqual('AAA@gmail.com');
      }
    )
    
  }));

  it('should throw error', inject([DatabaseService], (service: DatabaseService) => {
    spyObject.and.returnValue(Observable.of(null));
    let subscription = service.GetUserInformation().subscribe(
      data => {
        fail('strange');
      },
      error => {
        expect(error).toEqual('Not enough data');
      }
    );
  }));
});
