import BookmarkFolder from 'scripts/models/BookmarkFolder.js';

function transformNativeBookmarkTree(nativeBookmarkTree, parent) {
    return nativeBookmarkTree.map(bookmarkTreeNode => {
        const isFolder = !bookmarkTreeNode.hasOwnProperty('url');
        if (!isFolder) {
            return null;
        }

        const bookmarkFolder = new BookmarkFolder({
            id: bookmarkTreeNode.id,
            name: bookmarkTreeNode.title,
            parent: parent,
            children: [],
        });

        var children = transformNativeBookmarkTree(bookmarkTreeNode.children || [], bookmarkFolder);
        bookmarkFolder.children = children;

        return bookmarkFolder;
    })
    .filter(bookmarkFolderObject => bookmarkFolderObject !== null);
}

export default {
    fetchBookmarkTree() {
        return new Promise((resolve) => {
            chrome.bookmarks.getTree((bookmarkTree) => {
                resolve(bookmarkTree);
            });
        }).then(nativeBookmarkTree => transformNativeBookmarkTree(nativeBookmarkTree, null));
    },
};
