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
import { PlaylistsData } from '../playlists.model';
import { PlaylistsService } from '../playlists.service';
import { PlaylistsPageComponent } from './playlists-page.component';

const mockPlaylistsData: PlaylistsData = {
  name: 'test playlists',
  content: [0, 1, 2, 3, 4].map((i) => ({
    id: `${i}`,
    name: `test song ${i}`,
    curatorName: 'test curator',
    url: `test-url-${i}`,
    artwork: `test-artwork-${i}`,
    kind: '',
  })),
};

const mockPlaylistsService = {
  getPlaylists: () => of(mockPlaylistsData),
};

const mockScrollerService = {
  getScrollPosition: () => [0, 550],
  scrollToPosition: ([_x, _y]) => {},
};

@Component({
  selector: 'app-playlists',
  template: `<div class="playlists">
    {{ playlistsData.name }}_{{ playlistsData.content.length }}
  </div>`,
})
class MockPlaylistsComponent {
  @Input() playlistsData: PlaylistsData;
}

describe('PlaylistsPageComponent', () => {
  let component: PlaylistsPageComponent;
  let fixture: ComponentFixture<PlaylistsPageComponent>;
  let el: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlaylistsPageComponent, MockPlaylistsComponent],
      providers: [
        { provide: PlaylistsService, useValue: mockPlaylistsService },
        { provide: ViewportScroller, useValue: mockScrollerService },
      ],
    })
      .overrideComponent(PlaylistsPageComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistsPageComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should not display an error message if no errors occurred', () => {
    const errorEl = el.query(By.css('.error'));
    expect(errorEl).toBeFalsy();
  });

  it('should not display the playlists if an error occurred', () => {
    const getPlaylistsBackup = mockPlaylistsService.getPlaylists;
    mockPlaylistsService.getPlaylists = () => throwError('An Error Occurred');
    component.ngOnInit();
    fixture.detectChanges();
    const playlistsEl = el.query(By.css('.playlists'));
    expect(playlistsEl).toBeFalsy();
    mockPlaylistsService.getPlaylists = getPlaylistsBackup;
  });

  it('should display the playlists if no errors occurred', () => {
    const playlistsEl = el.query(By.css('.playlists')).nativeElement;
    const playlistsElText = playlistsEl.innerText.toLowerCase();
    expect(playlistsElText).toEqual(
      `${mockPlaylistsData.name.toLowerCase()}_${
        mockPlaylistsData.content.length
      }`
    );
  });

  it('should display an error message if an error occurred', () => {
    const getPlaylistsBackup = mockPlaylistsService.getPlaylists;
    mockPlaylistsService.getPlaylists = () => throwError('An Error Occurred');
    component.ngOnInit();
    fixture.detectChanges();
    const errorEl = el.query(By.css('.error'));
    expect(errorEl).toBeTruthy();
    mockPlaylistsService.getPlaylists = getPlaylistsBackup;
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
