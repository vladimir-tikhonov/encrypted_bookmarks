import {
    BOOKMARK_FOLDERS_REQUEST_STARTED,
    BOOKMARK_FOLDERS_REQUEST_FINISHED} from 'scripts/actions/list.js';
import bookmarksService from 'scripts/services/BookmarksService.js';

const bookmarkFoldersRequestStarted = () => ({
    type: BOOKMARK_FOLDERS_REQUEST_STARTED,
});

const bookmarkFoldersRequestFinished = (rootBookmark) => ({
    type: BOOKMARK_FOLDERS_REQUEST_FINISHED,
    rootBookmark: rootBookmark,
});

export const loadBookmarkFolders = () => {
    return (dispatch) => {
        dispatch(bookmarkFoldersRequestStarted());

        return bookmarksService.fetchBookmarkTree().then((bookmarks) => {
            dispatch(bookmarkFoldersRequestFinished(bookmarks[0]));
        });
    };
};
