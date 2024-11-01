import { useEffect, useState } from 'react';
import { CiLock, CiUnlock } from 'react-icons/ci';
import api from '../../api/api';


const BookLockToggle = ({ book, style }) => {
  const [isSecret, setIsSecret] = useState(book.secret);

  useEffect(() => {
    setIsSecret(book.secret);
  }, [book.secret]);

  const toggleSecret = async () => {
    try {
      const response = await api.patch(`/mypage/book/${book.id}/secret`, {});
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
