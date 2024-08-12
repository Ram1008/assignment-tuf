import { ReactNode } from 'react';

export interface HomeStateProps {
  children: ReactNode;
}

export interface Banner {
  id: number;
  name: string;
  description: string;
  visibility: number;
  link: string;
  image: string;
  timer: number;
}

export interface HomeContextType {
  getBanners: () => Promise<void>; 
  getABanner: (id:number) => Promise<void>; 
  editBanner: (bannerId: number, updatedBanner: Banner) => Promise<void>; 
  banners: Banner[] | undefined;
  banner: Banner | null;
}
