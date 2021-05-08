import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoadingService } from './loading.service';
import { LoadingComponent } from './loading/loading.component';

const mockLoadingService = {
  isLoading: of(true),
};

describe('AppComponent', () => {
  let fixture;
  let app;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent, HeaderComponent, LoadingComponent],
      providers: [{ provide: LoadingService, useValue: mockLoadingService }],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should listen to the loading service isLoading observable', () => {
    expect(app.loading).toEqual(mockLoadingService.isLoading);
  });
});
