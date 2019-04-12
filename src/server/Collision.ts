import { Workspace, Players } from "rbx-services"

export class Collision {

    constructor(part: BasePart, normal: Vector3) {
        
        const position = part.CFrame.Position
        const halfSize = part.Size.div(2)
        const direction = normal.mul(halfSize).mul(1.1)
        
        const ray = new Ray(position, direction)

        const ignoreList = new Array<Instance>()

        ignoreList.push(part.Parent as Model)

        Workspace.GetChildren().forEach(child => {
            
            if (child.IsA("Model") && Players.GetPlayerFromCharacter(child)) {

                ignoreList.push(child)

            }

        })

        const [ hitPart ] = Workspace.FindPartOnRayWithIgnoreList(ray, ignoreList)
        
        this.hit = !!hitPart
        this.hitPart = hitPart

    }

    hit: boolean
    hitPart: BasePart | undefined

}