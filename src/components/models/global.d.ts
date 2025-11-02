// type RootStateType = ReturnType<typeof import("@/redux").getState>
declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
    }

    // type RootState = ReturnType<typeof import("@/redux/reducer").getState>;
    declare module "vite-plugin-eslint";
}
export { };