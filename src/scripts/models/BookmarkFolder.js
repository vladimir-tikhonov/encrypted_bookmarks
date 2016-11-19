export default class BookmarkFolder {
    constructor({id, name, parent, children}) {
        this._id = id;
        this._name = name;
        this._parent = parent;
        this._children = children;
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    get parent() {
        return this._parent;
    }

    get children() {
        return this._children;
    }

    set children(value) {
        this._children = value;
    }

    hasChildren() {
        return this.children.length !== 0;
    }

    deepGetChildrenIds() {
        if (this.children.length === 0) {
            return [];
        }

        let ids = [];
        this.children.map(child => {
            ids.push(child.id);
            ids = ids.concat(child.deepGetChildrenIds());
        });

        return ids;
    }

    isRoot() {
        return this.parent === null;
    }

    deepGetParents() {
        if (!this.parent) {
            return [];
        }

        return [this.parent].concat(this.parent.deepGetParents());
    }

    deepGetParentIds() {
        return this.deepGetParents().map(parent => parent.id);
    }
}
