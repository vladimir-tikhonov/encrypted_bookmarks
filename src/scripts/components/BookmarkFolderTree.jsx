import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import _intersection from 'lodash/intersection';

import {
    loadBookmarkFolders,
    bookmarkFoldersIdsSelected,
    bookmarkFoldersIdsDeselected} from 'scripts/actions/bookmark_folders.js';
import {getBookmarkFolders} from 'scripts/reducers/index.js';
import {getRootBookmark, getSelectedIds} from 'scripts/reducers/bookmark_folders.js';
import BookmarkFolder from 'scripts/components/BookmarkFolder.jsx';

class BookmarkFolderTree extends React.PureComponent {
    componentDidMount() {
        this.props.loadBookmarkFolders();
    }

    onBookmarkFolderToggle(bookmarkFolder, isChecked) {
        if (isChecked) {
            this.onFolderChecked(bookmarkFolder);
        } else {
            this.onFolderUnchecked(bookmarkFolder);
        }
    }

    onFolderChecked(bookmarkFolder) {
        let updatedIds = [bookmarkFolder.id].concat(bookmarkFolder.deepGetChildrenIds());

        const allSelectedIds = [...updatedIds, ...this.props.selectedIds];
        bookmarkFolder.deepGetParents().forEach(parent => {
            const childrenIds = parent.deepGetChildrenIds();
            const allChildIsChecked = _intersection(childrenIds, allSelectedIds).length ===
                childrenIds.length;

            if (allChildIsChecked) {
                allSelectedIds.push(parent.id);
                updatedIds.push(parent.id);
            }
        });

        this.props.onIdsSelected(updatedIds);
    }

    onFolderUnchecked(bookmarkFolder) {
        const updatedIds = [bookmarkFolder.id]
            .concat(bookmarkFolder.deepGetChildrenIds())
            .concat(bookmarkFolder.deepGetParentIds());

        this.props.onIdsDeselected(updatedIds);
    }

    render() {
        const {rootBookmark} = this.props;
        if (!rootBookmark) {
            return null;
        }

        return (
            <BookmarkFolder
                bookmarkFolder={rootBookmark}
                selectedIds={this.props.selectedIds}
                onToggle={this.onBookmarkFolderToggle.bind(this)}
            />
        );
    }
}

BookmarkFolderTree.propTypes = {
    rootBookmark: PropTypes.object,
    loadBookmarkFolders: PropTypes.func.isRequired,
    selectedIds: PropTypes.object.isRequired,
    onIdsSelected: PropTypes.func.isRequired,
    onIdsDeselected: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    const bookmarkFoldersState = getBookmarkFolders(state);

    return {
        rootBookmark: getRootBookmark(bookmarkFoldersState),
        selectedIds: getSelectedIds(bookmarkFoldersState),
    };
};

const mapDispatchToProps = (dispatch) => ({
    loadBookmarkFolders: () => dispatch(loadBookmarkFolders()),
    onIdsSelected: ids => dispatch(bookmarkFoldersIdsSelected(ids)),
    onIdsDeselected: ids => dispatch(bookmarkFoldersIdsDeselected(ids)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookmarkFolderTree);
