class GlobalManager {

    constructor() {



    }

    isInArea(area: Model, cframe: CFrame) {

        const primaryPart = area.PrimaryPart as BasePart
            
        const firstCorner = new Vector3(primaryPart.CFrame.Position.X + (primaryPart.Size.X / 2), primaryPart.CFrame.Position.Y + (primaryPart.Size.Y / 2), primaryPart.CFrame.Position.Z + (primaryPart.Size.Z / 2))
        const secondCorner = new Vector3(primaryPart.CFrame.Position.X - (primaryPart.Size.X / 2), primaryPart.CFrame.Position.Y - (primaryPart.Size.Y / 2), primaryPart.CFrame.Position.Z - (primaryPart.Size.Z / 2))
        
        return (cframe.X <= firstCorner.X  && cframe.Z <= firstCorner.Z && cframe.X >= secondCorner.X && cframe.Z >= secondCorner.Z)

    }

}

export const globalManager = new GlobalManager()