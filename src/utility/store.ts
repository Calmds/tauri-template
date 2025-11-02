import { load, StoreOptions } from '@tauri-apps/plugin-store';
import { encodeBase64, decodeBase64 } from './base64';

const storeOptions: StoreOptions = {
    defaults: {
        theme: 'dark',
        // language: 'en',
        language: 'zh-CN'
    },
    autoSave: true,
};
const store = await load('settings.dat', storeOptions);

// 获取存储
export const getStore = async<T>(key: string): Promise<T> => {
    let val = await store.get<string>(key);
    return val ? JSON.parse(decodeBase64(val)) : null as T;
};

// 设置存储
export const setStore = async (key: string, value: any) => await store.set(key, encodeBase64(JSON.stringify(value)));

// 删除存储
export const removeStore = async (key: string) => await store.delete(key);


/**
 * 从 Store 中获取指定键的值
 * @param key 存储的键名
 * @returns 对应值的 Promise
 */
export const getBinStore = async <T>(key: string): Promise<T | null> => {
    try {
        const value = await store.get<T>(key);

        // 明确处理 undefined 情况
        if (value === undefined) {
            return null;
        }

        return value;
    } catch (error) {
        console.error(`Failed to get value for key "${key}":`, error);
        return null;
    }
};


/**
 * 设置 Store 中的键值对
 * @param key 存储的键名
 * @param value 要存储的值
 */
export const setBinStore = async <T>(key: string, value: T): Promise<void> => {
    try {
        await store.set(key, value);
        await store.save(); // 确保数据持久化
    } catch (error) {
        console.error(`Failed to set value for key "${key}":`, error);
        throw error;
    }
};

/**
 * 获取 Store 中的所有键
 * @returns 键名数组的 Promise
 */
export const getStoreKeys = async (): Promise<string[]> => {
    try {
        return await store.keys();
    } catch (error) {
        console.error('Failed to get store keys:', error);
        return [];
    }
};