import {combineReducers} from 'redux';

import {
    BOOKMARK_FOLDERS_REQUEST_STARTED,
    BOOKMARK_FOLDERS_REQUEST_FINISHED} from 'scripts/actions/list.js';

function rootBookmark(state = null, action) {
    switch (action.type) {
    case BOOKMARK_FOLDERS_REQUEST_STARTED:
        return null;
    case BOOKMARK_FOLDERS_REQUEST_FINISHED:
        return action.rootBookmark;
    default:
        return state;
    }
}

function selectedIds(state = [], action) {
    switch (action.type) {
    default:
        return state;
    }
}

export default combineReducers({
    rootBookmark,
    selectedIds,
});

export const getRootBookmark = (state) => state.rootBookmark;
export const getSelectedIds = (state) => state.selectedIds;
