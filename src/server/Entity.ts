import { Component } from "./Component"
import { EntityDatum } from "../shared/settings"

export class Entity {

    constructor(entityDatum: EntityDatum) {

        this.entityDatum = entityDatum
    
    }

    components = new Map<typeof Component, Component>()
    entityDatum: EntityDatum

}