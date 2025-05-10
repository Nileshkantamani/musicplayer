export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  coverArt: string;
  audioSrc: string;
  duration: number;
  genre?: string;
  dateAdded?: string;
}
