import {
    BOOKMARK_FOLDERS_REQUEST_STARTED,
    BOOKMARK_FOLDERS_REQUEST_FINISHED,
    BOOKMARK_FOLDERS_IDS_SELECTED,
    BOOKMARK_FOLDERS_IDS_DESELECTED,
    BOOKMARK_FOLDERS_IDS_RESTORED } from 'scripts/actions/list.js';
import bookmarksService from 'scripts/services/BookmarksService.js';

const bookmarkFoldersRequestStarted = () => ({
    type: BOOKMARK_FOLDERS_REQUEST_STARTED,
});

const bookmarkFoldersRequestFinished = rootBookmark => ({
    type: BOOKMARK_FOLDERS_REQUEST_FINISHED,
    rootBookmark,
});

export const loadBookmarkFolders = () => (dispatch) => {
    dispatch(bookmarkFoldersRequestStarted());

    return bookmarksService.fetchBookmarkFoldersTree().then((bookmarks) => {
        dispatch(bookmarkFoldersRequestFinished(bookmarks[0]));
    });
};

export const bookmarkFoldersIdsRestored = ids => ({
    type: BOOKMARK_FOLDERS_IDS_RESTORED,
    ids,
});

export const bookmarkFoldersIdsSelected = ids => ({
    type: BOOKMARK_FOLDERS_IDS_SELECTED,
    ids,
});

export const bookmarkFoldersIdsDeselected = ids => ({
    type: BOOKMARK_FOLDERS_IDS_DESELECTED,
    ids,
});
