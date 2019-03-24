import * as Roact from "rbx-roact"

export interface BaseProps {



}

export class Base extends Roact.Component {

    constructor(props: object) {

        super(props)

        this.ref = Roact.createRef()

    }

    render() {

        return <frame Ref={this.ref}>



        </frame>

    }

    didMount() {



    }

    ref: Roact.Ref<Frame>
    
}