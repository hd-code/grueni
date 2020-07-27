/*! storage v0.0.2 from hd-snippets-js | MIT | © Hannes Dröse https://github.com/hd-code/hd-snippets-js */

// -----------------------------------------------------------------------------

/** StorageMap is used to represent a list of storage elements. It is a map
 * where the element's id is the key and the element itself is the value. */
export type StorageMap<T> = {[id: string]: T};

/** A Storage is used to save a list of elements. The elements are indexed by an
 * id. The id can either be set manually or generated automatically. The id is
 * not necessarily part of the element.
 * 
 * The storage interface defines methods for interacting with an arbitrary
 * storage system. This could be a cache that will not persist, file or
 * database-based implementations. */
export interface Storage<T> {
    /** Completely empties the storage and returns all deleted items. */
    clear: () => StorageMap<T>;

    /** Deletes one element from the storage specified by its id. The deleted
     * element is then returned. If there is no element to delete, undefined is
     * returned. */
    delete: (id: string) => T|undefined;

    /** Returns all elements that match the filter. Each element in the storage
     * is passed to the filter function. The filter function should return true,
     * if the element should be returned and false if not. The matching elements
     * are returned together with their ids as a map. */
    filter: (filterFunc: (element: T) => boolean) => StorageMap<T>;

    /** Returns one element from the storage with the specified id. If there is
     * no such element, undefined is returned. */
    get: (id: string) => T|undefined;

    /** Returns all the elements in the storage together with their id as a map. */
    getAll: () => StorageMap<T>;

    /** Replaces all elements in the storage with a modified version of
     * themselves. The replace function defines the mapping from the original
     * element to the modified version. The modified elements are then stored
     * and returned.
     * 
     * When the preview flag is set to true, the function will only return the
     * modified versions of the elements. The original elements in the storage
     * are not altered, yet. This is useful for checking and verifying that the
     * replace function works as intended before actually doing the replacement. */
    replace: (replaceFunc: (element: T) => T, preview?: boolean) => StorageMap<T>;

    /** Saves an element to the storage. A new random id is generated under
     * which the element is stored. The id is then returned. */
    save: (element: T) => string;

    /** Stores an element under the specified id. If there already is an element
     * with that id, it is replaced. The former element (that was replaced) is
     * returned or undefined if the key was not used before. */
    set: (id: string, element: T) => T|undefined;
}

// -----------------------------------------------------------------------------

/** This function creates a new base storage. A base storage only exists during
 * the lifetime of the application. It can be used as a basis to implement more
 * advanced storage providers. */
export function BaseStorage<T>(initCache?: StorageMap<T>): Storage<T> {
    let cache = initCache ?? {};

    return {
        clear: () => {
            const result = cache;
            cache = {};
            return result;
        },
    
        delete: (id: string) => {
            const result = cache[id];
            delete cache[id];
            return result;
        },
    
        filter: (filterFunc: (element: T) => boolean) => {
            const result: StorageMap<T> = {};
            for (const key in cache) {
                try {
                    if (filterFunc(cache[key])) {
                        result[key] = cache[key];
                    }
                } catch (_) {}
            }
            return result;
        },
        
        get: (id: string) => cache[id],

        getAll: () => cache,

        replace: (replaceFunc: (element: T) => T, preview?: boolean) => {
            const result: StorageMap<T> = {};
            for (const key in cache) {
                result[key] = replaceFunc(cache[key]);
            }

            if (!preview) {
                cache = result;
            }

            return result;
        },

        save: (element: T) => {
            let id = '';
            while (id = generateKey(), cache[id] !== undefined);
            cache[id] = element;
            return id;
        },
        
        set: (id: string, element: T) => {
            const orig = cache[id];
            cache[id] = element;
            return orig;
        }
    };
}

// -----------------------------------------------------------------------------

const hexBase = 16;
const autoKeyLength = 16;

function generateKey(): string {
    const digits = [];
    for (let i = 0; i < autoKeyLength; i++) {
        digits.push(generateHexDigit());
    }
    return digits.join('');
}

function generateHexDigit(): string {
    const number = Math.floor(Math.random() * hexBase);
    return number.toString(hexBase)[0];
}