export default class Bookmark {
    constructor({ id, title, url, parent, children }) {
        this._id = id;
        this._title = title;
        this._url = url;
        this._parent = parent;
        this._children = children;
    }

    get id() {
        return this._id;
    }

    get title() {
        return this._title;
    }

    get url() {
        return this._url;
    }

    set url(value) {
        this._url = value;
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

    isFolder() {
        return !this.url;
    }

    hasChildren() {
        return this.children.length !== 0;
    }

    deepGetChildrenIds() {
        if (this.children.length === 0) {
            return [];
        }

        let ids = [];
        this.children.forEach((child) => {
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
