import Player from '@vimeo/player';
import _ from 'lodash';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);
const STORAGE_KEY = 'videoplayer-current-time';

const savedTime = ({ seconds } = 0) => {
  localStorage.setItem(STORAGE_KEY, seconds);
};
player.on('timeupdate', _.throttle(savedTime, 1000));

const getVideoCurrTime = () => {
  return localStorage.getItem(STORAGE_KEY);
};

player.setCurrentTime(getVideoCurrTime()).catch(function (err) {
  switch (err.name) {
    case 'RangeError':
      // the playback rate was less than 0 or greater than video's length
      break;

    default:
      // some other error occurred
      break;
  }
});
