import module from "../Module"

export class StorageService
{
    /**
     * Stores the item under "key"
     * @param key
     * @param value
     */
    set(key, value)
    {
        localStorage.setItem(key, JSON.stringify(value));
    }

    /**
     * @param key
     * @return {*} the item stored under "key" or null if not set
     */
    get(key)
    {
        return JSON.parse(localStorage.getItem(key));
    }

    /**
     * @param key
     * @return {boolean} true if "key" exists
     */
    has(key)
    {
        return !!localStorage.getItem(key);
    }
}

module.service("StorageService", StorageService);