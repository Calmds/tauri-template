import { fromJS } from "immutable";
import { UnknownAction, Reducer } from "redux";
import { combineReducers } from 'redux-immutable';
import { ThemeConfigProvider } from "@/components/models/antd-ext";

// 不再为每个component都定义一个reducer，而是同意划归这个rootReducer管理
const initialState = fromJS({
    theme: fromJS({} as ThemeConfigProvider), // 主题配置
    selectedText: fromJS(""), // 选中的文本
});

const rootReducer: Reducer<any, UnknownAction> = (prevState = initialState, action: UnknownAction) => {

    // 这种方式省时省力
    let state = prevState;

    if (!action.type) return state;

    let usefulProps: string[] = Object.keys(action).filter(prop => prop && prop !== "type");

    for (const usefulProp of usefulProps) {
        state = state.set(usefulProp, action[usefulProp]);
    }

    return state;
};

// 利用combineReducers将多个reducers分开管理在使用时再合并成一个
export default combineReducers({ reducers: rootReducer });