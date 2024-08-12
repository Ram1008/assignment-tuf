import { useState, useEffect, useCallback } from 'react';
import { Banner as BannerType } from '../../context/homeContext/homeTypes';
import './banner.scss';

type BannerProps = {
  banner: BannerType;
};

const Banner: React.FC<BannerProps> = ({ banner }) => {
  const [showBanner, setShowBanner] = useState(false);
  const [timer, setTimer] = useState(banner.timer);

  const handleShowBanner = useCallback(() => {
    setShowBanner(true);
  }, []);

  const handleCloseBanner = useCallback(() => {
    setShowBanner(false);
  }, []);

  const handleVisitClick = useCallback(() => {
    if (banner.link) {
      window.location.href = banner.link;
    }
  }, [banner.link]);

  useEffect(() => {
    if (showBanner) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => Math.max(prevTimer - 1, 0));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [showBanner]);

  return (
    <>
      {showBanner ? (
        <div className='banner__container'>
          <button className='banner__close' onClick={handleCloseBanner}>
            &times;
          </button>
          <div className='banner__header'>
            <img src={banner.image} alt='Banner' />
          </div>
          <div className='banner__body'>
            <div className='banner__body-description'>
              {banner.description}
            </div>
          </div>
          <div className='banner__footer'>
            <h3>Limited time offer</h3>
            <p>The product is only available for next:</p>
            <div className='banner__footer-timer'>
              <div style={{ margin: '0 0.5rem', textAlign: 'center' }}>
                <div className='banner__footer-timer-time'>{Math.floor(timer / (60 * 60 * 24))}</div>  
                <div className='banner__footer-timer-label'>Days</div>  
              </div>:
              <div style={{ margin: '0 0.5rem', textAlign: 'center' }}>
                <div className='banner__footer-timer-time'>{Math.floor((timer % (60 * 60 * 24)) / (60 * 60))}</div>  
                <div className='banner__footer-timer-label'>Hours</div> 
              </div>:
              <div style={{ margin: '0 0.5rem', textAlign: 'center' }}>
                <div className='banner__footer-timer-time'>{Math.floor((timer % (60 * 60)) / 60)}</div>  
                <div className='banner__footer-timer-label'>Minutes</div>   
              </div>:
              <div style={{ margin: '0 0.5rem', textAlign: 'center' }}>
                <div className='banner__footer-timer-time'>{timer % 60}</div>  
                <div className='banner__footer-timer-label'>Seconds</div>   
              </div>
            </div>
            <button onClick={handleVisitClick}>Visit</button>
          </div>
        </div>
      ) : (
        <button onClick={handleShowBanner}>
          View Banner
        </button>
      )}
    </>
  );
}

export default Banner;
