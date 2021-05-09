import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PlaylistsRoutingModule } from './playlists-routing.module';
import { PlaylistsPageComponent } from './playlists-page/playlists-page.component';
import { PlaylistsService } from './playlists.service';
import { PlaylistsComponent } from './playlists/playlists.component';
import { PlaylistsItemComponent } from './playlists-item/playlists-item.component';

@NgModule({
  declarations: [
    PlaylistsPageComponent,
    PlaylistsComponent,
    PlaylistsItemComponent,
  ],
  imports: [CommonModule, HttpClientModule, PlaylistsRoutingModule],
  providers: [PlaylistsService],
})
export class PlaylistsModule {}
