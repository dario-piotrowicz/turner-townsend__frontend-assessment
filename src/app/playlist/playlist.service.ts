import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { PlaylistData } from './playlist.model';

@Injectable()
export class PlaylistService {
  private readonly playlistUrl =
    'https://portal.organicfruitapps.com/programming-guides/v2/us_en-us/featured-playlists.json';

  constructor(private http: HttpClient) {}

  public getPlaylist(): Observable<PlaylistData> {
    return this.http.get<any>(this.playlistUrl).pipe(
      switchMap((rawData) => {
        if (!rawData && !rawData.featuredPlaylists) {
          return throwError('Wrong Playlist Data');
        }
        return of({
          name: rawData.featuredPlaylists.name,
          content: rawData.featuredPlaylists.content ?? [],
        });
      })
    );
  }
}
