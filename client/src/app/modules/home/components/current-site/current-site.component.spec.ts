import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentSiteComponent } from './current-site.component';

describe('CurrentSiteComponent', () => {
  let component: CurrentSiteComponent;
  let fixture: ComponentFixture<CurrentSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentSiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
