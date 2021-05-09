import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PlaylistsData } from '../playlists.model';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaylistsComponent {
  @Input() playlistsData: PlaylistsData;
}
