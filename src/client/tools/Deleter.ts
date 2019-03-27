import { Selector } from "./Selector"

export default class Deleter extends Selector {
    
    constructor() {

        super("deleter", "rbxassetid://55212908", "rbxasset://textures/HammerCursor.png", Color3.fromRGB(255, 0, 0))

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

        model.Destroy()

    }

}