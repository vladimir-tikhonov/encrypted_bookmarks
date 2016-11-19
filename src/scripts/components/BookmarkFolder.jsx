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
                <TreeView
                    key={bookmarkFolder.id}
                    nodeLabel={label}
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
};

export default BookmarkFolder;
