import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PlaylistData } from '../playlist.model';
import { PlaylistService } from '../playlist.service';

@Component({
  selector: 'app-playlist-page',
  templateUrl: './playlist-page.component.html',
  styleUrls: ['./playlist-page.component.scss'],
})
export class PlaylistPageComponent implements OnInit {
  public playlist: Observable<PlaylistData>;
  public error: any = null;

  constructor(private playlistService: PlaylistService) {}

  ngOnInit(): void {
    this.playlist = this.playlistService.getPlaylist().pipe(
      catchError((error) => {
        this.error = error;
        return of({ name: '', content: [] });
      })
    );
  }
}
