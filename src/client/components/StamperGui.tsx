import * as Roact from "rbx-roact"

export interface StamperGuiProps {



}

export class StamperGui extends Roact.Component {

    constructor(props: StamperGuiProps) {

        super(props as Object)

        this.ref = Roact.createRef<ScreenGui>()

    }

    render() {

        return <screengui Ref={this.ref}>

            

        </screengui>

    }

    ref: Roact.Ref<ScreenGui>

}