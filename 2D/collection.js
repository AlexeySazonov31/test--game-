class IndexedMap {
  #arr = [];
  /*
    [
      {
        index: '',
        key: '',
        value: '',
      },
      {
        ...
      },
     ]
    */
  set(key, value) {
    let found = false;
    for (let elem of this.#arr) {
      if (elem.key === key) {
        elem.value = value;
        found = true;
      }
    }
    if (!found) {
      let obj = {
        index: this.#arr.length,
        key: key,
        value: value,
      };
      this.#arr.push(obj);
    }
    console.log(this.#arr);
    return this;
  }

  has(key) {
    let found = false;
    for (let elem of this.#arr) {
      if (elem.key === key) {
        found = true;
      }
    }
    return found;
  }

  hasIndex(index) {
    let found = false;
    for (let elem of this.#arr) {
      if (elem.index == index) {
        found = true;
      }
    }
    return found;
  }
  get(key) {
    let found = null;
    for (let elem of this.#arr) {
      if (elem.key === key) {
        found = elem.value;
      }
    }
    if( found === null ){
        throw new Error( `element with key: ${key} - not found` );
    }
    return found;
  }

  getByIndex(index) {
    let found = null;
    for (let elem of this.#arr) {
      if (elem.index == index) {
        found = elem.value;
      }
    }
    if( found === null ){
        throw new Error( `element with index: ${index} - not found` );
    }
    return found;  
  }

    remove(key) {
        let success = false;
        for( let elem of this.#arr ){
            if( elem.key === key ){
                this.#arr.splice( elem.index, 1 );
                success = true;
            }
        }
        if( success ){
            let i = 0;
            for( let elem of this.#arr ){
                elem.index = i++;
            }
        } else {
            throw new Error( `element with key: ${key} - not found` );
        }
        console.log(this.#arr);

    return this;
    }


    size() { // starting from 1 !
        return this.#arr.length;
    }

    /*

    forEach(fn(value, key, index)) {
    return this;
    }
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
let collection = new IndexedMap();
collection.set("key0", "value0");
collection.set("key1", "value1");
collection.set("key2", "value2");
collection.set("key3", "value3");
collection.set("key2", "value233");
collection.set("key4", "value4");
collection.set("key0", "");

console.log( '!!has!!' );
console.log(collection.has("key3"));
console.log(collection.has("key"));
console.log(collection.has("key0"));

console.log( '!!hasIndex!!' );
console.log(collection.hasIndex(3));
console.log(collection.hasIndex("3"));
console.log(collection.hasIndex(15));

console.log( '!!get!!' );
console.log(collection.get("key0"));
console.log(collection.get("key0"));
console.log(collection.get("key2"));

console.log( '!!getByIndex!!' );
console.log(collection.getByIndex(0));
console.log(collection.getByIndex('1'));
console.log(collection.getByIndex(4));

console.log( '!!remove!!' );
collection.remove('key0');
collection.remove('key4');
collection.remove('key2');

console.log( '!!size!!' );
console.log( collection.size() );

