export default class BookmarkFolder {
    constructor(id, name, children) {
        this._id = id;
        this._name = name;
        this._children = children;
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    get children() {
        return this._children;
    }
}
