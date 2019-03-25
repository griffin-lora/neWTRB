import { EntitySetting, ComponentSetting } from "../shared/settings"
import { RunService, Players, Workspace } from "rbx-services"
import Stamper from "./tools/Stamper"
const player = Players.LocalPlayer as Player
const camera = Workspace.CurrentCamera
const mouse = player.GetMouse() as Mouse
const parent = script.Parent as Instance
const previewMathModule = parent.previewMath as ModuleScript

export interface PreviewMath {

    findConfigAtMouseTarget: (partsArray: Array<BasePart>) => CFrame

}

const previewMath = require(previewMathModule) as PreviewMath

export interface RenderProps {

    model: Model

}

/*
export class Collision {

    constructor(part: BasePart, normal: Vector3) {

        const position = part.CFrame.Position
        const size = part.Size
        const direction = normal.mul(size)
        
        const ray = new Ray(position.sub(direction.div(2)), direction)

        const [ hitPart, hitPosition ] = Workspace.FindPartOnRay(ray, part)
        
        this.hit = !!hitPart
        this.part = hitPart
        this.position = hitPosition
        this.normal = normal

    }

    hit: boolean
    part: BasePart | undefined
    position: Vector3
    normal: Vector3

}
*/

export class Preview {

    constructor(stamper: Stamper, previewSetting: EntitySetting) {
        
        let renderSetting: ComponentSetting | undefined

        previewSetting.components.forEach(componentSetting => {

            if (componentSetting.name === "Render") {

                renderSetting = componentSetting

            }

        })
        
        if (renderSetting) {

            const props = renderSetting.props as RenderProps

            this.model = props.model.Clone()
            this.model.Parent = Workspace
            
            mouse.TargetFilter = this.model
            RunService.RenderStepped.Connect(() => {

                this.setCframe(this.getHitCframe())
                
                if (this.model) {

                    if (stamper.equipped) {

                        this.model.Parent = Workspace

                    } else {

                        this.model.Parent = undefined

                    }

                }

                /*if (this.model) {
                    
                    const primaryPart = this.model.PrimaryPart as BasePart
                    
                    const collisions = this.getCollisions()
                    
                    collisions.forEach(collision => {
                        
                        if (collision.hit) {
                            print(collision.part, collision.normal)
                            //this.setCframe(primaryPart.CFrame.add(collision.normal.mul(-1).mul(2)))

                        }

                    })

                }*/

            })

            mouse.Button1Up.Connect(() => {
                
                if (stamper.equipped) {

                    stamper.place(previewSetting, this.getHitCframe())
                    
                }

            })
            
        }

    }

    setCframe(cframe: CFrame) {

        if (this.model) {

            this.model.SetPrimaryPartCFrame(cframe)

        }

    }

    getCframe() {

        if (this.model) {

            return this.model.GetPrimaryPartCFrame()

        } else {

            return new CFrame()

        }

    }

    destroy() {



    }
/*
    getCollisions() {

        const collisions = new Array<Collision>()

        if (this.model) {

            const primaryPart = this.model.PrimaryPart as BasePart

            collisions.push(new Collision(primaryPart, new Vector3(1, 0, 0)))
            collisions.push(new Collision(primaryPart, new Vector3(-1, 0, 0)))
            collisions.push(new Collision(primaryPart, new Vector3(0, 1, 0)))
            collisions.push(new Collision(primaryPart, new Vector3(0, -1, 0)))
            collisions.push(new Collision(primaryPart, new Vector3(0, 0, 1)))
            collisions.push(new Collision(primaryPart, new Vector3(0, 0, -1)))

        }

        return collisions

    }

    /*getBoundingBox2(part: BasePart) {

        let minVec = new Vector3(math.huge, math.huge, math.huge)
        let maxVec = new Vector3(-math.huge, -math.huge, -math.huge)

        minVec = part.Size.mul(-0.5)
        maxVec = minVec.mul(-1)

        return [ minVec, maxVec ]

    }

    getClosestAlignedWorldDirection(aVector3InWorld: Vector3) {

        const xDir = new Vector3(1,0,0)
        const yDir = new Vector3(0,1,0)
        const zDir = new Vector3(0,0,1)
        const xDot = aVector3InWorld.X * xDir.X + aVector3InWorld.Y * xDir.Y + aVector3InWorld.Z * xDir.Z
        const yDot = aVector3InWorld.X * yDir.X + aVector3InWorld.Y * yDir.Y + aVector3InWorld.Z * yDir.Z
        const zDot = aVector3InWorld.X * zDir.X + aVector3InWorld.Y * zDir.Y + aVector3InWorld.Z * zDir.Z

        if (math.abs(xDot) > math.abs(yDot) && math.abs(xDot) > math.abs(zDot)) {
            if (xDot > 0) {
                return 0
            } else {
                return 3
            }
        } else if (math.abs(yDot) > math.abs(xDot) && math.abs(yDot) > math.abs(zDot)) {
            if (yDot > 0) {
                return 1
            } else {
                return 4
            }
        } else {
            if (zDot > 0) {
                return 2
            } else {
                return 5
            }
        }

    }

    alignToGrid(vector: Vector3, grid: number, offset: Vector3) {

        let gridVector = vector.div(grid)
        gridVector = new Vector3(math.floor(gridVector.X), math.floor(gridVector.Y), math.floor(gridVector.Z))
        gridVector = gridVector.mul(grid)

        return gridVector

    }

    // Gets the nearest face
    getNearestFace(part1: BasePart, part2: BasePart) {

        const faces = new Array<Vector3>()
        const facePositions = new Array<Vector3>()
        const axes = [
            new Vector3(1, 0, 0),
            new Vector3(0, 1, 0),
            new Vector3(0, 0, 1)
        ]
        
        axes.forEach(axis => {

            const size = part2.Size.mul(axis)

            for (let s = -1; s <= 1; s += 2) {

                const face = part2.CFrame.mul(size.div(2).mul(axis).mul(s))
                let inverseAxis = axis
                if (axis.X === 1) {
                    inverseAxis = new Vector3(0, 1, 1)
                } else if (axis.Y === 1) {
                    inverseAxis = new Vector3(1, 0, 1)
                } else {
                    inverseAxis = new Vector3(1, 1, 0)
                }

                const direction = face.mul(axis).sub(part2.CFrame.Position.mul(axis)).Unit
                const facePosition = face.mul(axis).add(part1.CFrame.Position.mul(inverseAxis)).add(part1.Size.div(2).mul(direction))
                faces.push(face)
                facePositions.push(facePosition)

            }

        })

        let nearest = faces[0]
        let nearestPosition = facePositions[0]

        for (let i = 1; i < faces.length; i++) {

            if (faces[i].sub(part1.Position).Magnitude < nearest.sub(part1.Position).Magnitude) {

                nearest = faces[i]
                nearestPosition = facePositions[i]

            }

        }
        
        return nearestPosition

    }


    getHitCframe() {

        if (this.model) {

            /*const grid = 4.0
            let targetConfig = new CFrame()

            const primaryPart = this.model.PrimaryPart as BasePart

            const [ minBB, maxBB ] = this.getBoundingBox2(primaryPart)
            const diagBB = maxBB.sub(minBB)

            const insertCFrame = this.getCframe()
            const targetPart = mouse.Target

            const [ minBBTarget, maxBBTarget ] = this.getBoundingBox2(targetPart)
            const diagBBTarget = maxBBTarget.sub(minBBTarget)
            const targetCFrame = targetPart.CFrame
            const hitCFrame = mouse.Hit
            const mouseHitInWorld = hitCFrame.p

            const mouseHitInTarget = targetCFrame.pointToObjectSpace(mouseHitInWorld)
            const targetVectorInWorld = targetCFrame.vectorToWorldSpace(Vector3.FromNormalId(mouse.TargetSurface))

            let targetRefPointInTarget
            let insertRefPointInInsert
            let clampToSurface
            
            if (this.getClosestAlignedWorldDirection(targetVectorInWorld) === 0) {
                targetRefPointInTarget = targetCFrame.vectorToObjectSpace(new Vector3(1, -1, 1))
                insertRefPointInInsert = insertCFrame.vectorToObjectSpace(new Vector3(-1, -1, 1))
                clampToSurface = new Vector3(0,1,1)
            } else if (this.getClosestAlignedWorldDirection(targetVectorInWorld) === 3) {
                targetRefPointInTarget = targetCFrame.vectorToObjectSpace(new Vector3(-1, -1, -1))
                insertRefPointInInsert = insertCFrame.vectorToObjectSpace(new Vector3(1, -1, -1))
                clampToSurface = new Vector3(0,1,1)
            } else if (this.getClosestAlignedWorldDirection(targetVectorInWorld) === 1) {
                targetRefPointInTarget = targetCFrame.vectorToObjectSpace(new Vector3(-1, 1, 1))
                insertRefPointInInsert = insertCFrame.vectorToObjectSpace(new Vector3(-1, -1, 1))
                clampToSurface = new Vector3(1,0,1)		
            } else if (this.getClosestAlignedWorldDirection(targetVectorInWorld) === 4) {
                targetRefPointInTarget = targetCFrame.vectorToObjectSpace(new Vector3(-1, -1, 1))
                insertRefPointInInsert = insertCFrame.vectorToObjectSpace(new Vector3(-1, 1, 1))
                clampToSurface = new Vector3(1,0,1)
            } else if (this.getClosestAlignedWorldDirection(targetVectorInWorld) === 2) {
                targetRefPointInTarget = targetCFrame.vectorToObjectSpace(new Vector3(-1, -1, 1))
                insertRefPointInInsert = insertCFrame.vectorToObjectSpace(new Vector3(-1, -1, -1))
                clampToSurface = new Vector3(1,1,0)
            } else {
                targetRefPointInTarget = targetCFrame.vectorToObjectSpace(new Vector3(1, -1, -1))
                insertRefPointInInsert = insertCFrame.vectorToObjectSpace(new Vector3(1, -1, 1))
                clampToSurface = new Vector3(1,1,0)
            }

            if (targetRefPointInTarget && insertRefPointInInsert) {

                targetRefPointInTarget = targetRefPointInTarget.mul(diagBBTarget.mul(0.5)).add(maxBBTarget.add(minBBTarget).mul(0.5))
                insertRefPointInInsert = insertRefPointInInsert.mul(diagBB.mul(0.5)).add(maxBB.add(minBB).mul(0.5))

            }
            
            const delta = mouseHitInTarget.sub(targetRefPointInTarget)
            
            let deltaClamped = new Vector3(grid * math.floor(delta.Y/grid), grid * math.floor(delta.Y/grid), grid * math.floor(delta.Z/grid))
            deltaClamped = deltaClamped.mul(clampToSurface)
            const targetTouchInTarget = deltaClamped.add(targetRefPointInTarget)

            const targetTouchRelToWorld = targetCFrame.pointToWorldSpace(targetTouchInTarget)
            const insertTouchInWorld = insertCFrame.vectorToWorldSpace(insertRefPointInInsert)
            const posInsertOriginInWorld = targetTouchRelToWorld.sub(insertTouchInWorld)

            const [ x, y, z, R00, R01, R02, R10, R11, R12, R20, R21, R22 ] = insertCFrame.components()
            targetConfig = new CFrame(posInsertOriginInWorld.X, posInsertOriginInWorld.Y, posInsertOriginInWorld.Z, R00, R01, R02, R10, R11, R12, R20, R21, R22)

            return targetConfig

            //return new CFrame(this.alignToGrid(mouse.Hit.Position, 4, new Vector3()))

            const primaryPart = this.model.PrimaryPart as BasePart

            return previewMath.findConfigAtMouseTarget([primaryPart])
            
        } else {

            return new CFrame()

        }

    }

    */

    getHitCframe() {

        if (this.model) {
            
            const primaryPart = this.model.PrimaryPart as BasePart

            return previewMath.findConfigAtMouseTarget([primaryPart])
            
        } else {

            return new CFrame()

        }
        
    }

    model: Model | undefined
    
}