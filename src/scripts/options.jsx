import React from 'react';
import {render} from 'react-dom';
import {createStore, compose, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import reducer from 'scripts/reducers/index.js';
import BookmarkFolderTree from 'scripts/components/BookmarkFolderTree.jsx';

import 'styles/options.css';

const store = createStore(reducer, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f,
));

const OptionsPage = () => {
    return (
        <Provider store={store}>
            <BookmarkFolderTree />
        </Provider>
    ) ;
};

render(<OptionsPage />, document.getElementById('app-container'));
