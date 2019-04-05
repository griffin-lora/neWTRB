import { Component } from "../Component"
import { Entity } from "../Entity"
import Render from "./Render"
import Config from "./Config"

const onColor = Color3.fromRGB(0, 255, 255)
const offColor = Color3.fromRGB(0, 0, 255)

export interface PadProps {



}

const truncate = (value: number) => {

    if (value < 0.5) {

        return 0

    } else {

        return 1

    }

}

const zeroOut = (value: number) => {

    if (math.abs(value) < 0.01) {

        return 0

    } else {

        return 1

    }

}

export default class Pad extends Component {

    constructor(entity: Entity, props: PadProps) {

        super(entity, props)

        const render = entity.components.get(Render)
        const config = entity.components.get(Config)
        
        this.render = (render as Render) || undefined
        this.config = (config as Config) || undefined

        if (this.render && this.config) {

            const pad = this.render.model

            const base = pad.Base as BasePart
            const base2 = pad.FakeBase as BasePart

            this.airDir = (pad.UpFacingWedge as BasePart).CFrame.LookVector

            this.dY = base.CFrame.LookVector

            this.truncatedAirDir = new Vector3(zeroOut(this.airDir.X), zeroOut(this.airDir.Y), zeroOut(this.airDir.Z))

        }
        
    }

    update() {
        
        super.update()

        if (this.render && this.config) {

            const pad = this.render.model

            const base = pad.Base as BasePart
            const base2 = pad.FakeBase as BasePart

        }

    }

    destroy() {

        super.destroy()

    }

    updateAirDirection() {

        if (this.render && this.config) {

            const pad = this.render.model

            const base = pad.Base as BasePart
            const base2 = pad.FakeBase as BasePart

            this.airDir = (pad.UpFacingWedge as BasePart).CFrame.LookVector

            this.dX = base.CFrame.LookVector
            this.dY = this.airDir.Cross(this.dY)
            
            this.truncatedAirDir = new Vector3(zeroOut(this.airDir.X), zeroOut(this.airDir.Y), zeroOut(this.airDir.Z))

        }

    }

    render: Render | undefined
    config: Config | undefined
    continueAnimation = false
    airDir = new Vector3()
    truncatedAirDir = new Vector3()
    dX = new Vector3()
    dY = new Vector3()

}