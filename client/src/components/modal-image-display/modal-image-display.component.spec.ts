import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalImageDisplayComponent } from './modal-image-display.component';

describe('ModalImageDisplayComponent', () => {
  let component: ModalImageDisplayComponent;
  let fixture: ComponentFixture<ModalImageDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalImageDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalImageDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
