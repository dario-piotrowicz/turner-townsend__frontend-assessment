import { take } from 'rxjs/operators';
import { LoadingService } from './loading.service';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    service = new LoadingService();
  });

  it('should start with isLoadingSubject set to false', () => {
    expect( (service as any).isLoadingSubject.value).toEqual(false);
  });

  it('should update isLoadingSubject and emit with the correct value upon setLoading', () => {
    const isLoading = (service as any).isLoadingSubject;
    service.setLoading(true);
    expect(isLoading.value).toEqual(true);
    service.isLoading
      .pipe(take(1))
      .subscribe((value) => expect(value).toEqual(true));
  });
});
