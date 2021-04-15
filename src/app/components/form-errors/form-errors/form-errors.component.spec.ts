import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormErrorsComponent } from './form-errors.component';

describe('FormErrorsComponent', () => {
  let component: FormErrorsComponent;
  let fixture: ComponentFixture<FormErrorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormErrorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('turn errors into string array', () => {
    const errors = {
      whateverError: {
      message: 'whatever message'
      }, 
      anotherError: {
        message: 'another message'
      }
    }
    expect(component['turnErrorsIntoArray'](errors)).toEqual(["whatever message", "another message"]);
  })

  it('verify that error into string split two errors separated by /n', () => {
    const errors = {
      whateverError: {
      message: 'whatever message'
      }, 
      anotherError: {
        message: 'another message/nanother message two/nanother message three'
      }
    }
    expect(component['turnErrorsIntoArray'](errors)).toEqual(["whatever message", 'another message', 'another message two', 'another message three']);
  });
  
  it('verify that errors splited with /n not have an extra spaces', () => {
    const errors = {
      whateverError: {
      message: 'whatever message'
      }, 
      anotherError: {
        message: 'another message /n another message two /n another message three'
      }
    }
    expect(component['turnErrorsIntoArray'](errors)).toEqual(["whatever message", 'another message', 'another message two', 'another message three']);
  });

  it('verify that error list has no blank message', () => {    const errors = {
    whateverError: {
    message: 'whatever message'
    }, 
    anotherError: {
      message: ''
    }
  }
  expect(component['turnErrorsIntoArray'](errors)).toEqual(["whatever message"]);
  });
});
