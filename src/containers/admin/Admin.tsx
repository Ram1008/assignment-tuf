import { useEffect, useState } from 'react';
import Layout from '../../components/Wrapper/layout/Layout';
import './admin.scss';
import Pencil from '../../assets/pencil.png';
import Trash from '../../assets/trash.png';
import EditModal from '../../components/editModal/EditModal';
import { useHomeContext } from '../../context/homeContext/HomeState';
import { Banner } from '../../context/homeContext/homeTypes';

const Admin = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState<Banner | null>(null);
  const { banners, getBanners, editBanner } = useHomeContext();

  useEffect(() => {
    getBanners();
    
    console.log(banners)
  }, []);

  const handleEditClick = (banner: Banner) => {
    setSelectedBanner(banner);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBanner(null);
  };

  const handleEditBanner = async (updatedBanner: Banner) => {
    if (selectedBanner) {
      await editBanner(1, updatedBanner);
      handleCloseModal();
    }
  };
  const bannersList = banners?.map((item: Banner, idx)=>{
    const days = Math.floor(item.timer / (60 * 60 * 24));
    const hours = Math.floor((item.timer % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((item.timer % (60 * 60)) / 60);
    const seconds = item.timer % 60;

    return (
      <tr key={idx}>
        <td>{item.visibility === 1 ? 'Visible' : 'Hidden'}</td>
        <td>{item.description}</td>
        <td>{`${days}d ${hours}h ${minutes}m ${seconds}s`}</td>
        <td className='action-table'>
          <button className='pencil-btn' onClick={() => handleEditClick(item)}>
            <img src={Pencil} alt='edit' />
          </button>
          <button className='delete-btn'>
            <img src={Trash} alt='delete' />
          </button>
        </td>
      </tr>
    );

  })

  return (
    <Layout
      heading="Take You Forward"
      buttonLabel="Home"
      buttonLink="/"
    >
      <table className='custom-table'>
        <thead>
          <tr>
            <th>Visibility</th>
            <th>Description</th>
            <th>Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bannersList}
        </tbody>
      </table>
      {showModal && selectedBanner && (
        <EditModal banner={selectedBanner} onClose={handleCloseModal} onSave={handleEditBanner} />
      )}
    </Layout>
  );
};

export default Admin;
