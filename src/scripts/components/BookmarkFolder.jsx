import React, {PropTypes} from 'react';

import TreeView from 'scripts/components/TreeView.jsx';

class BookmarkFolder extends React.PureComponent {
    constructor() {
        super();
        this.state = {collapsed: false};
    }

    toggleCollapsed() {
        this.setState({collapsed: !this.state.collapsed});
    }

    renderChildren() {
        const {bookmarkFolder, onToggle, selectedIds} = this.props;

        return bookmarkFolder.children.map(child => {
            return (
                <BookmarkFolder
                    key={child.id}
                    bookmarkFolder={child}
                    onToggle={onToggle}
                    selectedIds={selectedIds}
                />
            );
        });
    }

    renderLabel() {
        const {bookmarkFolder, onToggle, selectedIds} = this.props;
        const checked = selectedIds.has(bookmarkFolder.id);

        return (
            <div>
                <span className="node">{bookmarkFolder.name}</span>
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => onToggle(bookmarkFolder, !checked)}
                />
            </div>
        );
    }

    render() {
        const {bookmarkFolder} = this.props;

        return (
            <div>
                <TreeView
                    key={bookmarkFolder.id}
                    nodeLabel={this.renderLabel()}
                    collapsed={this.state.collapsed}
                    onArrowClick={() => this.toggleCollapsed()}
                >
                    {this.renderChildren()}
                </TreeView>
            </div>
        );
    }
}

BookmarkFolder.propTypes = {
    bookmarkFolder: PropTypes.object.isRequired,
    selectedIds: PropTypes.object.isRequired,
    onToggle: PropTypes.func.isRequired,
};

export default BookmarkFolder;
