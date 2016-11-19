import _difference from 'lodash/difference';

export default {
    getAdditionalIdsToSelect(bookmarkFolder, selectedIds) {
        const idsToSelect = bookmarkFolder.deepGetChildrenIds();
        const allSelectedIds = [bookmarkFolder.id, ...idsToSelect, ...selectedIds];

        bookmarkFolder.deepGetParents().forEach((parent) => {
            const childrenIds = parent.deepGetChildrenIds();
            const allChildAreChecked = _difference(childrenIds, allSelectedIds).length === 0;

            if (allChildAreChecked) {
                allSelectedIds.push(parent.id);
                idsToSelect.push(parent.id);
            }
        });

        return idsToSelect;
    },

    getAdditionalIdsToDeselect(bookmarkFolder) {
        return [
            ...bookmarkFolder.deepGetChildrenIds(),
            ...bookmarkFolder.deepGetParentIds(),
        ];
    },
};
