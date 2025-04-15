import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';
import { MatListModule } from '@angular/material/list';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        MatButtonModule,
        MatIconModule,
        MatToolbarModule,
        RouterTestingModule,
        MatListModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have a mat-drawer container with backdrop disabled', () => {
    const drawerContainer = fixture.debugElement.query(By.css('mat-drawer-container'));
    expect(drawerContainer).toBeTruthy();
    expect(drawerContainer.nativeElement.hasBackdrop).toBeFalse();
  });

  it('should have a button to toggle the drawer', () => {
    const toggleButton = fixture.debugElement.query(By.css('.menu-button'));
    expect(toggleButton).toBeTruthy();
  });

  it('should toggle the drawer when the menu button is clicked', () => {
    const toggleButton = fixture.debugElement.query(By.css('.menu-button'));
    const drawer = fixture.debugElement.query(By.css('mat-drawer')).componentInstance;

    spyOn(drawer, 'toggle');

    toggleButton.triggerEventHandler('click', null);
    expect(drawer.toggle).toHaveBeenCalled();
  });

  it('should have a navigation item for "Cadastro de pessoas"', () => {
    const navItem = fixture.debugElement.query(By.css('a[routerLink="/people-registration"]'));
    expect(navItem).toBeTruthy();
    expect(navItem.nativeElement.textContent).toContain('Cadastro de pessoas');
  });

  it('should contain a logo image', () => {
    const logoImage = fixture.debugElement.query(By.css('.logo'));
    expect(logoImage).toBeTruthy();
    expect(logoImage.nativeElement.src).toContain('logo-company.svg');
  });
});
