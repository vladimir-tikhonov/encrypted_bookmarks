import React, { PropTypes } from 'react';

import cryptographyService from 'scripts/services/CryptographyService.js';

export default class PopupPage extends React.PureComponent {
    constructor() {
        super();
        this.onEncryptonToggleButtonClick = this.onEncryptonToggleButtonClick.bind(this);
    }

    onEncryptonToggleButtonClick() {
        const { isEncryptionActive } = this.props;
        const password = this.passwordInput.value;

        if (isEncryptionActive) {
            cryptographyService.performDecryption(password);
        } else {
            cryptographyService.performEncryption(password);
        }

        this.passwordInput.value = '';
    }

    render() {
        const { isEncryptionActive } = this.props;
        return (
            <div className="popup-page">
                <input
                    type="password"
                    placeholder="Enter password"
                    ref={(input) => { this.passwordInput = input; }}
                />
                <button onClick={this.onEncryptonToggleButtonClick}>
                    {isEncryptionActive ? 'Decrypt bookmarks' : 'Encrypt bookmarks'}
                </button>
            </div>
        );
    }
}

PopupPage.propTypes = {
    isEncryptionActive: PropTypes.bool.isRequired,
};
