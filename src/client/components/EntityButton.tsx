import * as Roact from "rbx-roact"
import Stamper from "../tools/Stamper"
import { getEntityDatum } from "../../shared/settings"

export interface EntityButtonProps {

    id: number
    stamper: Stamper
    name: string
    displayName: string
    smallImage: string
    largeImage: string
    displayNameLabelRef: Roact.Ref<TextLabel>
    largeImageLabelRef: Roact.Ref<ImageLabel>
    

}

export class EntityButton extends Roact.Component {

    constructor(props: object) {

        super(props)

        this.ref = Roact.createRef()

    }

    render() {

        const props = this.props as EntityButtonProps

        const displayNameLabel = props.displayNameLabelRef.current as TextLabel
        const largeImageLabel = props.largeImageLabelRef.current as ImageLabel

        return <frame Ref={this.ref} Key="insertAssetButton" Position={new UDim2(0, 128, 0, 64)} Size={new UDim2(0, 64, 0, 64)} BorderSizePixel={0} BackgroundTransparency={1} BackgroundColor3={Color3.fromRGB(242, 243, 243)}>
            <textbutton Key="button" Text="" Position={new UDim2(0.025, 0, 0.025, 0)} Size={new UDim2(0.95, 0, 0.95, 0)} Style={Enum.ButtonStyle.RobloxButton} TextTransparency={0.1} BorderSizePixel={0} BackgroundColor3={Color3.fromRGB(71, 71, 71)} BackgroundTransparency={0.1} Event={{
                MouseButton1Click: () => {

                    props.stamper.startPlacing(getEntityDatum(props.name))
                    
                },
                MouseEnter: () => {

                    displayNameLabel.Text = props.displayName
                    largeImageLabel.Image = props.largeImage

                }
            }}>
                <imagelabel Image={props.smallImage} Key="buttonImage" ZIndex={2} Position={new UDim2(0, -8, 0, -8)} Size={new UDim2(1, 16, 1, 16)} BackgroundTransparency={1}/>
            </textbutton>
            <imagelabel Key="configIcon" Image="http://www.roblox.com/asset?id=54140547" Visible={false} Position={new UDim2(1, -23, 1, -24)} Size={new UDim2(0, 16, 0, 16)} BackgroundColor3={Color3.fromRGB(0, 0, 0)} BorderSizePixel={0}/>
        </frame>

    }

    didMount() {

        const props = this.props as EntityButtonProps

        const entityButton = this.ref.current as Frame

        entityButton.Name = tostring(props.id)

    }

    ref: Roact.Ref<Frame>
    
}