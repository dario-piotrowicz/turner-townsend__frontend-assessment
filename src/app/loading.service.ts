import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private _isLoading = new BehaviorSubject<boolean>(false);
  public isLoading = this._isLoading.asObservable();

  public setLoading(loading: boolean) {
    if (loading !== this._isLoading.value) {
      this._isLoading.next(loading);
    }
  }
}
