/*! storage-local v0.0.1 from hd-snippets-js | MIT | © Hannes Dröse https://github.com/hd-code/hd-snippets-js */

import * as fs from 'fs';
import * as path from 'path';

import { Storage, StorageMap, BaseStorage } from './storage';

// -----------------------------------------------------------------------------

/** This function creates a new local storage. The local storage is dumped into
 * a simple json file. An arbitrary filepath (including the filename) can be
 * specified. The file is used to persist the storage. */
export function LocalStorage<T>(filepath?: string): Storage<T> {
    const file = filepath ? path.resolve(filepath) : path.resolve(__dirname, defaultFileName);
    let cache = initLocalStorage<T>(file);

    const storage = BaseStorage(cache);

    const dumpToFile = () => {
        const data = storage.getAll();
        saveToFile(file, data);
    }

    return {
        clear:  () => {
            const result = storage.clear();
            dumpToFile();
            return result;
        },

        delete: (id: string) => {
            const result = storage.delete(id);
            dumpToFile();
            return result;
        },

        filter: storage.filter,

        get: storage.get,

        getAll: storage.getAll,

        replace: (replaceFunc: (element: T) => T, preview?: boolean) => {
            const result = storage.replace(replaceFunc, preview);
            !preview && dumpToFile();
            return result;
        },

        save: (element: T) => {
            const result = storage.save(element);
            dumpToFile();
            return result;
        },

        set: (id: string, element: T) => {
            const result = storage.set(id, element);
            dumpToFile();
            return result;
        },
    };
}

// -----------------------------------------------------------------------------

const defaultFileName = 'localstorage.json';

function initLocalStorage<T>(filepath: string): StorageMap<T> {
    try {
        const raw = fs.readFileSync(filepath);
        const parsed = JSON.parse(raw as any);
        if (typeof parsed !== 'object' || !parsed) {
            throw new Error('Invalid file content');
        }
        return parsed;
    } catch (_) {
        saveToFile(filepath, {});
        return {};
    }
}

function saveToFile<T>(filepath: string, _data: StorageMap<T>) {
    const data = JSON.stringify(_data);
    fs.writeFileSync(filepath, data);
}