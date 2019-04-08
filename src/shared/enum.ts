export interface StamperMode {

    none: number
    placing: number
    cloning: number

}

export interface WirerMode {

    none: number
    findSource: number
    findReceiver: number

}

export interface PlacementType {
    
    name: number
    id: number

}

export const stamperMode = {

    none: 0,
    placing: 1,
    cloning: 2

} as StamperMode

export const wirerMode = {

    none: 0,
    findSource: 1,
    findReceiver: 2,

} as WirerMode

export const placementType = {

    name: 0,
    id: 1
    
} as PlacementType