import { Players } from "rbx-services"

export const player = Players.LocalPlayer as Player
export const playerGui = player.PlayerGui as PlayerGui
export const mouse = player.GetMouse() as Mouse

export const getCharacter = () => {

    return player.Character || player.CharacterAdded.Wait()[0]

}