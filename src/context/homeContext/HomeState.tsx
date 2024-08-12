import React, { createContext, useContext, useState, ReactNode } from 'react';
import { HomeContextType, Banner } from './homeTypes';

const HomeContext = createContext<HomeContextType | undefined>(undefined);

export const HomeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const initialBanner = {
    description: "",
    visibility: 0,
    link: "",
    image: "",
    timer: 0,
  }
  const [banners, setBanners] = useState<Banner[]>([]);
  const [banner, setBanner] = useState<Banner>(initialBanner);
  const host = 'https://banner-production-92a3.up.railway.app/api';
  
  const fetchApi = async (url: string, method: string, body: unknown = null, requireToken = false) => {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (requireToken) {
      const token = localStorage.getItem('hungry&Potato-token');
      if (token) headers['token'] = token;
    }

    try {
      const response = await fetch(url, { method, headers, body: body ? JSON.stringify(body) : null });
      const json = await response.json();
      return {
        status: response.ok,
        data: json,
      };
    } catch (error) {
      return {
        status: false,
        message: `Error fetching API: ${error }`,
      };
    }
  };

  const getBanners = async () => {
    const data = await fetchApi(`${host}/banner`, 'GET', null, false);
    if (data.status) setBanners(data.data);
  };
  const getABanner = async(id:number) =>{
    const data = await fetchApi(`${host}/banner/${id}`, 'GET', null, false);
    if (data.status) {
      if (data.status) setBanner(data.data);
    }
  }

  const editBanner = async (bannerId: number = 1, updatedBanner: Banner) => {
    const newBody = {
      timer: updatedBanner.timer,
      description: updatedBanner.description,
      link: updatedBanner.link,
      image: updatedBanner.image,

    } 
    const data = await fetchApi(`${host}/banner/update/${bannerId}`, 'PUT', newBody, false);
    if (data.status) {
      getBanners();
    }
  };

  return (
    <HomeContext.Provider value={{ getBanners, getABanner, banners, editBanner, banner }}>
      {children}
    </HomeContext.Provider>
  );
};

// Custom hook to use the HomeContext
export const useHomeContext = (): HomeContextType => {
  const context = useContext(HomeContext);
  if (context === undefined) {
    throw new Error('useHomeContext must be used within a HomeProvider');
  }
  return context;
};
