import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, finalize, switchMap, tap } from 'rxjs/operators';
import { PlaylistData, PlaylistItemData } from './playlist.model';
import { LoadingService } from '../loading.service';

@Injectable()
export class PlaylistService {
  private cachedPlaylist: PlaylistData = null;
  private readonly playlistUrl =
    'https://portal.organicfruitapps.com/programming-guides/v2/us_en-us/featured-playlists.json';

  constructor(private http: HttpClient, private loading: LoadingService) {}

  public getPlaylist(): Observable<PlaylistData> {
    if (this.cachedPlaylist) {
      return of(this.cachedPlaylist);
    }

    this.loading.setLoading(true);
    return this.http.get<any>(this.playlistUrl).pipe(
      switchMap((rawData) => {
        if (!rawData || !rawData.featuredPlaylists) {
          return throwError('Wrong Playlist Data');
        }
        const name: string = rawData.featuredPlaylists.name;
        const rawContent: any[] = rawData.featuredPlaylists.content || [];
        const content: PlaylistItemData[] = rawContent.map((data) => {
          const { curator_name, ...itemData } = data;
          return { ...itemData, curatorName: curator_name };
        });
        return of({
          name,
          content,
        }).pipe(delay(2000));
      }),
      tap((playlistData) => (this.cachedPlaylist = playlistData)),
      finalize(() => this.loading.setLoading(false))
    );
  }
}
