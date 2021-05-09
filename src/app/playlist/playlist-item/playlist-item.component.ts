import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PlaylistItemData } from '../playlist.model';

@Component({
  selector: 'app-playlist-item',
  templateUrl: './playlist-item.component.html',
  styleUrls: ['./playlist-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaylistItemComponent {
  @Input() data: PlaylistItemData;
}
