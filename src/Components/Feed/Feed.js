import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FeedModal from './FeedModal';
import FeedPhotos from './FeedPhotos';
import PropTypes from 'prop-types';
import { loadNewPhotos, resetFeedState } from '../../store/feed';
import Loading from '../Helper/Loading';
import Error from '../Helper/Error';

const Feed = ({ user }) => {
  const { infinite, loading, list, error } = useSelector((state) => state.feed);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetFeedState());

    dispatch(loadNewPhotos({ user, total: 6 }));
  }, [dispatch, user]);

  useEffect(() => {
    const infinitScroll = () => {
      if (infinite) {
        let wait = false;
        const scroll = window.scrollY;
        const height = document.body.offsetHeight - window.innerHeight;
        if (scroll > height * 0.75 && !wait) {
          dispatch(loadNewPhotos({ user, total: 6 }));
          wait = true;
          setTimeout(() => {
            wait = false;
          }, 500);
        }
      }
    };

    window.addEventListener('wheel', infinitScroll);
    window.addEventListener('scroll', infinitScroll);

    return () => {
      window.removeEventListener('wheel', infinitScroll);
      window.removeEventListener('scroll', infinitScroll);
    };
  }, [infinite, dispatch, user]);

  return (
    <div>
      <FeedModal />
      {loading && <Loading />}
      {list.length > 0 && <FeedPhotos />}
      {error && <Error error={error} />}
    </div>
  );
};

Feed.defaultProps = {
  user: 0,
};

Feed.propTypes = {
  user: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
  ]),
};

export default Feed;
