/// <reference types="vite/client" />
interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: function;
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: function,
}

declare global {
    interface Window {
        custom: any; // Replace 'any' with the actual type of 'custom'
    }
}