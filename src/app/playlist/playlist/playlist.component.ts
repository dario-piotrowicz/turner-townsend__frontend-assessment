import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PlaylistData } from '../playlist.model';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaylistComponent {
  @Input() playlistData: PlaylistData;
}
