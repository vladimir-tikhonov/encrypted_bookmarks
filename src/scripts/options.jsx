import React from 'react';
import {render} from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import reducer from 'scripts/reducers/index.js';
import storage from 'scripts/services/Storage.js';
import BookmarkFolderTree from 'scripts/components/BookmarkFolderTree.jsx';

import 'styles/options.css';

storage.getHiddenBookmarkFolderIds().then(ids => {
    const initialState = {
        bookmarkFolders: {
            selectedIds: ids,
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
