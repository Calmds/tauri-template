// 判断是否为可输入元素
export const isInputElement = (element: HTMLElement): boolean => {
    if (!element) return false;

    const inputTags = ['INPUT', 'TEXTAREA', 'SELECT'];
    const editableAttributes = ['contenteditable', 'data-editable'];

    return (
        inputTags.includes(element.tagName) ||
        editableAttributes.some(attr => element.hasAttribute(attr)) ||
        element.isContentEditable
    );
};

// 粘贴文本到指定元素
export const pasteToElement = (element: HTMLElement, text: string) => {
    if (!element || !text) return;

    try {
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            const inputElement = element as HTMLInputElement | HTMLTextAreaElement;

            // 确保焦点
            inputElement.focus();

            const start = inputElement.selectionStart || 0;
            const end = inputElement.selectionEnd || 0;

            const value = inputElement.value;
            const newValue = value.substring(0, start) + text + value.substring(end);

            // 对于 Ant Design 组件，使用更彻底的事件触发
            const setValue = (element: HTMLInputElement | HTMLTextAreaElement, value: string) => {
                // 方法1: 使用原生值设置器
                const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
                    window.HTMLInputElement.prototype,
                    'value'
                )?.set;

                if (nativeInputValueSetter) {
                    nativeInputValueSetter.call(element, value);
                }
                // 方法2: 直接设置
                else {
                    element.value = value;
                }

                // 方法3: 触发所有可能的事件
                const events = [
                    new Event('input', { bubbles: true, cancelable: true }),
                    new Event('change', { bubbles: true, cancelable: true }),
                    new KeyboardEvent('keydown', { bubbles: true, cancelable: true }),
                    new KeyboardEvent('keyup', { bubbles: true, cancelable: true }),
                    new FocusEvent('focus', { bubbles: true, cancelable: true }),
                    new FocusEvent('blur', { bubbles: true, cancelable: true })
                ];

                events.forEach(event => {
                    element.dispatchEvent(event);
                });

                // 方法4: 特别模拟 React 的 onChange
                const reactChangeEvent = new Event('change', {
                    bubbles: true,
                    cancelable: true
                });

                // 添加 target 属性
                Object.defineProperty(reactChangeEvent, 'target', {
                    value: element,
                    enumerable: true
                });

                Object.defineProperty(reactChangeEvent, 'currentTarget', {
                    value: element,
                    enumerable: true
                });

                element.dispatchEvent(reactChangeEvent);
            };

            setValue(inputElement, newValue);

            // 更新光标位置
            const newCursorPosition = start + text.length;
            inputElement.selectionStart = newCursorPosition;
            inputElement.selectionEnd = newCursorPosition;

            // 强制重新聚焦
            setTimeout(() => {
                inputElement.focus();
                inputElement.selectionStart = newCursorPosition;
                inputElement.selectionEnd = newCursorPosition;
            }, 50);

        }

        // 处理可编辑元素（保持不变）
        else if (element.isContentEditable) {
            element.focus();
            const selection = window.getSelection();
            if (selection && selection.rangeCount > 0) {
                const range = selection.getRangeAt(0);
                range.deleteContents();
                const textNode = document.createTextNode(text);
                range.insertNode(textNode);
                range.setStartAfter(textNode);
                range.setEndAfter(textNode);
                selection.removeAllRanges();
                selection.addRange(range);
            } else {
                element.textContent += text;
            }
            element.dispatchEvent(new Event('input', { bubbles: true }));
        }
    } catch (error) {
        alternativePaste(element, text);
    }
};

// 备选粘贴方法 - 模拟用户键盘输入
const alternativePaste = (element: HTMLElement, text: string) => {
    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        const inputElement = element as HTMLInputElement | HTMLTextAreaElement;

        // 确保焦点
        inputElement.focus();

        // 模拟 Ctrl+A 全选
        const selectAllEvent = new KeyboardEvent('keydown', {
            key: 'a',
            code: 'KeyA',
            ctrlKey: true,
            bubbles: true,
            cancelable: true
        });
        inputElement.dispatchEvent(selectAllEvent);

        // 模拟输入
        const inputEvent = new InputEvent('input', {
            inputType: 'insertText',
            data: text,
            bubbles: true,
            cancelable: true
        });

        // 直接设置值
        inputElement.value = text;

        // 触发输入事件
        inputElement.dispatchEvent(inputEvent);

        // 触发变化事件
        const changeEvent = new Event('change', { bubbles: true });
        inputElement.dispatchEvent(changeEvent);
    }
};