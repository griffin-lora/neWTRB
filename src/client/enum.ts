export interface StamperMode {

    none: number
    placing: number

}

export interface WirerMode {

    none: number
    findSource: number
    findReceiver: number

}

export const stamperMode = {

    none: 0,
    placing: 1

}

export const wirerMode = {

    none: 0,
    findSource: 1,
    findReceiver: 2,

}