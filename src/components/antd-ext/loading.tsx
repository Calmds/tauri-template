import { PureComponent } from "react";
import { Spin } from "antd";

interface LoadingState {
    loadingText: string
}

export default class Loading extends PureComponent<LoadingState, LoadingState> {

    constructor(props: LoadingState) {
        super(props)
        this.state = { loadingText: props.loadingText }
    }

    render() {
        return <Spin
            size="large"
            tip={`Dynamic Loading ${this.state.loadingText} Component...`}
            style={{
                width: "40%",
                height: "20%",
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%,-50%)"
            }} />;
    }
}