import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PlaylistItemData } from '../playlist.model';

import { PlaylistItemComponent } from './playlist-item.component';

const mockItemData: PlaylistItemData = {
  id: 'test id',
  name: 'test name',
  kind: 'test kind',
  url: 'tes url',
  artwork: 'test artwork',
  curatorName: 'test curator',
};

describe('PlaylistItemComponent', () => {
  let component: PlaylistItemComponent;
  let fixture: ComponentFixture<PlaylistItemComponent>;
  let el: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlaylistItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistItemComponent);
    component = fixture.componentInstance;
    component.data = mockItemData;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should display the item name', () => {
    const itemNameEl = el.query(By.css('.playlist-item__name')).nativeElement;
    expect(itemNameEl.innerText.toLowerCase()).toContain(mockItemData.name);
  });

  it('should display the item id', () => {
    const itemIdEl = el.query(By.css('.playlist-item__id')).nativeElement;
    expect(itemIdEl.innerText).toContain(mockItemData.id);
  });

  it('should display the item curator name', () => {
    const itemCuratorEl = el.query(By.css('.playlist-item__curator'))
      .nativeElement;
    expect(itemCuratorEl.innerText).toContain(mockItemData.curatorName);
  });
});
