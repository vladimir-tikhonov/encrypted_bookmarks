const NATIVE_STORAGE = chrome.storage.sync;

const ENCRYPTED_BOOKMARK_FOLDER_IDS_KEY = 'ENCRYPTED_BOOKMARK_FOLDER_IDS_KEY';
const IS_ENCRYPTION_ACTIVE_KEY = 'IS_ENCRYPTION_ACTIVE_KEY';

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

const isEncryptionActiveListeners = [];
function notifyIsEncryptionActiveListeners(change) {
    if (change.oldValue === change.newValue) {
        return;
    }

    isEncryptionActiveListeners.forEach((callback) => {
        callback(change.oldValue, change.newValue);
    });
}

chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName !== 'sync') {
        return;
    }

    if (changes.hasOwnProperty(IS_ENCRYPTION_ACTIVE_KEY)) {
        notifyIsEncryptionActiveListeners(changes[IS_ENCRYPTION_ACTIVE_KEY]);
    }
});

export default {
    getEncryptedBookmarkFolderIds() {
        return get({ [ENCRYPTED_BOOKMARK_FOLDER_IDS_KEY]: [] })
            .then(data => data[ENCRYPTED_BOOKMARK_FOLDER_IDS_KEY]);
    },

    setEncryptedBookmarkFolderIds(ids) {
        return set({ [ENCRYPTED_BOOKMARK_FOLDER_IDS_KEY]: ids });
    },

    getIsEncryptionActive() {
        return get({ [IS_ENCRYPTION_ACTIVE_KEY]: false })
            .then(data => data[IS_ENCRYPTION_ACTIVE_KEY]);
    },

    setIsEncryptionActive(value) {
        return set({ [IS_ENCRYPTION_ACTIVE_KEY]: value });
    },

    addIsEncryptionActiveChangedListener(callback) {
        isEncryptionActiveListeners.push(callback);
    },
};
