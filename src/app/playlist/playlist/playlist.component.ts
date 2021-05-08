import { Component, Input, OnInit } from '@angular/core';
import { PlaylistData } from '../playlist.model';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss'],
})
export class PlaylistComponent implements OnInit {
  @Input() playlistData: PlaylistData;

  constructor() {}

  ngOnInit(): void {}
}
