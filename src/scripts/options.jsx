import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import reducer from 'scripts/reducers/index.js';
import storage from 'scripts/services/Storage.js';
import bookmarksService from 'scripts/services/BookmarksService.js';
import OptionsPage from 'scripts/pages/OptionsPage.jsx';

import 'styles/options.scss';

Promise.all([
    storage.getEncryptedBookmarkFolderIds(),
    bookmarksService.fetchBookmarkFoldersTree(),
]).then(([ids, bookmarks]) => {
    const initialState = {
        bookmarkFolders: {
            selectedIds: ids,
            rootBookmark: bookmarks[0],
        },
    };

    const store = createStore(reducer, initialState, applyMiddleware(thunk));

    const Root = (
        <Provider store={store}>
            <OptionsPage />
        </Provider>
    );

    render(<Root />, document.getElementById('app-container'));
});
