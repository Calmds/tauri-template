import { ThemeConfig } from "antd/lib";
import { MappingAlgorithm, theme } from "antd";

const { darkAlgorithm, defaultAlgorithm } = theme;

export class ThemeConfigProvider {
    constructor(
        public theme?: ThemeConfig,
    ) { }

    set themeConfig(theme: ThemeConfig) {
        this.theme = theme;
    }

    set themeAlgorithm(algorithm: MappingAlgorithm | MappingAlgorithm[]) {
        this.theme = { algorithm: algorithm };
    }

    set algorithm(themeName: ThemeEnum) {
        this.theme = { algorithm: themeName === ThemeEnum.Dark ? darkAlgorithm : defaultAlgorithm };
    }

    get themeName() {
        let algs = this.theme?.algorithm as MappingAlgorithm[];
        if (typeof algs === "function") algs = [algs];
        return algs.includes(darkAlgorithm) ? ThemeEnum.Dark : ThemeEnum.Light;
    }

}

export enum ThemeEnum {
    Dark = "dark",
    Light = "light",
}

export interface AntdSelectItem {
    key?: string,
    value: string | number,
    label: string | React.ReactNode
}