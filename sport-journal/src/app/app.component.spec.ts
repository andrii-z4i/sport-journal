import { DatabaseServiceInterface } from './services/database.service.interface';
import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Observable } from "rxjs/Rx";
import { DatabaseServiceMock } from './services/database.service.mock';

describe('AppComponent', () => {
  beforeEach(async(() => {
    let dbObj = new DatabaseServiceMock();
    let _f = spyOn(dbObj, 'FetchDistanceTargetByDate');
    _f.and.returnValue(Observable.of({date: new Date(), distance: 25}));

    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [
        DatabaseServiceMock,
        {
          provide: DatabaseServiceInterface,
          useValue: dbObj 
        }
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

  it('should render distance', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('app works!');

    let liElement = compiled.querySelector('p');
    expect(liElement.textContent).toContain('targetDistance: 25');
  }));
});
