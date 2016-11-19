const NATIVE_STORAGE = chrome.storage.sync;
const HIDDEN_BOOKMARK_FOLDER_IDS_KEY = 'HIDDEN_BOOKMARK_FOLDER_IDS_KEY';

function get(locator) {
    return new Promise(function(resolve) {
        NATIVE_STORAGE.get(locator, resolve);
    });
}

function set(data) {
    return new Promise(function(resolve) {
        NATIVE_STORAGE.set(data, resolve);
    });
}

export default {
    getHiddenBookmarkFolderIds() {
        return get({[HIDDEN_BOOKMARK_FOLDER_IDS_KEY]: []})
            .then(data => data[HIDDEN_BOOKMARK_FOLDER_IDS_KEY]);
    },

    setHiddenBookmarkFolderIds(ids) {
        return set({[HIDDEN_BOOKMARK_FOLDER_IDS_KEY]: ids});
    },
};
