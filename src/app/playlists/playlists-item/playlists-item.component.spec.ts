import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PlaylistsItemData } from '../playlists.model';

import { PlaylistsItemComponent } from './playlists-item.component';

const mockItemData: PlaylistsItemData = {
  id: 'test id',
  name: 'test name',
  kind: 'test kind',
  url: 'tes url',
  artwork: 'test artwork',
  curatorName: 'test curator',
};

describe('PlaylistsItemComponent', () => {
  let component: PlaylistsItemComponent;
  let fixture: ComponentFixture<PlaylistsItemComponent>;
  let el: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlaylistsItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistsItemComponent);
    component = fixture.componentInstance;
    component.data = mockItemData;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should display the item name', () => {
    const itemNameEl = el.query(By.css('.playlists-item__name')).nativeElement;
    expect(itemNameEl.innerText.toLowerCase()).toContain(mockItemData.name);
  });

  it('should display the item id', () => {
    const itemIdEl = el.query(By.css('.playlists-item__id')).nativeElement;
    expect(itemIdEl.innerText).toContain(mockItemData.id);
  });

  it('should display the item curator name', () => {
    const itemCuratorEl = el.query(By.css('.playlists-item__curator'))
      .nativeElement;
    expect(itemCuratorEl.innerText).toContain(mockItemData.curatorName);
  });
});
