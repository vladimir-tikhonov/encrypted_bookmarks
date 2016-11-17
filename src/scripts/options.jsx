import React from 'react';
import {render} from 'react-dom';

import DirectoryTree from 'scripts/components/DirectoryTree.jsx';

import 'styles/options.css';

const OptionsPage = () => {
    return <DirectoryTree />;
};

render(<OptionsPage />, document.getElementById('app-container'));
