import { Component } from "../Component"
import { Entity } from "../Entity"
import { Workspace, RunService } from "rbx-services"
import Render from "./Render"
import { Collision } from "../Collision"
import { localManager } from "../localManager"

const entities = Workspace.entities

export interface TerrainProps {

    map: string

}

export interface TerrainMode {

    top: number
    covered: number

}

export const terrainMode = {

    top: 0,
    covered: 1

}

export interface Side {

    offset: Vector2
    divisor: number
    
}

export const top = {

    offset: new Vector2(0, 0),
    divisor: 4

} as Side

export const uncovered = {

    offset: new Vector2(177, 0),
    divisor: 2

} as Side

export const covered = {

    offset: new Vector2(177, 40),
    divisor: 3

} as Side

export const bottom = {

    offset: new Vector2(177, 0),
    divisor: 2

} as Side

export class Surface {

    constructor(part: BasePart, map: string, normalId: Enum.NormalId, surfaceType: number) {

        this.normalId = normalId
        this.surfaceType = surfaceType

        const surfaceGui = new Instance("SurfaceGui")

        surfaceGui.LightInfluence = 1
        surfaceGui.Face = normalId

        const imageLabel = new Instance("ImageLabel")

        imageLabel.BackgroundTransparency = 1
        imageLabel.Image = map
        imageLabel.Size = new UDim2(1, 0, 1, 0)
        imageLabel.ImageRectSize = new Vector2(40, 40)
        imageLabel.Parent = surfaceGui

        surfaceGui.Parent = part

        this.imageLabel = imageLabel

    }

    normalId: Enum.NormalId
    imageLabel: ImageLabel
    surfaceType: number

}

export interface SurfaceType {

    top: number
    side: number
    bottom: number

}

export const surfaceType = {

    top: 0,
    side: 1,
    bottom: 2

}

export default class Terrain extends Component {

    constructor(entity: Entity, props: TerrainProps) {

        super(entity, props)

        const render = entity.components.get(Render)
        
        this.render = (render as Render) || undefined

        if (this.render) {

            const primaryPart = this.render.model.PrimaryPart as BasePart

            primaryPart.ClearAllChildren()

            const topSurface = new Surface(primaryPart, props.map, Enum.NormalId.Top, surfaceType.top)
            this.surfaces.push(topSurface)
            const frontSurface = new Surface(primaryPart, props.map, Enum.NormalId.Front, surfaceType.side)
            this.surfaces.push(frontSurface)
            const backSurface = new Surface(primaryPart, props.map, Enum.NormalId.Back, surfaceType.side)
            this.surfaces.push(backSurface)
            const rightSurface = new Surface(primaryPart, props.map, Enum.NormalId.Right, surfaceType.side)
            this.surfaces.push(rightSurface)
            const leftSurface = new Surface(primaryPart, props.map, Enum.NormalId.Left, surfaceType.side)
            this.surfaces.push(leftSurface)
            const bottomSurface = new Surface(primaryPart, props.map, Enum.NormalId.Bottom, surfaceType.bottom)
            this.surfaces.push(bottomSurface)

        }
        
    }

    update() {

        if (this.render) {

            const primaryPart = this.render.model.PrimaryPart as BasePart

            const collision = new Collision(primaryPart, new Vector3(0, 1, 0))

            const lastTerrainMode = this.terrainMode

            if (collision.hit && collision.hitPart) {

                const hitPart = collision.hitPart
                
                const entity = localManager.getEntityByInstance(hitPart)
                
                if (entity) {

                    const terrain = entity.components.get(Terrain)
                    
                    if (terrain) {

                        this.terrainMode = terrainMode.covered

                    } else {

                        this.terrainMode = terrainMode.top

                    }

                } else {

                    this.terrainMode = terrainMode.top

                }

            } else {

                this.terrainMode = terrainMode.top

            }

            if (true || this.terrainMode !== lastTerrainMode) {

                this.surfaces.forEach(surface => {
                    
                    if (surface.surfaceType === surfaceType.top) {

                        const position = new Vector2(math.floor((-primaryPart.CFrame.Z / 4) + 0.5), math.floor((primaryPart.CFrame.X / 4) + 0.5))
                        
                        surface.imageLabel.ImageRectOffset = new Vector2((position.X % 4) * 40, (position.Y % 4) * 40)

                    } else if (surface.surfaceType === surfaceType.side) {
                        
                        if (this.terrainMode === terrainMode.top) {

                            const position = new Vector2(math.floor((-primaryPart.CFrame.Z / 4) + 0.5), 0)
                            
                            surface.imageLabel.ImageRectOffset = new Vector2(177 + ((position.X + position.Y) % 2) * 40, 4)

                        } else {

                            const position = new Vector2(math.floor((-primaryPart.CFrame.Z / 4) + 0.5), math.floor((-primaryPart.CFrame.Y / 4) + 0.5))
                            
                            surface.imageLabel.ImageRectOffset = new Vector2(177 + (position.X % 2) * 40, 40 + (position.X % 3) * 40)

                        }

                    } else if (surface.surfaceType === surfaceType.bottom) {

                        const position = new Vector2(math.floor((-primaryPart.CFrame.Z / 4) + 0.5), math.floor((primaryPart.CFrame.X / 4) + 0.5))
                            
                        surface.imageLabel.ImageRectOffset = new Vector2(177 + (position.X % 2) * 40, 177 + (position.Y % 2) * 40)

                    }

                })

            }

        }

        super.update()

    }

    destroy() {

        super.destroy()

    }

    render: Render
    terrainMode = terrainMode.top
    surfaces = new Array<Surface>()

}