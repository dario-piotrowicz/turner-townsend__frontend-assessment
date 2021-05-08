export interface PlaylistData {
  name: string;
  content: PlaylistItemData[];
}

export interface PlaylistItemData {
  id: string;
  kind: string;
  name: string;
  url: string;
  curator_name: string;
  artwork: string;
}
