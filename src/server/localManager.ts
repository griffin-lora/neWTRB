import { Area } from "./Area"

class LocalManager {

    constructor() {



    }

    playerConnect() {



    }

    playerDisconnect() {



    }

    place() {



    }

    addArea(area: Area) {

        this.areas.push(area)

    }

    addAreas(areas: Array<Area>) {

        areas.forEach(area => {

            this.addArea(area)

        })

    }

    areas = new Array<Area>()

}

export const localManager = new LocalManager()