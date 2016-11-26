import React, { PropTypes } from 'react';

import cryptographyService from 'scripts/services/CryptographyService.js';

export default class PopupPage extends React.PureComponent {
    constructor() {
        super();
        this.onEncryptonToggleButtonClick = this.onEncryptonToggleButtonClick.bind(this);
    }

    onEncryptonToggleButtonClick() {
        const { isEncryptionActive } = this.props;

        if (isEncryptionActive) {
            cryptographyService.performDecryption();
        } else {
            cryptographyService.performEncryption();
        }
    }

    render() {
        const { isEncryptionActive } = this.props;
        return (
            <div className="popup-page">
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
