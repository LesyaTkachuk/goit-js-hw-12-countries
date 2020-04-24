/* eslint-disable import/no-extraneous-dependencies */
import { defaults, error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';

defaults.delay = 500;
defaults.width = '300px';
defaults.minheigth = '30px';
defaults.maxTextHeight = null;
defaults.sticker = false;
defaults.closer = false;
export default {
  showNotifToMany() {
    error({
      text: 'To many matches found. Please enter more specific query',
    });
  },
  showNotifNoFound() {
    error({
      text: 'No matches found',
    });
  },
};
