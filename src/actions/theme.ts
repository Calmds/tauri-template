import { Dispatch } from "redux";
import { MappingAlgorithm } from "antd";
import { setBinStore, getBinStore } from "@/utility/store";
import { getCurrentWindow, Theme } from "@tauri-apps/api/window";
import { ThemeConfigProvider, ThemeEnum } from "../components/models/antd-ext";

const THEME_KEY = 'THEME';

// 切换主题
export const sendTheme2Redux = (theme: ThemeConfigProvider) => {
    return { type: THEME_KEY, theme };
}

// 切换主题
export const changeTheme = (themeAlgorithm: MappingAlgorithm) => {
    return async (dispatch: Dispatch, _getState: Function) => {
        const newTheme: ThemeConfigProvider = new ThemeConfigProvider();
        newTheme.themeAlgorithm = [themeAlgorithm];
        setBinStore(THEME_KEY, newTheme.themeName);
        await getCurrentWindow().setTheme(newTheme.themeName as Theme);
        return dispatch(sendTheme2Redux(newTheme));
    };
}

// 从本地存储中获取主题配置
export const getThemeConcfigFromStore = () => {
    return async (dispatch: Dispatch, _getState: Function) => {
        const newTheme: ThemeConfigProvider = new ThemeConfigProvider();
        newTheme.algorithm = (await getBinStore<ThemeEnum>(THEME_KEY)) || ThemeEnum.Light;
        await getCurrentWindow().setTheme(newTheme.themeName as Theme);
        return dispatch(sendTheme2Redux(newTheme));
    };
}