import { ReplicatedStorage } from "rbx-services"

export interface ComponentProps {

    [key: string]: unknown

}

export interface ComponentSetting {

    name: string
    props: ComponentProps

}

export interface EntitySetting {

    name: string
    displayName: string
    smallImage: string
    largeImage: string
    category: string
    components: Array<ComponentSetting>

}

export interface ToolSetting {

    name: string

}

export interface Settings {

    restricted: boolean
    dataStoreKey: string
    entities: Array<EntitySetting>
    tools: Array<ToolSetting>

}

export const settings = {

    restricted: true,
    dataStoreKey: "NEWTRB",

    entities: [

        {name:"56450668",displayName:"Block - Brick",smallImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=75&ht=75&aid=56450668",largeImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=420&ht=420&aid=56450668",category:"Basic Building",components:[{name:"Render",props:{cframe:new CFrame(),size:new Vector3,model:game.ReplicatedStorage.assets.entities["56450668"]}}]},{name:"41324966",displayName:"Block - Sand",smallImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=75&ht=75&aid=41324966",largeImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=420&ht=420&aid=41324966",category:"Basic Building",components:[{name:"Render",props:{cframe:new CFrame(),size:new Vector3,model:game.ReplicatedStorage.assets.entities["41324966"]}}]},{name:"41324945",displayName:"Block - Slate",smallImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=75&ht=75&aid=41324945",largeImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=420&ht=420&aid=41324945",category:"Basic Building",components:[{name:"Render",props:{cframe:new CFrame(),size:new Vector3,model:game.ReplicatedStorage.assets.entities["41324945"]}}]},{name:"41324946",displayName:"Block - Granite",smallImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=75&ht=75&aid=41324946",largeImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=420&ht=420&aid=41324946",category:"Basic Building",components:[{name:"Render",props:{cframe:new CFrame(),size:new Vector3,model:game.ReplicatedStorage.assets.entities["41324946"]}}]},{name:"41324957",displayName:"Block - Maple",smallImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=75&ht=75&aid=41324957",largeImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=420&ht=420&aid=41324957",category:"Basic Building",components:[{name:"Render",props:{cframe:new CFrame(),size:new Vector3,model:game.ReplicatedStorage.assets.entities["41324957"]}}]},{name:"41324954",displayName:"Block - Mahogany",smallImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=75&ht=75&aid=41324954",largeImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=420&ht=420&aid=41324954",category:"Basic Building",components:[{name:"Render",props:{cframe:new CFrame(),size:new Vector3,model:game.ReplicatedStorage.assets.entities["41324954"]}}]},{name:"56451599",displayName:"Ice - Corner",smallImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=75&ht=75&aid=56451599",largeImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=420&ht=420&aid=56451599",category:"Basic Building",components:[{name:"Render",props:{cframe:new CFrame(),size:new Vector3,model:game.ReplicatedStorage.assets.entities["56451599"]}}]},{name:"56451638",displayName:"Ice - Long Wedge",smallImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=75&ht=75&aid=56451638",largeImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=420&ht=420&aid=56451638",category:"Basic Building",components:[{name:"Render",props:{cframe:new CFrame(),size:new Vector3,model:game.ReplicatedStorage.assets.entities["56451638"]}}]},{name:"56451658",displayName:"Ice - Wedge",smallImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=75&ht=75&aid=56451658",largeImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=420&ht=420&aid=56451658",category:"Basic Building",components:[{name:"Render",props:{cframe:new CFrame(),size:new Vector3,model:game.ReplicatedStorage.assets.entities["56451658"]}}]},{name:"56451715",displayName:"Ice - Block",smallImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=75&ht=75&aid=56451715",largeImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=420&ht=420&aid=56451715",category:"Basic Building",components:[{name:"Render",props:{cframe:new CFrame(),size:new Vector3,model:game.ReplicatedStorage.assets.entities["56451715"]}}]},{name:"56451745",displayName:"Mud - Corner",smallImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=75&ht=75&aid=56451745",largeImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=420&ht=420&aid=56451745",category:"Basic Building",components:[{name:"Render",props:{cframe:new CFrame(),size:new Vector3,model:game.ReplicatedStorage.assets.entities["56451745"]}}]},{name:"56451777",displayName:"Mud - Long Wedge",smallImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=75&ht=75&aid=56451777",largeImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=420&ht=420&aid=56451777",category:"Basic Building",components:[{name:"Render",props:{cframe:new CFrame(),size:new Vector3,model:game.ReplicatedStorage.assets.entities["56451777"]}}]},{name:"56451808",displayName:"Mud - Wedge",smallImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=75&ht=75&aid=56451808",largeImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=420&ht=420&aid=56451808",category:"Basic Building",components:[{name:"Render",props:{cframe:new CFrame(),size:new Vector3,model:game.ReplicatedStorage.assets.entities["56451808"]}}]},{name:"56451835",displayName:"Mud - Block",smallImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=75&ht=75&aid=56451835",largeImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=420&ht=420&aid=56451835",category:"Basic Building",components:[{name:"Render",props:{cframe:new CFrame(),size:new Vector3,model:game.ReplicatedStorage.assets.entities["56451835"]}}]},{name:"56451873",displayName:"Stone - Corner",smallImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=75&ht=75&aid=56451873",largeImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=420&ht=420&aid=56451873",category:"Basic Building",components:[{name:"Render",props:{cframe:new CFrame(),size:new Vector3,model:game.ReplicatedStorage.assets.entities["56451873"]}}]},{name:"56451909",displayName:"Stone - Long Wedge",smallImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=75&ht=75&aid=56451909",largeImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=420&ht=420&aid=56451909",category:"Basic Building",components:[{name:"Render",props:{cframe:new CFrame(),size:new Vector3,model:game.ReplicatedStorage.assets.entities["56451909"]}}]},{name:"56451936",displayName:"Stone - Wedge",smallImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=75&ht=75&aid=56451936",largeImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=420&ht=420&aid=56451936",category:"Basic Building",components:[{name:"Render",props:{cframe:new CFrame(),size:new Vector3,model:game.ReplicatedStorage.assets.entities["56451936"]}}]},{name:"56451953",displayName:"Stone - Block",smallImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=75&ht=75&aid=56451953",largeImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=420&ht=420&aid=56451953",category:"Basic Building",components:[{name:"Render",props:{cframe:new CFrame(),size:new Vector3,model:game.ReplicatedStorage.assets.entities["56451953"]}}]},{name:"56451992",displayName:"Grass - Corner",smallImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=75&ht=75&aid=56451992",largeImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=420&ht=420&aid=56451992",category:"Basic Building",components:[{name:"Render",props:{cframe:new CFrame(),size:new Vector3,model:game.ReplicatedStorage.assets.entities["56451992"]}}]},{name:"56452031",displayName:"Grass - Long Wedge",smallImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=75&ht=75&aid=56452031",largeImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=420&ht=420&aid=56452031",category:"Basic Building",components:[{name:"Render",props:{cframe:new CFrame(),size:new Vector3,model:game.ReplicatedStorage.assets.entities["56452031"]}}]},{name:"56452072",displayName:"Grass - Wedge",smallImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=75&ht=75&aid=56452072",largeImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=420&ht=420&aid=56452072",category:"Basic Building",components:[{name:"Render",props:{cframe:new CFrame(),size:new Vector3,model:game.ReplicatedStorage.assets.entities["56452072"]}}]},{name:"56452103",displayName:"Grass - Block",smallImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=75&ht=75&aid=56452103",largeImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=420&ht=420&aid=56452103",category:"Basic Building",components:[{name:"Render",props:{cframe:new CFrame(),size:new Vector3,model:game.ReplicatedStorage.assets.entities["56452103"]}}]},{name:"56452119",displayName:"Wood - Corner",smallImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=75&ht=75&aid=56452119",largeImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=420&ht=420&aid=56452119",category:"Basic Building",components:[{name:"Render",props:{cframe:new CFrame(),size:new Vector3,model:game.ReplicatedStorage.assets.entities["56452119"]}}]},{name:"56452145",displayName:"Wood - Long Wedge",smallImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=75&ht=75&aid=56452145",largeImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=420&ht=420&aid=56452145",category:"Basic Building",components:[{name:"Render",props:{cframe:new CFrame(),size:new Vector3,model:game.ReplicatedStorage.assets.entities["56452145"]}}]},{name:"56452182",displayName:"Wood - Wedge",smallImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=75&ht=75&aid=56452182",largeImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=420&ht=420&aid=56452182",category:"Basic Building",components:[{name:"Render",props:{cframe:new CFrame(),size:new Vector3,model:game.ReplicatedStorage.assets.entities["56452182"]}}]},{name:"56452191",displayName:"Wood - Block",smallImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=75&ht=75&aid=56452191",largeImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=420&ht=420&aid=56452191",category:"Basic Building",components:[{name:"Render",props:{cframe:new CFrame(),size:new Vector3,model:game.ReplicatedStorage.assets.entities["56452191"]}}]},{name:"56452267",displayName:"Corner Block - Pink",smallImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=75&ht=75&aid=56452267",largeImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=420&ht=420&aid=56452267",category:"Basic Building",components:[{name:"Render",props:{cframe:new CFrame(),size:new Vector3,model:game.ReplicatedStorage.assets.entities["56452267"]}}]},{name:"56452293",displayName:"Block - Pink",smallImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=75&ht=75&aid=56452293",largeImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=420&ht=420&aid=56452293",category:"Basic Building",components:[{name:"Render",props:{cframe:new CFrame(),size:new Vector3,model:game.ReplicatedStorage.assets.entities["56452293"]}}]},{name:"56452312",displayName:"Corner Block - Magenta",smallImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=75&ht=75&aid=56452312",largeImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=420&ht=420&aid=56452312",category:"Basic Building",components:[{name:"Render",props:{cframe:new CFrame(),size:new Vector3,model:game.ReplicatedStorage.assets.entities["56452312"]}}]},{name:"56452342",displayName:"Block - Magenta",smallImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=75&ht=75&aid=56452342",largeImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=420&ht=420&aid=56452342",category:"Basic Building",components:[{name:"Render",props:{cframe:new CFrame(),size:new Vector3,model:game.ReplicatedStorage.assets.entities["56452342"]}}]},{name:"56452381",displayName:"Corner Block - Purple",smallImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=75&ht=75&aid=56452381",largeImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=420&ht=420&aid=56452381",category:"Basic Building",components:[{name:"Render",props:{cframe:new CFrame(),size:new Vector3,model:game.ReplicatedStorage.assets.entities["56452381"]}}]},{name:"56452411",displayName:"Block - Purple",smallImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=75&ht=75&aid=56452411",largeImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=420&ht=420&aid=56452411",category:"Basic Building",components:[{name:"Render",props:{cframe:new CFrame(),size:new Vector3,model:game.ReplicatedStorage.assets.entities["56452411"]}}]},{name:"56452438",displayName:"Corner Block - Cyan",smallImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=75&ht=75&aid=56452438",largeImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=420&ht=420&aid=56452438",category:"Basic Building",components:[{name:"Render",props:{cframe:new CFrame(),size:new Vector3,model:game.ReplicatedStorage.assets.entities["56452438"]}}]},{name:"56452470",displayName:"Block - Cyan",smallImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=75&ht=75&aid=56452470",largeImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=420&ht=420&aid=56452470",category:"Basic Building",components:[{name:"Render",props:{cframe:new CFrame(),size:new Vector3,model:game.ReplicatedStorage.assets.entities["56452470"]}}]},{name:"56452507",displayName:"Corner Block - Blue",smallImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=75&ht=75&aid=56452507",largeImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=420&ht=420&aid=56452507",category:"Basic Building",components:[{name:"Render",props:{cframe:new CFrame(),size:new Vector3,model:game.ReplicatedStorage.assets.entities["56452507"]}}]},{name:"56452539",displayName:"Block - Blue",smallImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=75&ht=75&aid=56452539",largeImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=420&ht=420&aid=56452539",category:"Basic Building",components:[{name:"Render",props:{cframe:new CFrame(),size:new Vector3,model:game.ReplicatedStorage.assets.entities["56452539"]}}]},{name:"56452573",displayName:"Corner Block - Dark Green",smallImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=75&ht=75&aid=56452573",largeImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=420&ht=420&aid=56452573",category:"Basic Building",components:[{name:"Render",props:{cframe:new CFrame(),size:new Vector3,model:game.ReplicatedStorage.assets.entities["56452573"]}}]},{name:"56452610",displayName:"Block - Dark Green",smallImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=75&ht=75&aid=56452610",largeImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=420&ht=420&aid=56452610",category:"Basic Building",components:[{name:"Render",props:{cframe:new CFrame(),size:new Vector3,model:game.ReplicatedStorage.assets.entities["56452610"]}}]},{name:"56452628",displayName:"Corner Block - Green",smallImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=75&ht=75&aid=56452628",largeImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=420&ht=420&aid=56452628",category:"Basic Building",components:[{name:"Render",props:{cframe:new CFrame(),size:new Vector3,model:game.ReplicatedStorage.assets.entities["56452628"]}}]},{name:"56452651",displayName:"Block - Green",smallImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=75&ht=75&aid=56452651",largeImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=420&ht=420&aid=56452651",category:"Basic Building",components:[{name:"Render",props:{cframe:new CFrame(),size:new Vector3,model:game.ReplicatedStorage.assets.entities["56452651"]}}]},{name:"56452687",displayName:"Corner Block - Yellow",smallImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=75&ht=75&aid=56452687",largeImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=420&ht=420&aid=56452687",category:"Basic Building",components:[{name:"Render",props:{cframe:new CFrame(),size:new Vector3,model:game.ReplicatedStorage.assets.entities["56452687"]}}]},{name:"56452718",displayName:"Block - Yellow",smallImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=75&ht=75&aid=56452718",largeImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=420&ht=420&aid=56452718",category:"Basic Building",components:[{name:"Render",props:{cframe:new CFrame(),size:new Vector3,model:game.ReplicatedStorage.assets.entities["56452718"]}}]},{name:"56452752",displayName:"Corner Block - Orange",smallImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=75&ht=75&aid=56452752",largeImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=420&ht=420&aid=56452752",category:"Basic Building",components:[{name:"Render",props:{cframe:new CFrame(),size:new Vector3,model:game.ReplicatedStorage.assets.entities["56452752"]}}]},{name:"56452768",displayName:"Block - Orange",smallImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=75&ht=75&aid=56452768",largeImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=420&ht=420&aid=56452768",category:"Basic Building",components:[{name:"Render",props:{cframe:new CFrame(),size:new Vector3,model:game.ReplicatedStorage.assets.entities["56452768"]}}]},{name:"56452798",displayName:"Corner Block - Red",smallImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=75&ht=75&aid=56452798",largeImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=420&ht=420&aid=56452798",category:"Basic Building",components:[{name:"Render",props:{cframe:new CFrame(),size:new Vector3,model:game.ReplicatedStorage.assets.entities["56452798"]}}]},{name:"56452821",displayName:"Block - Red",smallImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=75&ht=75&aid=56452821",largeImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=420&ht=420&aid=56452821",category:"Basic Building",components:[{name:"Render",props:{cframe:new CFrame(),size:new Vector3,model:game.ReplicatedStorage.assets.entities["56452821"]}}]},{name:"56452849",displayName:"Corner Block - White",smallImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=75&ht=75&aid=56452849",largeImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=420&ht=420&aid=56452849",category:"Basic Building",components:[{name:"Render",props:{cframe:new CFrame(),size:new Vector3,model:game.ReplicatedStorage.assets.entities["56452849"]}}]},{name:"56452868",displayName:"Block - White",smallImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=75&ht=75&aid=56452868",largeImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=420&ht=420&aid=56452868",category:"Basic Building",components:[{name:"Render",props:{cframe:new CFrame(),size:new Vector3,model:game.ReplicatedStorage.assets.entities["56452868"]}}]},{name:"56452995",displayName:"Corner Block - Gray",smallImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=75&ht=75&aid=56452995",largeImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=420&ht=420&aid=56452995",category:"Basic Building",components:[{name:"Render",props:{cframe:new CFrame(),size:new Vector3,model:game.ReplicatedStorage.assets.entities["56452995"]}}]},{name:"56453012",displayName:"Block - Gray",smallImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=75&ht=75&aid=56453012",largeImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=420&ht=420&aid=56453012",category:"Basic Building",components:[{name:"Render",props:{cframe:new CFrame(),size:new Vector3,model:game.ReplicatedStorage.assets.entities["56453012"]}}]},{name:"56453030",displayName:"Corner Block - Black",smallImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=75&ht=75&aid=56453030",largeImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=420&ht=420&aid=56453030",category:"Basic Building",components:[{name:"Render",props:{cframe:new CFrame(),size:new Vector3,model:game.ReplicatedStorage.assets.entities["56453030"]}}]},{name:"56453053",displayName:"Block - Black",smallImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=75&ht=75&aid=56453053",largeImage:"https://www.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=420&ht=420&aid=56453053",category:"Basic Building",components:[{name:"Render",props:{cframe:new CFrame(),size:new Vector3,model:game.ReplicatedStorage.assets.entities["56453053"]}}]}


    ],

    tools: [

        { name: "Stamper" },
        { name: "Deleter" },
        { name: "Rotator" }

    ]

} as Settings

export const getEntitySetting = (name: string) => {

    let actualEntitySetting: EntitySetting | undefined
    
    settings.entities.forEach(entitySetting => {
        
        if (entitySetting.name === name) {
            
            actualEntitySetting = entitySetting

        }
        
    })

    if (actualEntitySetting) {

        return actualEntitySetting

    } else {

        throw `Invalid setting name. Name is ${ name }`

    }

}