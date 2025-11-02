import { Dispatch } from "redux";

// 缓存选中的文本
export const updateSelectedText = (selectedText: string) => {
    return async (dispatch: Dispatch, _getState: Function) => {
        return dispatch(sendSelectedText(selectedText));
    };
}

const sendSelectedText = (selectedText: string) => {
    return { type: 'SELECTED_TEXT', selectedText }
}