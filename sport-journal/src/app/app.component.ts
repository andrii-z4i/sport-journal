import { UserInformation } from './models/user-information.model';
import { DatabaseServiceInterface } from './services/database.service.interface';
import { Observable } from 'rxjs/Observable';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs/Subscription";
import {DistanceTarget} from './models/distance-target.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  
  title = 'app works!';
  distance: number = null;

  private targetSubscription: Subscription;
  
  constructor(dataBaseService: DatabaseServiceInterface) {

    this.targetSubscription = dataBaseService.FetchDistanceTargetByDate(new Date()).subscribe(
      value => {
        this.distance = value.distance;
      }
    );

  }

  ngOnDestroy(): void {
    this.targetSubscription.unsubscribe();
  }
  
}
