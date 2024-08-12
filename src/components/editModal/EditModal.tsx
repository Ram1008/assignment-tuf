import React, { useState } from 'react';
import './editModal.scss';

type Banner = {
  description: string;
  visibility: number;
  link: string;
  timer: number;
  image: string;
};

type EditBannerModalProps = {
  banner: Banner;
  onClose: () => void;
  onSave: (updatedBanner: Banner) => Promise<void>;
};

const EditBannerModal: React.FC<EditBannerModalProps> = ({ banner, onClose, onSave }) => {
  const [updatedBanner, setUpdatedBanner] = useState(banner);
  const [days, setDays] = useState(Math.floor(updatedBanner.timer / (60 * 60 * 24)));
  const [hours, setHours] = useState(Math.floor((updatedBanner.timer % (60 * 60 * 24)) / (60 * 60)));
  const [minutes, setMinutes] = useState(Math.floor((updatedBanner.timer % (60 * 60)) / 60));
  const [seconds, setSeconds] = useState(updatedBanner.timer % 60);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUpdatedBanner({
      ...updatedBanner,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setUpdatedBanner(prevBanner => ({
      ...prevBanner,
      [name]: checked ? 1 : 0, 
    }));
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const parsedValue = parseInt(value, 10) || 0;

    switch (name) {
      case 'days':
        setDays(parsedValue);
        break;
      case 'hours':
        setHours(parsedValue);
        break;
      case 'minutes':
        setMinutes(parsedValue);
        break;
      case 'seconds':
        setSeconds(parsedValue);
        break;
      default:
        break;
    }
  };
  const handleSubmit = () => {
    const totalSeconds = days * 86400 + hours * 3600 + minutes * 60 + seconds;

    onSave({
      ...updatedBanner,
      timer: totalSeconds,
    });
    console.log(updatedBanner)
    onClose();
  };

  return (
    <div className="modal__overlay" onClick={onClose}>
      <div className="modal__container" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h2>Edit Banner</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        <div className="modal__body">
          <label>
            Description:
            <textarea name="description" value={updatedBanner.description} onChange={handleInputChange} />
          </label>
          <label>
            Visibility:
            <input 
              className="switch" 
              type="checkbox" 
              name="visibility" 
              value={updatedBanner.visibility}
              checked={updatedBanner.visibility === 1? true: false} 
              onChange={handleCheckboxChange} 
            />
            <span className="slider"></span>
          </label>

          <label>
            Link:
            <input type="text" name="link" value={updatedBanner.link} onChange={handleInputChange} />
          </label>
          <div className="time-inputs">
            <label>
              Days:
              <input type="number" name="days" value={days} onChange={handleTimeChange} />
            </label>
            <label>
              Hours:
              <input type="number" name="hours" value={hours} onChange={handleTimeChange} />
            </label>
            <label>
              Minutes:
              <input type="number" name="minutes" value={minutes} onChange={handleTimeChange} />
            </label>
            <label>
              Seconds:
              <input type="number" name="seconds" value={seconds} onChange={handleTimeChange} />
            </label>
          </div>
        </div>
        <div className="modal__footer">
          <button type="button" onClick={handleSubmit}>Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export default EditBannerModal;
