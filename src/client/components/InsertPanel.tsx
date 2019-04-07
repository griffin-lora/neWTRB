import * as Roact from "rbx-roact"
import { Tool } from "../Tool"
import Stamper from "../tools/Stamper"
import { RunService, UserInputService } from "rbx-services"
import { stamperMode } from "../enum"
import { settings, getEntityDatum } from "../../shared/settings"
import { CategoryButton } from "./CategoryButton"
import { EntityButton } from "./EntityButton";

export interface InsertPanelProps {

    stamper: Stamper

}

export class InsertPanel extends Roact.Component {

    constructor(props: object) {

        super(props)

        this.ref = Roact.createRef()
        this.entitiesFrameRef = Roact.createRef()
        this.pageLabelRef = Roact.createRef()
        this.previousPageButtonRef = Roact.createRef()
        this.nextPageButtonRef = Roact.createRef()
        this.displayNameLabelRef = Roact.createRef()
        this.largeImageLabelRef = Roact.createRef()

    }

    render() {

        const props = this.props as InsertPanelProps

        const categoryButtons = new Array<Roact.Element>()

        settings.categories.forEach((name, index) => {
            
            categoryButtons[index] = <CategoryButton stamper={props.stamper} name={name}></CategoryButton>

        })

        return <frame Ref={this.ref} Key="insertPanel" Active={true} Position={new UDim2(0.2, 2, 0.1, 24)} Size={new UDim2(0.6, -20, 0.64, 0)} Style={Enum.FrameStyle.RobloxRound}>
            <frame Ref={this.entitiesFrameRef} Key="entitiesFrame" Position={new UDim2(0.24, 0, 0.085, 0)} Size={new UDim2(0.54, 0, 0.8, 0)} ClipsDescendants={true} BorderSizePixel={0} BackgroundTransparency={1}>
                <uigridlayout CellPadding={new UDim2(0, 0, 0, 0)} CellSize={new UDim2(0, 64, 0, 64)}/>
            </frame>
            <textbutton Key="cancelButton" Text="" Position={new UDim2(1, -32, 0, -2)} Size={new UDim2(0, 34, 0, 34)} Style={Enum.ButtonStyle.RobloxButtonDefault} TextSize={24} TextColor3={Color3.fromRGB(255, 255, 255)} Font={Enum.Font.ArialBold} Event={{
                MouseButton1Click: () => {
                    
                    props.stamper.inserting = false
        
                }
            }}>
                <imagelabel Key="imageLabel" Image="http://www.roblox.com/asset?id=54135717" Position={new UDim2(0, -2, 0, -2)} Size={new UDim2(0, 16, 0, 16)} BackgroundTransparency={1} BorderSizePixel={0}/>
            </textbutton>
            <textbutton Key="selectSetButton" Text="Select Set" Visible={false} Size={new UDim2(0.2, 0, 0.1, 0)} Style={Enum.ButtonStyle.RobloxButtonDefault} TextSize={14} TextColor3={Color3.fromRGB(255, 255, 255)} Font={Enum.Font.ArialBold}/>
            <frame Key="pagingControls" Position={new UDim2(0.24, 0, 0.9, 0)} Size={new UDim2(0.54, 0, 0.1, 0)} BorderSizePixel={0} BackgroundTransparency={1}>
                <textbutton Ref={this.previousPageButtonRef} Key="previousPageButton" Text="" Position={new UDim2(0.5, -95, 0.5, -20)} Size={new UDim2(0, 60, 0, 40)} Style={Enum.ButtonStyle.RobloxButton} TextSize={24} TextColor3={Color3.fromRGB(255, 255, 255)} Font={Enum.Font.ArialBold} Event={{
                    MouseButton1Click: () => {

                        props.stamper.setPage(props.stamper.page - 1)

                    }
                }}>
                    <imagelabel Key="imageLabel" Image="http://www.roblox.com/asset?id=54138586" Position={new UDim2(0, 8, 0, -1)} Size={new UDim2(0, 18, 0, 18)} BackgroundTransparency={1} BorderSizePixel={0}/>
                </textbutton>
                <textlabel Ref={this.pageLabelRef} Key="pageText" Text="" Position={new UDim2(0.5, -30, 0.5, -20)} Size={new UDim2(0, 60, 0, 40)} BackgroundTransparency={1} BackgroundColor3={Color3.fromRGB(102, 0, 102)} TextColor3={Color3.fromRGB(255, 255, 255)} TextSize={24} Font={Enum.Font.ArialBold}/>
                <textbutton Ref={this.nextPageButtonRef}  Key="nextPageButton" Text="" Position={new UDim2(0.5, 35, 0.5, -20)} Size={new UDim2(0, 60, 0, 40)} Style={Enum.ButtonStyle.RobloxButton} TextSize={24} TextColor3={Color3.fromRGB(255, 255, 255)} Font={Enum.Font.ArialBold} Event={{
                    MouseButton1Click: () => {

                        props.stamper.setPage(props.stamper.page + 1)

                    }
                }}>
                    <imagelabel Key="imageLabel" Image="http://www.roblox.com/asset?id=54138563" Position={new UDim2(0, 10, 0, -1)} Size={new UDim2(0, 18, 0, 18)} BackgroundTransparency={1} BorderSizePixel={0}/>
                </textbutton>
            </frame>
            <frame Key="sets" Position={new UDim2(0, 0, 0, 5)} Size={new UDim2(0.23, 0, 1, -5)} BorderSizePixel={0} BackgroundTransparency={1} BackgroundColor3={Color3.fromRGB(255, 0, 102)}>
                <frame Key="line" Position={new UDim2(1, -3, 0.06, 0)} Size={new UDim2(0, 3, 0.9, 0)} BorderSizePixel={0} BackgroundTransparency={0.7} BackgroundColor3={Color3.fromRGB(255, 255, 255)}/>
                <textlabel Key="setsHeader" Text="Sets" Size={new UDim2(0, 47, 0, 24)} TextYAlignment={Enum.TextYAlignment.Top} BackgroundTransparency={1} TextXAlignment={Enum.TextXAlignment.Left} TextColor3={Color3.fromRGB(255, 255, 255)} TextSize={24} Font={Enum.Font.ArialBold}/>
                <frame Key="setsLists" Position={new UDim2(0, 0, 0.06, 0)} Size={new UDim2(1, -6, 0.94, 0)} BackgroundTransparency={1} BackgroundColor3={Color3.fromRGB(204, 0, 153)}>
                    <uilistlayout SortOrder={Enum.SortOrder.LayoutOrder}/>
                    {categoryButtons}
                </frame>
            </frame>
            <frame Key="itemPreview" Position={new UDim2(0.79, 0, 0.085, 0)} Size={new UDim2(0.21, 0, 0.9, 0)} BackgroundTransparency={1} BackgroundColor3={Color3.fromRGB(102, 0, 51)}>
                <imagelabel Ref={this.largeImageLabelRef} Key="largeImageLabel" ZIndex={3} Position={new UDim2(0.5, -82, 0, 0)} Size={new UDim2(1, 0, 0, 164)} BorderSizePixel={0} BackgroundTransparency={1} BackgroundColor3={Color3.fromRGB(0, 0, 0)}/>
                <frame Key="textPanel" Position={new UDim2(0, 0, 0, 164)} Size={new UDim2(1, 0, 0, 165)} BackgroundTransparency={1} BackgroundColor3={Color3.fromRGB(128, 0, 128)}>
                    <textlabel Ref={this.displayNameLabelRef} Key="displayNameLabel" Text="" Size={new UDim2(1, 0, 0, 48)} BackgroundColor3={Color3.fromRGB(204, 255, 153)} BackgroundTransparency={1} BorderSizePixel={0} TextYAlignment={Enum.TextYAlignment.Top} TextXAlignment={Enum.TextXAlignment.Left} TextSize={24} TextWrapped={true} TextColor3={Color3.fromRGB(242, 243, 243)} Font={Enum.Font.ArialBold}/>
                </frame>
            </frame>
        </frame>

    }

    didMount() {

        const props = this.props as InsertPanelProps

        const insertPanel = this.ref.current as Frame

        const entitiesFrame = this.entitiesFrameRef.current as Frame

        const pageLabel = this.pageLabelRef.current as TextLabel
        const previousPageButton = this.previousPageButtonRef.current as TextButton
        const nextPageButton = this.nextPageButtonRef.current as TextButton

        let category = props.stamper.category

        let page = props.stamper.page

        let open = true

        const handlePage = () => {

            page = props.stamper.page

            if (category.length > 0) {

                const rows = math.floor(entitiesFrame.AbsoluteSize.X / 64)
                const columns = math.floor(entitiesFrame.AbsoluteSize.Y / 64)

                const size = rows * columns
                
                const min = (page * size) - 1

                const max = (page + 1) * size
                
                entitiesFrame.GetChildren().forEach(child => {

                    if (child.IsA("Frame")) {

                        const id = tonumber(child.Name) || 0
                        
                        child.Visible = id > min && id < max

                    }

                })
                
                const pages = math.ceil(category.length / size)

                if (pages > 1) {

                    previousPageButton.Visible = page > 0
                    nextPageButton.Visible = page + 1 < pages

                    pageLabel.Text = `${ page + 1 }/${ pages }`

                } else {

                    previousPageButton.Visible = false
                    nextPageButton.Visible = false

                    pageLabel.Text = ""

                }

            }

        }

        RunService.RenderStepped.Connect(() => {
            
            if (category !== props.stamper.category) {

                category = props.stamper.category

                entitiesFrame.GetChildren().forEach(child => {

                    if (child.IsA("Frame")) {

                        child.Destroy()

                    }

                })

                category.forEach((entityDatum, index) => {
                    
                    const button = <EntityButton id={index} stamper={props.stamper} name={entityDatum.name} displayName={entityDatum.displayName} smallImage={entityDatum.smallImage} largeImage={entityDatum.largeImage} displayNameLabelRef={this.displayNameLabelRef} largeImageLabelRef={this.largeImageLabelRef}></EntityButton>
                    
                    Roact.mount(button, entitiesFrame)

                })

                handlePage()

            }

            if (page !== props.stamper.page) {

                handlePage()

            }

            if (props.stamper.inserting && !open) {

                insertPanel.TweenPosition(new UDim2(0.2, 2, 0.1, 24), Enum.EasingDirection.InOut, Enum.EasingStyle.Sine, 0.35, true)

                open = true
    
            } else if (!props.stamper.inserting && open) {
    
                insertPanel.TweenPosition(new UDim2(0.2, 2, 1, 24), Enum.EasingDirection.InOut, Enum.EasingStyle.Sine, 0.35, true)

                open = false
    
            }

        })

    }

    ref: Roact.Ref<Frame>
    entitiesFrameRef: Roact.Ref<Frame>
    pageLabelRef: Roact.Ref<TextLabel>
    previousPageButtonRef: Roact.Ref<TextButton>
    nextPageButtonRef: Roact.Ref<TextButton>
    displayNameLabelRef: Roact.Ref<TextLabel>
    largeImageLabelRef: Roact.Ref<ImageLabel>
    
}