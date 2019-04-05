import * as Roact from "rbx-roact"
import Stamper from "../tools/Stamper"
import { RunService } from "rbx-services";

export interface CategoryButtonProps {

    stamper: Stamper
    name: string

}

export class CategoryButton extends Roact.Component {

    constructor(props: object) {

        super(props)

        this.ref = Roact.createRef()

    }

    render() {

        const props = this.props as CategoryButtonProps

        return <textbutton Ref={this.ref} Key="setButton" Text={props.name} Position={new UDim2(0, 5, 0, 18)} Size={new UDim2(1, -5, 0, 18)} BackgroundTransparency={1} BackgroundColor3={Color3.fromRGB(255, 255, 255)} BorderSizePixel={0} AutoButtonColor={false} TextWrapped={true} TextXAlignment={Enum.TextXAlignment.Left} TextColor3={Color3.fromRGB(255, 255, 255)} TextSize={18} Font={Enum.Font.Arial} Event={{
            MouseButton1Click: () => {

                props.stamper.setCategory(props.name)

            },
            MouseEnter: button => {

                if (props.stamper.categoryName !== props.name) {
                    
                    button.BackgroundTransparency = 0
                    button.TextColor3 = new Color3(0, 0, 0)

                }

            },
            MouseLeave: button => {

                if (props.stamper.categoryName !== props.name) {

                    button.BackgroundTransparency = 1
                    button.TextColor3 = new Color3(1, 1, 1)

                }

            }
        }}/>

    }

    didMount() {

        const props = this.props as CategoryButtonProps

        const button = this.ref.current as TextButton

        let category = props.stamper.categoryName

        RunService.RenderStepped.Connect(() => {
            
            if (props.stamper.categoryName === props.name) {

                button.BackgroundColor3 = Color3.fromRGB(0, 204, 0)
                button.TextColor3 = new Color3(0, 0, 0)
                button.BackgroundTransparency = 0

            } else if (props.stamper.categoryName !== category) {

                button.BackgroundColor3 = new Color3(1, 1, 1)
                button.TextColor3 = new Color3(1, 1, 1)
                button.BackgroundTransparency = 1

            }

            category = props.stamper.categoryName

        })

    }

    ref: Roact.Ref<TextButton>
    
}