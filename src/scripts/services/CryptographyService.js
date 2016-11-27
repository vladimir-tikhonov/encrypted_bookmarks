import storage from 'scripts/services/Storage.js';
import bookmarksService from 'scripts/services/BookmarksService.js';

const ENCRYPTED_PREFIX = '__enc__';
const SEPARATOR = '___';

const isEncrypted = bookmark => bookmark.title.startsWith(ENCRYPTED_PREFIX);

function encryptString(value, password) {
    return btoa(encodeURIComponent(JSON.stringify(sjcl.encrypt(password, value))));
}

function getEncryptedTitle(bookmark, password) {
    return ENCRYPTED_PREFIX + encryptString(bookmark.title, password) +
        SEPARATOR + encryptString(bookmark.url, password);
}

function encryptBookmark(bookmark, password) {
    if (bookmark.isFolder()) {
        return Promise.all(bookmark.children.map(child => encryptBookmark(child, password)));
    }

    if (isEncrypted(bookmark)) {
        return Promise.resolve(bookmark);
    } else {
        return bookmarksService.update(bookmark, {
            title: getEncryptedTitle(bookmark, password),
            url: 'https://example.org',
        });
    }
}

function encryptTree(rootNodeId, password) {
    return bookmarksService.fetchBookmarkSubTree(rootNodeId)
        .then(bookmarks => (
            Promise.all(bookmarks.map(bookmark => encryptBookmark(bookmark, password)))
        )
    );
}

function decryptString(encryptedValue, password) {
    return sjcl.decrypt(password, JSON.parse(decodeURIComponent(atob(encryptedValue))));
}

function decryptTitle(encryptedTitle, password) {
    const [title, url] = encryptedTitle.replace(ENCRYPTED_PREFIX, '')
        .split(SEPARATOR).map(value => decryptString(value, password));
    return { title, url };
}

function decryptBookmark(bookmark, password) {
    if (bookmark.isFolder()) {
        return Promise.all(bookmark.children.map(child => decryptBookmark(child, password)));
    }

    if (!isEncrypted(bookmark)) {
        return Promise.resolve(bookmark);
    } else {
        const bookmarkData = decryptTitle(bookmark.title, password);
        return bookmarksService.update(bookmark, {
            title: bookmarkData.title,
            url: bookmarkData.url,
        });
    }
}

export default {
    performEncryption(password) {
        return storage.getEncryptedBookmarkFolderIds()
            .then(ids => (
                Promise.all(ids.map(id => encryptTree(id, password)))
            ))
            .then(() => storage.setIsEncryptionActive(true));
    },

    performDecryption(password) {
        return bookmarksService.fetchBookmarkTree()
            .then(bookmarks => (
                Promise.all(bookmarks.map(bookmark => decryptBookmark(bookmark, password)))
            ))
            .then(() => storage.setIsEncryptionActive(false));
    },
};
