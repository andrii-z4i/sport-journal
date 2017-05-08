import { DatabaseService } from './services/database.service';
import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Observable } from "rxjs/Rx";

let dataBaseServiceStub = { GetUserInformation: () => {} };

describe('AppComponent', () => {
  beforeEach(async(() => {
    spyOn(dataBaseServiceStub, 'GetUserInformation').and.returnValue(Observable.of({email: 'AAA@gmail.com', name: 'AAA'}));

    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [
        {provide: DatabaseService, useValue: dataBaseServiceStub}
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app works!'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app works!');
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('app works!');
  }));

  it('should render name and email', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('app works!');

    let liElement = compiled.querySelector('p');
    expect(liElement.textContent).toContain('userName: AAA');
    liElement = liElement.nextElementSibling;
    expect(liElement.textContent).toContain('userEmail: AAA@gmail.com');
  }));
});
