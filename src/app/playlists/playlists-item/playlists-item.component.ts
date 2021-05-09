import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PlaylistsItemData } from '../playlists.model';

@Component({
  selector: 'app-playlists-item',
  templateUrl: './playlists-item.component.html',
  styleUrls: ['./playlists-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaylistsItemComponent {
  @Input() data: PlaylistsItemData;
}
