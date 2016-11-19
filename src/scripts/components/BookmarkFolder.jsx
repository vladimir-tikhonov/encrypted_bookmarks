import React, {PropTypes} from 'react';

import TreeView from 'scripts/components/TreeView.jsx';

class BookmarkFolder extends React.PureComponent {
    renderChildren() {
        const {bookmarkFolder} = this.props;

        return bookmarkFolder.children.map(child => {
            return (
                <BookmarkFolder key={child.id} bookmarkFolder={child} />
            );
        });
    }

    render() {
        const {bookmarkFolder} = this.props;
        const label = <span className="node">{bookmarkFolder.name}</span>;

        return (
            <div>
                <TreeView key={bookmarkFolder.id} nodeLabel={label} defaultCollapsed={false}>
                    {this.renderChildren()}
                </TreeView>
            </div>
        );
    }
}

BookmarkFolder.propTypes = {
    bookmarkFolder: PropTypes.object.isRequired,
};

export default BookmarkFolder;
