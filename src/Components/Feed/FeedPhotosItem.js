import React from 'react';
import Image from '../Helper/Image';
import { useDispatch } from 'react-redux';
import styles from './FeedPhotosItem.module.css';
import { openModal } from '../../store/ui';
import { fetchPhoto } from '../../store/photo';

const FeedPhotosItem = ({ photo }) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(openModal());
    dispatch(fetchPhoto(photo.id));
  };
  return (
    <li className={styles.photo} onClick={handleClick}>
      <Image src={photo.src} alt={photo.title} />
      <span className={styles.visualizacao}>{photo.acessos}</span>
    </li>
  );
};

export default FeedPhotosItem;
