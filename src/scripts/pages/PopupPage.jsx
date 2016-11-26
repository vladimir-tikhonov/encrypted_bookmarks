import React, { PropTypes } from 'react';

import storage from 'scripts/services/Storage.js';

export default class PopupPage extends React.PureComponent {
    constructor() {
        super();
        this.onEncryptonToggleButtonClick = this.onEncryptonToggleButtonClick.bind(this);
    }

    onEncryptonToggleButtonClick() {
        const { isEncryptionActive } = this.props;
        storage.setIsEncryptionActive(!isEncryptionActive);
    }

    render() {
        const { isEncryptionActive } = this.props;
        return (
            <div className="popup-page">
                <button onClick={this.onEncryptonToggleButtonClick}>
                    {isEncryptionActive ? 'Encrypt bookmarks' : 'Decrypt bookmarks'}
                </button>
            </div>
        );
    }
}

PopupPage.propTypes = {
    isEncryptionActive: PropTypes.bool.isRequired,
};
