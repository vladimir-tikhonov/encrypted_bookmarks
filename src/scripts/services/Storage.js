const NATIVE_STORAGE = chrome.storage.sync;
const ENCRYPTED_BOOKMARK_FOLDER_IDS_KEY = 'ENCRYPTED_BOOKMARK_FOLDER_IDS_KEY';

function get(locator) {
    return new Promise((resolve) => {
        NATIVE_STORAGE.get(locator, resolve);
    });
}

function set(data) {
    return new Promise((resolve) => {
        NATIVE_STORAGE.set(data, resolve);
    });
}

export default {
    getEncryptedBookmarkFolderIds() {
        return get({ [ENCRYPTED_BOOKMARK_FOLDER_IDS_KEY]: [] })
            .then(data => data[ENCRYPTED_BOOKMARK_FOLDER_IDS_KEY]);
    },

    setEncryptedBookmarkFolderIds(ids) {
        return set({ [ENCRYPTED_BOOKMARK_FOLDER_IDS_KEY]: ids });
    },
};
