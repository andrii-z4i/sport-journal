import { UserInformation } from './models/user-information.model';
import { DatabaseService } from './services/database.service';
import { Observable } from 'rxjs/Observable';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  
  title = 'app works!';
  email: string = null;
  name: string = null;

  private userInfo: Subscription;
  
  constructor(dataBaseService: DatabaseService) {
    this.userInfo = dataBaseService.GetUserInformation().subscribe(
      value => {
        this.email = value.email;
        this.name = value.name;
      }
    );
  }
  ngOnDestroy(): void {
    this.userInfo.unsubscribe();
  }
  
}
