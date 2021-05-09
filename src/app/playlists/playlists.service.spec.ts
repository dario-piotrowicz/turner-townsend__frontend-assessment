import { HttpClient } from '@angular/common/http';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { of, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoadingService } from '../loading.service';
import { PlaylistsService } from './playlists.service';

const mockPlaylistsName = 'test playlists';

const mockHttpClient = {
  get: () =>
    timer(500).pipe(
      map(() => ({
        featuredPlaylists: {
          name: mockPlaylistsName,
          content: [],
        },
      }))
    ),
};

const mockLoadingService = {
  setLoading: (_: boolean) => {},
};

describe('PlaylistsService', () => {
  let service: PlaylistsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PlaylistsService,
        { provide: HttpClient, useValue: mockHttpClient },
        { provide: LoadingService, useValue: mockLoadingService },
      ],
    });
    service = TestBed.inject(PlaylistsService);
  });

  it('should be created without a cached playlists', () => {
    expect(service).toBeTruthy();
    expect(service['cachedPlaylists']).toBeFalsy();
  });

  it('should cache the playlists upon getPlaylists', fakeAsync(() => {
    service.getPlaylists().subscribe(() => {});
    tick(5000);
    expect(service['cachedPlaylists']).toBeTruthy();
  }));

  it('should return the cached playlists if present upon getPlaylists (without the http get)', fakeAsync(() => {
    service.getPlaylists().subscribe(() => {});
    tick(5000);
    const getSpy = spyOn(mockHttpClient, 'get');
    service.getPlaylists().subscribe((playlists) => {
      expect(playlists.name).toEqual(mockPlaylistsName);
    });
    tick(5000);
    expect(getSpy).not.toHaveBeenCalled();
  }));

  it('should set and unset the loading getPlaylists', fakeAsync(() => {
    const loadingSpy = spyOn(mockLoadingService, 'setLoading');
    service.getPlaylists().subscribe(() => {});
    expect(loadingSpy).toHaveBeenCalledOnceWith(true);
    loadingSpy.calls.reset();
    tick(5000);
    expect(loadingSpy).toHaveBeenCalledOnceWith(false);
  }));

  it("should return an error observable and unset the loading if the get doens't return correct data", fakeAsync(() => {
    const loadingSpy = spyOn(mockLoadingService, 'setLoading');
    const getBackup = mockHttpClient.get;
    mockHttpClient.get = () => of({} as any);
    let error: string;
    service.getPlaylists().subscribe(
      () => {},
      (err) => (error = err)
    );
    tick(5000);
    expect(loadingSpy.calls.allArgs()).toEqual([[true], [false]]);
    expect(error).toBeTruthy();
    mockHttpClient.get = getBackup;
  }));
});
