import {combineReducers} from 'redux';

import {
    BOOKMARK_FOLDERS_REQUEST_STARTED,
    BOOKMARK_FOLDERS_REQUEST_FINISHED,
    BOOKMARK_FOLDERS_IDS_SELECTED,
    BOOKMARK_FOLDERS_IDS_DESELECTED} from 'scripts/actions/list.js';

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

function selectedIds(state = new Set([]), action) {
    switch (action.type) {
    case BOOKMARK_FOLDERS_REQUEST_STARTED:
        return new Set([]);
    case BOOKMARK_FOLDERS_IDS_SELECTED: {
        const newSelectedIds = new Set([...state]);
        action.ids.forEach(id => newSelectedIds.add(id));

        return newSelectedIds;
    }
    case BOOKMARK_FOLDERS_IDS_DESELECTED: {
        const newSelectedIds = new Set([...state]);
        action.ids.forEach(id => newSelectedIds.delete(id));

        return newSelectedIds;
    }
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
