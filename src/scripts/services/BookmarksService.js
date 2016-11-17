import BookmarkFolder from 'scripts/models/BookmarkFolder.js';

function transformNativeBookmarkTree(nativeBookmarkTree) {
    return nativeBookmarkTree.map(bookmarkTreeNode => {
        const isFolder = !bookmarkTreeNode.hasOwnProperty('url');
        if (!isFolder) {
            return null;
        }

        var children = transformNativeBookmarkTree(bookmarkTreeNode.children || []);
        return new BookmarkFolder(bookmarkTreeNode.id, bookmarkTreeNode.title, children);
    })
    .filter(bookmarkFolderObject => bookmarkFolderObject !== null);
}

export default {
    fetchBookmarkTree() {
        return new Promise((resolve) => {
            chrome.bookmarks.getTree((bookmarkTree) => {
                resolve(bookmarkTree);
            });
        }).then(transformNativeBookmarkTree);
    },
};
