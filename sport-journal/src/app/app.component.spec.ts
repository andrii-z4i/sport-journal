import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AngularFireDatabase } from "angularfire2/database";
import { Observable } from "rxjs/Rx";

let fireBaseItemsStub = { list: () => {}};
let fireBaseMock = Observable.of([
  { $value: 'b', $key: 'a'},
  { $value: 'd', $key: 'c'}
]);

describe('AppComponent', () => {
  beforeEach(async(() => {
    spyOn(fireBaseItemsStub, 'list').and.returnValue(fireBaseMock);

    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [
        {provide: AngularFireDatabase, useValue: fireBaseItemsStub} 
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

  it('should render items in a ul tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('app works!');

    let liElement = compiled.querySelector('ul > li');
    expect(liElement.textContent).toContain('a - b');
    liElement = liElement.nextElementSibling;
    expect(liElement.textContent).toContain('c - d');
  }));
});
