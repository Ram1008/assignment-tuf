# TUF-Assignment


## Features

- **One-Page Website:** A minimalist website with a focus on simplicity and clarity.
- **Banner Component:**
  - Optional visibility controlled via the internal dashboard.
  - Displays a countdown timer (reverse clock) showing the remaining time before the banner disappears.
  - Allows for custom text and a clickable link to be added to the banner.
- **Internal Dashboard:**
  - Control the visibility of the banner.
  - Update the content of the banner's description.
  - Set a timer for how long the banner should be displayed.
  - Add a clickable link that redirects users to a specified URL.
- **Database Integration:**
  - MySQL database to store and retrieve banner settings.

## Tech Stack

- **Frontend:**
  - [React](https://reactjs.org/)
  - [TypeScript](https://www.typescriptlang.org/)
  - [Vite](https://vitejs.dev/)
  - [Sass](https://sass-lang.com/) (optional for styling)

- **Backend:**
  - Node.js
  - Express.js (or similar)
  - MySQL

## Folder Structure

```plaintext
my-project/
│
├── public/                
├── src/
│   ├── assets/            
│   ├── components/        
│   │   ├── Banner.tsx     
│   │   ├── Countdown.tsx  
│   ├── dashboard/         
│   │   ├── Dashboard.tsx  
│   │   ├── BannerForm.tsx 
│   ├── pages/             
│   │   ├── HomePage.tsx   
│   ├── services/          
│   │   ├── api.ts         
│   │   └── bannerService.ts 
│   ├── styles/            
│   ├── App.tsx            
│   ├── main.tsx           
│   └── vite-env.d.ts      
│
├── tsconfig.json          
├── package.json           
└── vite.config.ts         

