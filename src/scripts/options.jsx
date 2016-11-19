import React from 'react';
import {render} from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import reducer from 'scripts/reducers/index.js';
import storage from 'scripts/services/Storage.js';
import bookmarksService from 'scripts/services/BookmarksService.js';
import BookmarkFolderTree from 'scripts/components/BookmarkFolderTree.jsx';

import 'styles/options.css';

Promise.all([
    storage.getHiddenBookmarkFolderIds(),
    bookmarksService.fetchBookmarkTree(),
]).then(([ids, bookmarks]) => {
    const initialState = {
        bookmarkFolders: {
            selectedIds: ids,
            rootBookmark: bookmarks[0],
        },
    };

    const store = createStore(reducer, initialState, applyMiddleware(thunk));

    const OptionsPage = () => {
        return (
            <Provider store={store}>
                <BookmarkFolderTree />
            </Provider>
        ) ;
    };

    render(<OptionsPage />, document.getElementById('app-container'));
});
