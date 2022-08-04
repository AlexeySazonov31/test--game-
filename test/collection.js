class IndexedMap {
  #arr = [];

  getCollection() {
    return this.#arr;
  }
  showCollection() {
    console.log(this.#arr);
  }

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
    if (found === null) {
      throw new Error(`element with key: ${key} - not found`);
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
    if (found === null) {
      throw new Error(`element with index: ${index} - not found`);
    }
    return found;
  }

  remove(key) {
    let success = false;
    for (let elem of this.#arr) {
      if (elem.key === key) {
        this.#arr.splice(elem.index, 1);
        success = true;
      }
    }
    if (success) {
      let i = 0;
      for (let elem of this.#arr) {
        elem.index = i++;
      }
    } else {
      throw new Error(`element with key: ${key} - not found`);
    }
    console.log(this.#arr);

    return this;
  }

  size() {
    // starting from 1 !
    return this.#arr.length;
  }

  union(maps) {
    // for arrays of objects with key: [{ key: '', }] and
    let foundKey = false;
    for (let elem of maps) {
      console.log(elem);

      if (!elem.key) {
        foundKey = true;
      }
    }
    if (foundKey) {
      throw new Error("Merge failed, key not found");
    }
    for (let elem of maps) {
      let found = false;
      for (let thisElem of this.#arr) {
        //key matching check
        if (thisElem.key === elem.key) {
          found = true;
        }
      }
      if (!found) {
        this.set(elem.key, elem.value ? elem.value : "");
      } else {
        throw new Error("key match");
      }
    }
    return this;
  }

  forEach(func) {
    for (let elem of this.#arr) {
      func(elem.value, elem.key, elem.index);
    }
    return this;
  }

  uniq() {
    let arr = [];
    for (let elem of this.#arr) {
      arr.push(elem.value);
    }
    return [...new Set(arr)];
  }

  uniqKeys() {
    let arr = [];
    for (let elem of this.#arr) {
      arr.push(elem.key);
    }
    return arr;
  }

  reverseIndexes() {
    this.#arr.sort(() => -1);
    return this;
  }

  removeAt(index, count = 1) {
    if (index > this.#arr.length - 1) {
      throw new Error(
        `collection has no element with index: ${index}, collection length: ${this.size()}`
      );
    } else {
      this.#arr.splice(index, count);
    }

    return this;
  }


}

// ------------------------ testing --------------------------------------------
let collection = new IndexedMap();

collection.set("key0", "value0");
collection.set("key1", "value8");
collection.set("key2", "value2");
collection.set("key3", "value3");
collection.set("key2", "value233");
collection.set("key4", "value4");
collection.set("key0", "");

collection.showCollection();

console.log("!!has!!");
console.log(collection.has("key3"));
console.log(collection.has("key"));
console.log(collection.has("key0"));

console.log("!!hasIndex!!");
console.log(collection.hasIndex(3));
console.log(collection.hasIndex("3"));
console.log(collection.hasIndex(15));

console.log("!!get!!");
console.log(collection.get("key0"));
console.log(collection.get("key0"));
console.log(collection.get("key2"));

console.log("!!getByIndex!!");
console.log(collection.getByIndex(0));
console.log(collection.getByIndex("1"));
console.log(collection.getByIndex(4));

console.log("!!remove!!");
collection.remove("key0");
collection.remove("key4");
collection.remove("key2");

console.log("!!size!!");
console.log(collection.size());

let collection2 = new IndexedMap();
collection2.set("key2", "value5");
collection2.set("key6", "value6");
collection2.set("key7", "value7");
collection2.set("key8", "value8");

collection.union(collection2.getCollection());
collection.union([
  {
    key: "key5",
  },
  {
    key: "key9",
    value: "value9",
  },
  /*
        {
            value: 'value10'
        }
        */
]);

//collection.reverseIndexes();
collection.showCollection();

//collection.removeAt(2, 5);


collection.showCollection();

