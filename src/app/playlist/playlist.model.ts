export interface PlaylistData {
  name: string;
  content: PlaylistItemData[];
}

export interface PlaylistItemData {
  id: string;
  kind: string;
  name: string;
  url: string;
  curatorName: string;
  artwork: string;
}
