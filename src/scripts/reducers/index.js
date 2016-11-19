import { combineReducers } from 'redux';

import bookmarkFolders from 'scripts/reducers/bookmark_folders.js';

export default combineReducers({
    bookmarkFolders,
});

export const getBookmarkFolders = state => state.bookmarkFolders;
