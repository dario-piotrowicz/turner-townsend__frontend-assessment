export interface PlaylistsData {
  name: string;
  content: PlaylistsItemData[];
}

export interface PlaylistsItemData {
  id: string;
  kind: string;
  name: string;
  url: string;
  curatorName: string;
  artwork: string;
}
