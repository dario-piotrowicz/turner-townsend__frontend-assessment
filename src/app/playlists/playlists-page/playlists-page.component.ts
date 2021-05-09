import { animate, style, transition, trigger } from '@angular/animations';
import { ViewportScroller } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnInit,
} from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PlaylistsData } from '../playlists.model';
import { PlaylistsService } from '../playlists.service';

@Component({
  selector: 'app-playlists-page',
  templateUrl: './playlists-page.component.html',
  styleUrls: ['./playlists-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('toTopBtn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0)' }),
        animate(250, style({ opacity: 1, transform: 'scale(1)' })),
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: 'scale(1)' }),
        animate(250, style({ opacity: 0, transform: 'scale(0)' })),
      ]),
    ]),
  ],
})
export class PlaylistsPageComponent implements OnInit {
  public playlists: Observable<PlaylistsData>;
  public error: any = null;
  public scrollToTopIsVisible = false;

  constructor(
    private playlistsService: PlaylistsService,
    private scroller: ViewportScroller
  ) {}

  ngOnInit(): void {
    this.playlists = this.playlistsService.getPlaylists().pipe(
      catchError((error) => {
        this.error = error;
        return of({ name: '', content: [] });
      })
    );
  }

  toTopClickEventHandler(): void {
    this.scroller.scrollToPosition([0, 0]);
  }

  @HostListener('window:scroll') onScrollHandler(): void {
    const yPosition = this.scroller.getScrollPosition()[1];
    this.scrollToTopIsVisible = yPosition >= 500;
  }
}
