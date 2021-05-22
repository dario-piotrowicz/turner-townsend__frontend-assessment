import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PlaylistsData, PlaylistsItemData } from '../playlists.model';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaylistsComponent {
  @Input() playlistsData: PlaylistsData;

  playlistsTrackByFn(_: number, playlist: PlaylistsItemData): string {
    return playlist.id;
  }
}
