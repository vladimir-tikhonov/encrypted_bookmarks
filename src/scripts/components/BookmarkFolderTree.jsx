import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import {loadBookmarkFolders} from 'scripts/actions/bookmark_folders.js';
import {getBookmarkFolders} from 'scripts/reducers/index.js';
import {getRootBookmark} from 'scripts/reducers/bookmark_folders.js';
import BookmarkFolder from 'scripts/components/BookmarkFolder.jsx';

class BookmarkFolderTree extends React.PureComponent {
    componentDidMount() {
        this.props.loadBookmarkFolders();
    }

    render() {
        const {rootBookmark} = this.props;
        if (!rootBookmark) {
            return null;
        }

        return (
            <BookmarkFolder bookmarkFolder={rootBookmark} />
        );
    }
}

BookmarkFolderTree.propTypes = {
    rootBookmark: PropTypes.object,
    loadBookmarkFolders: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    const bookmarkFoldersState = getBookmarkFolders(state);

    return {
        rootBookmark: getRootBookmark(bookmarkFoldersState),
    };
};

const mapDispatchToProps = (dispatch) => ({
    loadBookmarkFolders: () => dispatch(loadBookmarkFolders()),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookmarkFolderTree);
