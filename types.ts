
export enum ImageStyle {
  REALISTIC = 'Realistic',
  ANIME = 'Anime',
  CINEMATIC = 'Cinematic',
  ILLUSTRATION = 'Illustration',
  THREE_D = '3D Render'
}

export enum AspectRatio {
  SQUARE = '1:1',
  LANDSCAPE = '16:9',
  PORTRAIT = '9:16'
}

export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  style: ImageStyle;
  aspectRatio: AspectRatio;
  createdAt: number;
}

export interface UserProfile {
  name: string;
  email: string;
  photo: string;
}
