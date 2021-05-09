import { ViewportScroller } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DebugElement,
  Input,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';
import { PlaylistData } from '../playlist.model';
import { PlaylistService } from '../playlist.service';

import { PlaylistPageComponent } from './playlist-page.component';

const mockPlaylistData: PlaylistData = {
  name: 'test playlist',
  content: [0, 1, 2, 3, 4].map((i) => ({
    id: `${i}`,
    name: `test song ${i}`,
    curatorName: 'test curator',
    url: `test-url-${i}`,
    artwork: `test-artwork-${i}`,
    kind: '',
  })),
};

const mockPlaylistService = {
  getPlaylist: () => of(mockPlaylistData),
};

const mockScrollerService = {
  getScrollPosition: () => [0, 550],
  scrollToPosition: ([_x, _y]) => {},
};

@Component({
  selector: 'app-playlist',
  template: `<div class="playlist">
    {{ playlistData.name }}_{{ playlistData.content.length }}
  </div>`,
})
class MockPlaylistComponent {
  @Input() playlistData: PlaylistData;
}

describe('PlaylistPageComponent', () => {
  let component: PlaylistPageComponent;
  let fixture: ComponentFixture<PlaylistPageComponent>;
  let el: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlaylistPageComponent, MockPlaylistComponent],
      providers: [
        { provide: PlaylistService, useValue: mockPlaylistService },
        { provide: ViewportScroller, useValue: mockScrollerService },
      ],
    })
      .overrideComponent(PlaylistPageComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistPageComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should not display an error message if no errors occurred', () => {
    const errorEl = el.query(By.css('.error'));
    expect(errorEl).toBeFalsy();
  });

  it('should not display the playlist if an error occurred', () => {
    const getPlaylistBackup = mockPlaylistService.getPlaylist;
    mockPlaylistService.getPlaylist = () => throwError('An Error Occurred');
    component.ngOnInit();
    fixture.detectChanges();
    const playlistEl = el.query(By.css('.playlist'));
    expect(playlistEl).toBeFalsy();
    mockPlaylistService.getPlaylist = getPlaylistBackup;
  });

  it('should display the playlist if no errors occurred', () => {
    const playlistEl = el.query(By.css('.playlist')).nativeElement;
    const playlistElText = playlistEl.innerText.toLowerCase();
    expect(playlistElText).toEqual(
      `${mockPlaylistData.name.toLowerCase()}_${
        mockPlaylistData.content.length
      }`
    );
  });

  it('should display an error message if an error occurred', () => {
    const getPlaylistBackup = mockPlaylistService.getPlaylist;
    mockPlaylistService.getPlaylist = () => throwError('An Error Occurred');
    component.ngOnInit();
    fixture.detectChanges();
    const errorEl = el.query(By.css('.error'));
    expect(errorEl).toBeTruthy();
    mockPlaylistService.getPlaylist = getPlaylistBackup;
  });

  it('should scroll to the top of the page when the to-top button is clicked', () => {
    const scrollToPositionSpy = spyOn(mockScrollerService, 'scrollToPosition');
    component.toTopClickEventHandler();
    expect(scrollToPositionSpy).toHaveBeenCalledOnceWith([0, 0]);
  });

  it('should display the to-top button upon scrolling if the y position is at least 500', () => {
    const getScrollPositionBackup = mockScrollerService.getScrollPosition;
    mockScrollerService.getScrollPosition = () => [0, 500];
    window.dispatchEvent(new Event('scroll'));
    expect(component.scrollToTopIsVisible).toBeTrue();
    mockScrollerService.getScrollPosition = getScrollPositionBackup;
  });

  it('should not display the to-top button upon scrolling if the y position is not at least 500', () => {
    const getScrollPositionBackup = mockScrollerService.getScrollPosition;
    mockScrollerService.getScrollPosition = () => [0, 200];
    window.dispatchEvent(new Event('scroll'));
    expect(component.scrollToTopIsVisible).toBeFalse();
    mockScrollerService.getScrollPosition = getScrollPositionBackup;
  });
});
