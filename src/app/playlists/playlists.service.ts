import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, finalize, switchMap, tap } from 'rxjs/operators';
import { PlaylistsData, PlaylistsItemData } from './playlists.model';
import { LoadingService } from '../loading.service';

@Injectable()
export class PlaylistsService {
  private cachedPlaylists: PlaylistsData = null;
  private readonly playlistsUrl =
    'https://portal.organicfruitapps.com/programming-guides/v2/us_en-us/featured-playlists.json';

  constructor(private http: HttpClient, private loading: LoadingService) {}

  public getPlaylists(): Observable<PlaylistsData> {
    if (this.cachedPlaylists) {
      return of(this.cachedPlaylists);
    }

    this.loading.setLoading(true);
    return this.http.get<any>(this.playlistsUrl).pipe(
      switchMap((rawData) => {
        if (!rawData || !rawData.featuredPlaylists) {
          return throwError('Wrong Playlists Data');
        }
        const name: string = rawData.featuredPlaylists.name;
        const rawContent: any[] = rawData.featuredPlaylists.content || [];
        const content: PlaylistsItemData[] = rawContent.map((data) => {
          const { curator_name, ...itemData } = data;
          return { ...itemData, curatorName: curator_name };
        });
        return of({
          name,
          content,
        }).pipe(delay(2000));
      }),
      tap((playlistsData) => (this.cachedPlaylists = playlistsData)),
      finalize(() => this.loading.setLoading(false))
    );
  }
}
