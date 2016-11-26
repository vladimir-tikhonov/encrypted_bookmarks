import Bookmark from 'scripts/models/Bookmark.js';

const isFolderFilter = bookmarkTreeNode => !bookmarkTreeNode.hasOwnProperty('url');
const truthFilter = () => true;

function transformNativeBookmarkTree(nativeBookmarkTree, parent, filter) {
    if (!nativeBookmarkTree) {
        // Bookmark folder was removed.
        return [];
    }

    return nativeBookmarkTree.map((bookmarkTreeNode) => {
        if (!filter(bookmarkTreeNode)) {
            return null;
        }

        const bookmarkFolder = new Bookmark({
            id: bookmarkTreeNode.id,
            title: bookmarkTreeNode.title,
            url: bookmarkTreeNode.url,
            parent,
            children: [],
        });

        const children = transformNativeBookmarkTree(
            bookmarkTreeNode.children || [],
            bookmarkFolder,
            filter
        );
        bookmarkFolder.children = children;

        return bookmarkFolder;
    })
    .filter(bookmarkFolderObject => bookmarkFolderObject !== null);
}

function getNativeBookmarkTree() {
    return new Promise((resolve) => {
        chrome.bookmarks.getTree((bookmarkTree) => {
            resolve(bookmarkTree);
        });
    });
}

function getNativeBookmarkSubTree(rootNodeId) {
    return new Promise((resolve) => {
        chrome.bookmarks.getSubTree(rootNodeId, (bookmarkSubTree) => {
            resolve(bookmarkSubTree);
        });
    });
}

export default {
    fetchBookmarkTree() {
        return getNativeBookmarkTree().then(nativeBookmarkTree => (
            transformNativeBookmarkTree(nativeBookmarkTree, null, truthFilter)
        ));
    },

    fetchBookmarkFoldersTree() {
        return getNativeBookmarkTree().then(nativeBookmarkTree => (
            transformNativeBookmarkTree(nativeBookmarkTree, null, isFolderFilter)
        ));
    },

    fetchBookmarkSubTree(rootNodeId) {
        return getNativeBookmarkSubTree(rootNodeId).then(nativeBookmarkTree => (
            transformNativeBookmarkTree(nativeBookmarkTree, null, truthFilter)
        ));
    },

    update(bookmark, changes) {
        return new Promise((resolve) => {
            chrome.bookmarks.update(bookmark.id, changes, resolve);
        });
    },
};
