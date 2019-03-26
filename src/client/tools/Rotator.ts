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

    }

}