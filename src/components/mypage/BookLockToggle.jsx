import { useEffect, useState } from 'react';
import { CiLock, CiUnlock } from 'react-icons/ci';
import { getCookie } from '../../utils/cookieUtils';
import axios from 'axios';

const BookLockToggle = ({ book, style }) => {
  const [isSecret, setIsSecret] = useState(book.secret);

  useEffect(() => {
    setIsSecret(book.secret);
  }, [book.secret]);

  const toggleSecret = async () => {
    try {
      const token = getCookie('accessToken');
      const response = await axios.patch(
        `${import.meta.env.VITE_REST_SERVER}/mypage/book/${book.id}/secret`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsSecret(response.data.secret);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={style} onClick={toggleSecret}>
      {isSecret ? (
        <CiLock size={25} color="#6686fa" />
      ) : (
        <CiUnlock size={25} color="#6686fa" />
      )}
    </div>
  );
};

export default BookLockToggle;
