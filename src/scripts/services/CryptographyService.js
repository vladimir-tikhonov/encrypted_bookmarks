import storage from 'scripts/services/Storage.js';
import bookmarksService from 'scripts/services/BookmarksService.js';

const ENCRYPTED_PREFIX = '__enc__';
const SEPARATOR = '___';

const isEncrypted = bookmark => bookmark.title.startsWith(ENCRYPTED_PREFIX);

function encryptString(value) {
    return btoa(encodeURIComponent(value));
}

function getEncryptedTitle(bookmark) {
    return ENCRYPTED_PREFIX + encryptString(bookmark.title) +
        SEPARATOR + encryptString(bookmark.url);
}

function encryptBookmark(bookmark) {
    if (bookmark.isFolder()) {
        return Promise.all(bookmark.children.map(encryptBookmark));
    }

    if (isEncrypted(bookmark)) {
        return Promise.resolve(bookmark);
    } else {
        return bookmarksService.update(bookmark, {
            title: getEncryptedTitle(bookmark),
            url: 'https://example.org',
        });
    }
}

function decryptString(encryptedValue) {
    try {
        return decodeURIComponent(atob(encryptedValue));
    } catch (e) {
        console.debug(e); // eslint-disable-line no-console
        return encryptedValue;
    }
}

function decryptTitle(encryptedTitle) {
    const [title, url] = encryptedTitle.replace(ENCRYPTED_PREFIX, '')
        .split(SEPARATOR).map(decryptString);
    return { title, url };
}

function decryptBookmark(bookmark) {
    if (bookmark.isFolder()) {
        return Promise.all(bookmark.children.map(decryptBookmark));
    }

    if (!isEncrypted(bookmark)) {
        return Promise.resolve(bookmark);
    } else {
        const bookmarkData = decryptTitle(bookmark.title);
        return bookmarksService.update(bookmark, {
            title: bookmarkData.title,
            url: bookmarkData.url,
        });
    }
}

function encryptTree(rootNodeId) {
    return bookmarksService.fetchBookmarkSubTree(rootNodeId)
        .then(bookmarks => (
            Promise.all(bookmarks.map(encryptBookmark))
        ));
}

export default {
    performEncryption() {
        return storage.getEncryptedBookmarkFolderIds()
            .then(ids => Promise.all(ids.map(encryptTree)))
            .then(() => storage.setIsEncryptionActive(true));
    },

    performDecryption() {
        return bookmarksService.fetchBookmarkTree()
            .then(bookmarks => Promise.all(bookmarks.map(decryptBookmark)))
            .then(() => storage.setIsEncryptionActive(false));
    },
};
