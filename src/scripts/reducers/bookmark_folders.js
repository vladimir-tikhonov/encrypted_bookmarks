import { combineReducers } from 'redux';
import _union from 'lodash/union';
import _difference from 'lodash/difference';

import {
    BOOKMARK_FOLDERS_REQUEST_STARTED,
    BOOKMARK_FOLDERS_REQUEST_FINISHED,
    BOOKMARK_FOLDERS_IDS_SELECTED,
    BOOKMARK_FOLDERS_IDS_DESELECTED,
    BOOKMARK_FOLDERS_IDS_RESTORED } from 'scripts/actions/list.js';

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
    case BOOKMARK_FOLDERS_IDS_RESTORED:
        return [...action.ids];
    case BOOKMARK_FOLDERS_IDS_SELECTED:
        return _union(state, action.ids);
    case BOOKMARK_FOLDERS_IDS_DESELECTED:
        return _difference(state, action.ids);
    default:
        return state;
    }
}

export default combineReducers({
    rootBookmark,
    selectedIds,
});

export const getRootBookmark = state => state.rootBookmark;
export const getSelectedIds = state => state.selectedIds;
