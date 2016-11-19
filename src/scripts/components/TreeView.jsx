import React, {PropTypes} from 'react';
import classnames from 'classnames';

class TreeView extends React.PureComponent {
    renderArrow() {
        const {collapsed, onArrowClick, children} = this.props;
        if (children.length === 0) {
            return null;
        }

        const classes = classnames('tree-view_arrow', {
            'tree-view_arrow-collapsed': collapsed,
        });

        return (
            <div
                className={classes}
                onClick={onArrowClick}
            />
        );
    }

    render() {
        const {
            collapsed,
            nodeLabel,
            children,
        } = this.props;

        const containerClasses = classnames('tree-view_children', {
            'tree-view_children-collapsed': collapsed,
        });

        return (
            <div className="tree-view">
                <div className={'tree-view_item'}>
                    {this.renderArrow()}
                    {nodeLabel}
                </div>
                <div className={containerClasses}>
                    {collapsed ? null : children}
                </div>
            </div>
        );
    }
}

TreeView.propTypes = {
    collapsed: PropTypes.bool.isRequired,
    nodeLabel: PropTypes.node.isRequired,
    className: PropTypes.string,
    itemClassName: PropTypes.string,
    onArrowClick: PropTypes.func.isRequired,
};

export default TreeView;
