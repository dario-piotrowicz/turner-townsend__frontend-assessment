import { Component, DebugElement, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PlaylistData, PlaylistItemData } from '../playlist.model';

import { PlaylistComponent } from './playlist.component';

const mockPlaylistData: PlaylistData = {
  name: 'test playlist',
  content: [0, 1, 2, 3, 4].map((i) => ({
    id: `${i}`,
    name: `test song ${i}`,
    curator_name: 'test curator',
    url: `test-url-${i}`,
    artwork: `test-artwork-${i}`,
    kind: '',
  })),
};

@Component({
  selector: 'app-playlist-item',
  template: `<div class="playlist-item">
    {{ data.name }}_{{ data.id }}_{{ data.url }}
  </div>`,
})
class MockPlaylistItemComponent {
  @Input() data: PlaylistItemData;
}

describe('PlaylistComponent', () => {
  let component: PlaylistComponent;
  let fixture: ComponentFixture<PlaylistComponent>;
  let el: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlaylistComponent, MockPlaylistItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistComponent);
    component = fixture.componentInstance;
    component.playlistData = { ...mockPlaylistData };
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it("should display the provided playlist's name", () => {
    const playlistNameEl = el.query(By.css('.playlist__name')).nativeElement;
    expect(playlistNameEl.innerText.toLowerCase()).toEqual(
      mockPlaylistData.name.toLowerCase()
    );
  });

  it('should display all the playlistItems with the correct data', () => {
    const playlistItemEls = el.queryAll(By.css('.playlist-item'));
    expect(playlistItemEls.length).toEqual(5);
    playlistItemEls.forEach((el, idx) => {
      const elText = el.nativeElement.innerText;
      const itemData = mockPlaylistData.content[idx];
      expect(elText).toEqual(`${itemData.name}_${itemData.id}_${itemData.url}`);
    });
  });
});
