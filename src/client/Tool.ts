export class Tool {

    constructor() {

        

    }

    equip() {

        this.onEquipped.forEach(event => {

            event()
            
        })

    }

    unequip() {

        this.onUnequipped.forEach(event => {

            event()
            
        })

    }

    equipped(event: Function) {

        this.onEquipped.push(event)

    }

    unequipped(event: Function) {

        this.onUnequipped.push(event)

    }

    private onEquipped = new Array<Function>()
    private onUnequipped = new Array<Function>()

}