import React, { PropTypes } from 'react';
import classnames from 'classnames';

class TreeView extends React.PureComponent {
    renderArrow() {
        const { collapsed, onArrowClick, children } = this.props;
        if (children.length === 0) {
            return null;
        }

        const classes = classnames('arrow', {
            collapsed,
        });

        return (
            <button
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

        const containerClasses = classnames('children', {
            collapsed,
        });

        return (
            <div className="tree-view">
                <div className={'item'}>
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
    onArrowClick: PropTypes.func.isRequired,
};

export default TreeView;
