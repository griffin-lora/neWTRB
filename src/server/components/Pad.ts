import { Component } from "../Component"
import { Entity } from "../Entity"
import Render from "./Render"
import Config, { ConfigProps } from "./Config"
import Receiver from "./Receiver"
import { Workspace, Players, RunService } from "rbx-services";

const onColor = Color3.fromRGB(0, 255, 255)
const offColor = Color3.fromRGB(0, 0, 255)

export interface PadProps {



}

export interface PadValues {

    Height: number
    Speed: number

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
        const receiver = entity.components.get(Receiver)
        
        this.render = (render as Render) || undefined
        this.config = (config as Config) || undefined
        this.receiver = (receiver as Receiver) || undefined

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

        if (this.receiver) {

            this.continueAnimation = this.receiver.active

        }

        if (this.render && this.config) {

            const props = this.config.props as ConfigProps

            const configValues = props.configValues as PadValues

            const pad = this.render.model

            const base = pad.Base as BasePart
            const base2 = pad.FakeBase as BasePart
                
            const fire = base.Fire as Fire
            const smoke = base.Smoke as Smoke

            const baseSize = base.Size.X / 6

            const steps = [new Vector2(-1, -1), new Vector2(-1, 1), new Vector2(1, -1), new Vector2(1, 1)]

            steps.forEach(step => {

                const ray = new Ray(base.CFrame.Position.add(this.dX.mul(step.X).mul(baseSize)).add(this.dY.mul(step.Y).mul(baseSize)), this.airDir.mul(configValues.Height))

                let [ hitPart ] = Workspace.FindPartOnRay(ray, pad)

                if (hitPart && hitPart.Anchored) {

                    hitPart = undefined

                }

                if (hitPart && hitPart.Parent && hitPart.Parent.IsA("Model") && Players.GetPlayerFromCharacter(hitPart.Parent)) {

                    hitPart = hitPart.Parent.HumanoidRootPart as BasePart

                }

                if (hitPart) {
                    
                    this.continueAnimation = true

                    do {

                        RunService.Stepped.Wait()

                    } while (this.debounce)

                    this.debounce = true

                    let newBV = hitPart.FindFirstChild("FloatPadVelocity") as BodyVelocity

                    if (newBV) {

                        if (math.abs(newBV.Velocity.Dot(this.airDir)) > configValues.Speed) {

                            this.debounce = false

                        } else {

                            newBV.Velocity = this.airDir.mul(configValues.Speed).add(newBV.Velocity).sub(this.airDir.mul(newBV.Velocity.Dot(this.airDir)))
                            newBV.MaxForce = this.truncatedAirDir.mul(new Vector3(newBV.P, newBV.P, newBV.P))

                        }

                    } else {

                        newBV = new Instance("BodyVelocity")
                        newBV.Name = "FloatPadVelocity"
                        newBV.P = 100000
                        newBV.Velocity = this.airDir.mul(configValues.Speed)
                        newBV.MaxForce = this.truncatedAirDir.mul(new Vector3(newBV.P, newBV.P, newBV.P))

                        newBV.Parent = hitPart

                        delay(0.5, () => {

                            newBV.Destroy()

                            if (this.receiver && !this.receiver.active) {

                                this.continueAnimation = false
                                
                            }

                        })

                    }

                }

                this.debounce = false

            })
            
            if (this.continueAnimation) {

                base.Color = onColor
                fire.Enabled = true
                smoke.Enabled = true

            } else {

                base.Color = offColor
                fire.Enabled = false
                smoke.Enabled = false

            }

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
    receiver: Receiver | undefined
    continueAnimation = false
    airDir = new Vector3()
    truncatedAirDir = new Vector3()
    dX = new Vector3()
    dY = new Vector3()
    debounce = false

}