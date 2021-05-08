import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PlaylistRoutingModule } from './playlist-routing.module';
import { PlaylistPageComponent } from './playlist-page/playlist-page.component';
import { PlaylistService } from './playlist.service';
import { PlaylistComponent } from './playlist/playlist.component';
import { PlaylistItemComponent } from './playlist-item/playlist-item.component';

@NgModule({
  declarations: [PlaylistPageComponent, PlaylistComponent, PlaylistItemComponent],
  imports: [CommonModule, HttpClientModule, PlaylistRoutingModule],
  providers: [PlaylistService],
})
export class PlaylistModule {}
