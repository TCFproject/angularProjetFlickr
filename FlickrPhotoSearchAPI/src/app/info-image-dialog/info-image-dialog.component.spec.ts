import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoImageDialogComponent } from './info-image-dialog.component';

describe('InfoImageDialogComponent', () => {
  let component: InfoImageDialogComponent;
  let fixture: ComponentFixture<InfoImageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoImageDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoImageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
