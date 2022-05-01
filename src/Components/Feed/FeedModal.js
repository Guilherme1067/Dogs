import React, { useEffect } from 'react';
import Error from '../Helper/Error';
import Loading from '../Helper/Loading';
import PhotoContent from '../Photo/PhotoContent';
import { useSelector, useDispatch } from 'react-redux';
import styles from './FeedModal.module.css';
import { closeModal } from '../../store/ui';

const FeedModal = () => {
  const { modal } = useSelector((state) => state.ui);
  const { data, error, loading } = useSelector((state) => state.photo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(closeModal());
  }, [dispatch]);

  const handleClick = ({ target, currentTarget }) => {
    if (target === currentTarget) {
      dispatch(closeModal());
    }
  };

  if (!modal) return null;

  return (
    <div className={styles.modal} onClick={handleClick}>
      {error && <Error error={error} />} {loading && <Loading />}
      {data && <PhotoContent />}
    </div>
  );
};

export default FeedModal;
