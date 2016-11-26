import React from 'react';
import { render } from 'react-dom';

import storage from 'scripts/services/Storage.js';
import PopupPage from 'scripts/pages/PopupPage.jsx';

import 'styles/popup.scss';

function buildRootComponent(isEncryptionActive) {
    return class Root extends React.PureComponent {
        constructor() {
            super();
            storage.addIsEncryptionActiveChangedListener((_, newValue) => {
                this.setState({ isEncryptionActive: newValue });
            });
            this.state = { isEncryptionActive };
        }

        render() {
            return <PopupPage isEncryptionActive={this.state.isEncryptionActive} />;
        }
    };
}

storage.getIsEncryptionActive().then((isEncryptionActive) => {
    const Root = buildRootComponent(isEncryptionActive);

    render(
        <Root />,
        document.getElementById('app-container')
    );
});
