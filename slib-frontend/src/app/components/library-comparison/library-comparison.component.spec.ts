import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryComparisonComponent } from './library-comparison.component';

describe('LibraryComparisonComponent', () => {
  let component: LibraryComparisonComponent;
  let fixture: ComponentFixture<LibraryComparisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryComparisonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibraryComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
