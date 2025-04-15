import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ConfirmDialogComponent } from './confirm-dialog.component';

describe('ConfirmationDialogComponent', () => {
  let component: ConfirmDialogComponent;
  let fixture: ComponentFixture<ConfirmDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule, ConfirmDialogComponent],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            title: 'Test Title',
            message: 'Are you sure?',
            showCloseButton: true,
            cancelButtonText: 'Cancel',
            confirmButtonText: 'Confirm',
          },
        },
        { provide: MatDialogRef, useValue: {} },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display title', () => {
    const titleElement: HTMLElement = fixture.nativeElement.querySelector('h2');
    expect(titleElement.textContent).toContain('Test Title');
  });

  it('should display message when provided', () => {
    const messageElement: HTMLElement = fixture.nativeElement.querySelector('p');
    expect(messageElement.textContent).toContain('Are you sure?');
  });

  it('should not display message when not provided', () => {
    component.data.message = undefined;
    fixture.detectChanges();
    const messageElement: HTMLElement = fixture.nativeElement.querySelector('p');
    expect(messageElement).toBeNull();
  });

  it('should call onCancel when cancel button is clicked', () => {
    spyOn(component, 'onCancel');
    const cancelButton = fixture.debugElement.query(By.css('button[mat-button]'));
    cancelButton.triggerEventHandler('click', null);
    expect(component.onCancel).toHaveBeenCalled();
  });

  it('should call onConfirm when confirm button is clicked', () => {
    spyOn(component, 'onConfirm');
    const confirmButton = fixture.debugElement.query(By.css('button[mat-raised-button]'));
    confirmButton.triggerEventHandler('click', null);
    expect(component.onConfirm).toHaveBeenCalled();
  });

  it('should set default cancel button text to "Cancelar" if not provided', () => {
    component.data.cancelButtonText = undefined;
    fixture.detectChanges();
    const cancelButton: HTMLElement = fixture.nativeElement.querySelector('button[mat-button]');
    expect(cancelButton.textContent).toContain('Cancelar');
  });

  it('should set default confirm button text to "Confirmar" if not provided', () => {
    component.data.confirmButtonText = undefined;
    fixture.detectChanges();
    const confirmButton: HTMLElement = fixture.nativeElement.querySelector('button[mat-raised-button]');
    expect(confirmButton.textContent).toContain('Confirmar');
  });

  it('should apply default styling if no button color is provided', () => {
    const cancelButton: HTMLElement = fixture.nativeElement.querySelector('button[mat-button]');
    expect(cancelButton.style.backgroundColor).toBe('rgb(255, 255, 255)');
  });
});
