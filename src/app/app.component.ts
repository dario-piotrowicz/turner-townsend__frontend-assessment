import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadingService } from './loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public loading: Observable<boolean>;

  constructor(private loadingService: LoadingService) {
    this.loading = this.loadingService.isLoading;
  }
}
