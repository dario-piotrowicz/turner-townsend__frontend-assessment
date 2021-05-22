import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  public isLoading = this.isLoadingSubject.asObservable();

  public setLoading(loading: boolean): void {
    if (loading !== this.isLoadingSubject.value) {
      this.isLoadingSubject.next(loading);
    }
  }
}
