import { HttpClient } from '@angular/common/http';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { of, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoadingService } from '../loading.service';
import { PlaylistService } from './playlist.service';

const mockPlaylistName = 'test playlist';

const mockHttpClient = {
  get: () =>
    timer(500).pipe(
      map(() => ({
        featuredPlaylists: {
          name: mockPlaylistName,
          content: [],
        },
      }))
    ),
};

const mockLoadingService = {
  setLoading: (_: boolean) => {},
};

describe('PlaylistService', () => {
  let service: PlaylistService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PlaylistService,
        { provide: HttpClient, useValue: mockHttpClient },
        { provide: LoadingService, useValue: mockLoadingService },
      ],
    });
    service = TestBed.inject(PlaylistService);
  });

  it('should be created without a cached playlist', () => {
    expect(service).toBeTruthy();
    expect(service['cachedPlaylist']).toBeFalsy();
  });

  it('should cache the playlist upon getPlaylist', fakeAsync(() => {
    service.getPlaylist().subscribe(() => {});
    tick(5000);
    expect(service['cachedPlaylist']).toBeTruthy();
  }));

  it('should return the cached playlist if present upon getPlaylist (without the http get)', fakeAsync(() => {
    service.getPlaylist().subscribe(() => {});
    tick(5000);
    const getSpy = spyOn(mockHttpClient, 'get');
    service.getPlaylist().subscribe((playlist) => {
      expect(playlist.name).toEqual(mockPlaylistName);
    });
    tick(5000);
    expect(getSpy).not.toHaveBeenCalled();
  }));

  it('should set and unset the loading getPlaylist', fakeAsync(() => {
    const loadingSpy = spyOn(mockLoadingService, 'setLoading');
    service.getPlaylist().subscribe(() => {});
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
    service.getPlaylist().subscribe(
      () => {},
      (err) => (error = err)
    );
    tick(5000);
    expect(loadingSpy.calls.allArgs()).toEqual([[true], [false]]);
    expect(error).toBeTruthy();
    mockHttpClient.get = getBackup;
  }));
});
