import { Component, DebugElement, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PlaylistsData, PlaylistsItemData } from '../playlists.model';

import { PlaylistsComponent } from './playlists.component';

const mockPlaylistsData: PlaylistsData = {
  name: 'test playlists',
  content: [0, 1, 2, 3, 4].map((i) => ({
    id: `${i}`,
    name: `test plylist ${i}`,
    curatorName: 'test curator',
    url: `test-url-${i}`,
    artwork: `test-artwork-${i}`,
    kind: '',
  })),
};

@Component({
  selector: 'app-playlists-item',
  template: `<div class="playlists-item">
    {{ data.name }}_{{ data.id }}_{{ data.url }}
  </div>`,
})
class MockPlaylistsItemComponent {
  @Input() data: PlaylistsItemData;
}

describe('PlaylistsComponent', () => {
  let component: PlaylistsComponent;
  let fixture: ComponentFixture<PlaylistsComponent>;
  let el: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlaylistsComponent, MockPlaylistsItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistsComponent);
    component = fixture.componentInstance;
    component.playlistsData = { ...mockPlaylistsData };
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should display the provided playlists\' name', () => {
    const playlistsNameEl = el.query(By.css('.playlists__name')).nativeElement;
    expect(playlistsNameEl.innerText.toLowerCase()).toEqual(
      mockPlaylistsData.name.toLowerCase()
    );
  });

  it('should display all the playlistsItems with the correct data', () => {
    const playlistsItemEls = el.queryAll(By.css('.playlists-item'));
    expect(playlistsItemEls.length).toEqual(5);
    playlistsItemEls.forEach((itemEl, idx) => {
      const elText = itemEl.nativeElement.innerText;
      const itemData = mockPlaylistsData.content[idx];
      expect(elText).toEqual(`${itemData.name}_${itemData.id}_${itemData.url}`);
    });
  });
});
