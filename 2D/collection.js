class IndexedMap {
    set(key, value) {
    return this;
    }
    has(key) {
    return false;
    }
    hasIndex(index) {
    return false;
    }
    get(key) {
    return null;
    }
    getByIndex(index) {
    return null;
    }
    remove(key) {
    return this;
    }
    size() {
    return 0;
    }
    forEach(fn(value, key, index)) {
    return this;
    }
    /*
    union(...maps) {
    return this;
    }
    uniq() {
    return [];
    }
    uniqKeys() {
    return [];
    }
    sort(fn(value1, value2, key1, key2)) {
    return this;
    }
    sortIndexes(fn(index1, index2) {
    return this;
    }
    setTo(index, value) {
    return this;
    }
    removeAt(index, count = 1) {
    return this;
    */
}