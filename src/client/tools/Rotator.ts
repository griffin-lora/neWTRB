import { Selector } from "./Selector"

export default class Rotator extends Selector {
    
    constructor() {

        super("rotator", "rbxassetid://59103214")

    }

    equip() {

        super.equip()
        
    }

    unequip() {

        super.unequip()

    }

    click(model: Model) {

        super.click(model)

        const entityId = model.entityId.Value
        
        this.fire(entityId)

        const primaryPart = model.PrimaryPart as BasePart

        const [ x, y, z ] = primaryPart.CFrame.toEulerAnglesYXZ()

        if (typeIs(x, "number") && typeIs(y, "number") && typeIs(z, "number")) {

            model.SetPrimaryPartCFrame(new CFrame(primaryPart.CFrame.Position).mul(CFrame.Angles(x, y + math.rad(90), z)))

        }

    }

}