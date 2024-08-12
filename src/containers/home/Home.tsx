import './home.scss'
import Layout from '../../components/Wrapper/layout/Layout';
// import Banner from '../../components/badge/Banner';
import { useHomeContext } from '../../context/homeContext/HomeState';
import { useEffect, useState } from 'react';
import Banner from '../../components/badge/Banner';

const Home = () => {
  const {  getABanner, banner } = useHomeContext();
  
  const [showBanner, setShowBanner] = useState(false);

  const handleBannerClick=()=>{
    setShowBanner(true);
  }
  useEffect(() =>{
    getABanner(1);
    
  }, [])

  return (
    <Layout
      heading="Take You Forward"
      buttonLabel="Internal Dashboard"
      buttonLink="/admin"
    >
      <div className='home__container'>
        <>          
        {!showBanner&&<button className='home__container_button'  onClick={handleBannerClick}>Show banner</button>}
          {showBanner&&<Banner banner= {banner}/>}
      </>
      </div>

    </Layout>
  )
}

export default Home;