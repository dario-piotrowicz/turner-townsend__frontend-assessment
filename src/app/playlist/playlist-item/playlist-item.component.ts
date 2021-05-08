import { Component, Input, OnInit } from '@angular/core';
import { PlaylistItemData } from '../playlist.model';

@Component({
  selector: 'app-playlist-item',
  templateUrl: './playlist-item.component.html',
  styleUrls: ['./playlist-item.component.scss'],
})
export class PlaylistItemComponent implements OnInit {
  @Input() data: PlaylistItemData;

  constructor() {}

  ngOnInit(): void {}
}
