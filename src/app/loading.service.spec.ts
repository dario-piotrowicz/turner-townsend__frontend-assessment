import { take } from 'rxjs/operators';
import { LoadingService } from './loading.service';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    service = new LoadingService();
  });

  it('should start with _isLoading set to false', () => {
    expect(service['_isLoading'].value).toEqual(false);
  });

  it('should update _isLoading and emit with the correct value upon setLoading', () => {
    const _isLoading = service['_isLoading'];
    service.setLoading(true);
    expect(_isLoading.value).toEqual(true);
    service.isLoading
      .pipe(take(1))
      .subscribe((value) => expect(value).toEqual(true));
  });
});
