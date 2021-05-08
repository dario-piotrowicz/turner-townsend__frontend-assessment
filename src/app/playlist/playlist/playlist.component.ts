import { Component, Input } from '@angular/core';
import { PlaylistData } from '../playlist.model';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss'],
})
export class PlaylistComponent {
  @Input() playlistData: PlaylistData;
}
