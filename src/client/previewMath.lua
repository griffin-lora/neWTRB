local Mouse = game.Players.LocalPlayer:GetMouse()

function getBoundingBox2(partOrModel)

-- for models, the bounding box is defined as the minimum and maximum individual part bounding boxes
-- relative to the first part's coordinate frame.

    local minVec = Vector3.new(math.huge, math.huge, math.huge)
    local maxVec = Vector3.new(-math.huge, -math.huge, -math.huge)

    if partOrModel:IsA("Part") or partOrModel:IsA("WedgePart") or partOrModel:IsA("CornerWedgePart") or partOrModel:IsA("TrussPart")then
        minVec = -0.5 * partOrModel.Size
        maxVec = -minVec
    elseif partOrModel:IsA("Terrain") then
        minVec = Vector3.new(-2, -2, -2)
        maxVec = Vector3.new(2, 2, 2)
    else
        local part1 = partOrModel:GetChildren()[1]
        if partOrModel:IsA("Tool") then part1 = partOrModel.Handle if not part1 then return end end
        if part1:IsA("Flag") then part1 = partOrModel:FindFirstChild("Part") if not part1 then return end end
        for i, object in pairs(partOrModel:GetChildren()) do
            if (object:IsA("Part") or object:IsA("WedgePart") or object:IsA("CornerWedgePart") or object:IsA("TrussPart")) then
                local boxMinInWorld = object.CFrame:pointToWorldSpace(-0.5 * object.Size)
                local boxMinInPart1 = part1.CFrame:pointToObjectSpace(boxMinInWorld)
                local boxMaxInWorld = object.CFrame:pointToWorldSpace(0.5 * object.Size)
                local boxMaxInPart1 = part1.CFrame:pointToObjectSpace(boxMaxInWorld)

                local minX = minVec.x
                local minY = minVec.y
                local minZ = minVec.z
                local maxX = maxVec.x
                local maxY = maxVec.y
                local maxZ = maxVec.z
                if boxMinInPart1.x < minVec.x then
                    minX = boxMinInPart1.x
                end
                if boxMinInPart1.y < minVec.y then
                    minY = boxMinInPart1.y
                end
                if boxMinInPart1.z < minVec.z then
                    minZ = boxMinInPart1.z
                end
                if boxMaxInPart1.x < minX then
                    minX = boxMaxInPart1.x
                end
                if boxMaxInPart1.y < minY then
                    minY = boxMaxInPart1.y
                end
                if boxMaxInPart1.z < minZ then
                    minZ = boxMaxInPart1.z
                end

                if boxMinInPart1.x > maxVec.x then
                    maxX = boxMinInPart1.x
                end
                if boxMinInPart1.y > maxVec.y then
                    maxY = boxMinInPart1.y
                end
                if boxMinInPart1.z > maxVec.z then
                    maxZ = boxMinInPart1.z
                end
                if boxMaxInPart1.x > maxX then
                    maxX = boxMaxInPart1.x
                end
                if boxMaxInPart1.y > maxY then
                    maxY = boxMaxInPart1.y
                end
                if boxMaxInPart1.z > maxZ then
                    maxZ = boxMaxInPart1.z
                end

                minVec = Vector3.new(minX, minY, minZ)
                maxVec = Vector3.new(maxX, maxY, maxZ)
            end
        end
    end

    -- Adjust bounding box to reflect what the model or part author wants in  terms of justification
    local justifyValue = partOrModel:FindFirstChild("Justification")
    if justifyValue ~= nil then
        -- find the multiple of 4 that contains the model
        local justify = justifyValue.Value
        local two = Vector3.new(2, 2, 2)
        local actualBox = maxVec - minVec - Vector3.new(0.01, 0.01, 0.01)
        local containingGridBox = Vector3.new(4 * math.ceil(actualBox.x/4), 4 * math.ceil(actualBox.y/4), 4 * math.ceil(actualBox.z/4))
        local adjustment = containingGridBox - actualBox
        minVec = minVec - 0.5 * adjustment * justify
        maxVec = maxVec + 0.5 * adjustment * (two - justify)
    end

    return minVec, maxVec

end


function getTargetPartBoundingBox(targetPart)
    
    if targetPart.Parent:FindFirstChild("entityId") ~= nil then
        return getBoundingBox2(targetPart.Parent)
    else
        return getBoundingBox2(targetPart)
    end

end

function getMouseTargetCFrame(targetPart)

    if targetPart.Parent:FindFirstChild("RobloxModel") ~= nil then
        if targetPart.Parent:IsA("Tool") then return targetPart.Parent.Handle.CFrame
        else return targetPart.Parent:GetChildren()[1].CFrame end
    else
        return targetPart.CFrame
    end

end

function getClosestAlignedWorldDirection(aVector3InWorld)

    local xDir = Vector3.new(1,0,0)
    local yDir = Vector3.new(0,1,0)
    local zDir = Vector3.new(0,0,1)
    local xDot = aVector3InWorld.x * xDir.x + aVector3InWorld.y * xDir.y + aVector3InWorld.z * xDir.z
    local yDot = aVector3InWorld.x * yDir.x + aVector3InWorld.y * yDir.y + aVector3InWorld.z * yDir.z
    local zDot = aVector3InWorld.x * zDir.x + aVector3InWorld.y * zDir.y + aVector3InWorld.z * zDir.z

    if math.abs(xDot) > math.abs(yDot) and math.abs(xDot) > math.abs(zDot) then
        if xDot > 0 then
            return 0
        else
            return 3
        end
    elseif math.abs(yDot) > math.abs(xDot) and math.abs(yDot) > math.abs(zDot) then
        if yDot > 0 then
            return 1
        else
            return 4
        end
    else
        if zDot > 0 then
            return 2
        else
            return 5
        end
    end 

end




function findConfigAtMouseTarget(partsTable)

-- *Critical Assumption* :
--				This function assumes the target CF axes are orthogonal with the target bounding box faces
--				And, it assumes the insert CF axes are orthongonal with the insert bounding box faces
--				Therefore, insertion will not work with angled faces on wedges or other "non-block" parts, nor
--				will it work for parts in a model that are not orthogonally aligned with the model's CF.

    local grid = 4.0
    local admissibleConfig = false
    local targetConfig = CFrame.new(0,0,0)

    local minBB, maxBB = getBoundingBox2(partsTable[1])
    local diagBB = maxBB - minBB

    local insertCFrame
    if partsTable[1]:IsA("Model") or partsTable[1]:IsA("Tool") then
        i = 1
        while (i < (#partsTable[1]:GetChildren()) and not partsTable[1]:GetChildren()[i]:IsA("Part") and not partsTable[1]:GetChildren()[i]:IsA("TrussPart") and not partsTable[1]:GetChildren()[i]:IsA("WedgePart") and not partsTable[1]:GetChildren()[i]:IsA("CornerWedgePart")) do
            i = i + 1
        end
        insertCFrame = partsTable[1]:GetChildren()[i].CFrame
    else
        insertCFrame = partsTable[1].CFrame
    end
    
    if not true and Mouse then
        if partsTable[1]:IsA("Tool") then Mouse.TargetFilter = partsTable[1].Handle
        else Mouse.TargetFilter = partsTable[1] end
    end

    local targetPart = nil
    local success = pcall(function() targetPart = Mouse.Target end)

    if not success or targetPart == nil then
        return admissibleConfig, targetConfig
    end

    if targetPart.Parent and targetPart.Parent:IsA("Model") and targetPart.Parent.Parent == workspace.entities then
        targetPart = targetPart.Parent:GetChildren()[1]
    end

    -- test mouse hit location
    local minBBTarget, maxBBTarget = getTargetPartBoundingBox(targetPart)
    local diagBBTarget = maxBBTarget - minBBTarget
    local targetCFrame = getMouseTargetCFrame(targetPart)
    local hitCFrame = CFrame.new(0,0,0)
    if Mouse then
        hitCFrame = Mouse.Hit
    end
    local mouseHitInWorld = hitCFrame.p

    -- find which axis of the insertion objects should match with the target surface
    -- this should use targetPart CFrame, not the model CFrame

    --[[ attempt at fixing Mouse.TargetSurface below...
    local targetModel = targetPart
    if not targetPart:FindFirstChild("RobloxModel") and targetPart.Parent and targetPart.Parent:FindFirstChild("RobloxModel") then targetModel = targetPart.Parent end
    local correctedTargetSurfaceVector = surfaceToVector(modelTargetSurface(targetModel, game.Workspace.CurrentCamera.CoordinateFrame.p, mouseHitInWorld))
    local targetVectorInWorld = targetPart.CFrame:vectorToWorldSpace(correctedTargetSurfaceVector)
    --]]

    --[[if targetPart:IsA("Terrain") then
        if not cluster then cluster = game.Workspace.Terrain end

        cellID = cluster:WorldToCellPreferSolid(mouseHitInWorld)
        targetCFrame = CFrame.new(cluster:CellCenterToWorld(cellID.x, cellID.y, cellID.z))
    end]]
    
    local mouseHitInTarget = targetCFrame:pointToObjectSpace(mouseHitInWorld)
    local targetVectorInWorld = Vector3.new(0,0,0)
    if Mouse then
        targetVectorInWorld = targetCFrame:vectorToWorldSpace(Vector3.FromNormalId(Mouse.TargetSurface))
    end


    local targetRefPointInTarget
    local insertRefPointInInsert
    local clampToSurface

    if getClosestAlignedWorldDirection(targetVectorInWorld) == 0 then
        targetRefPointInTarget = targetCFrame:vectorToObjectSpace(Vector3.new(1, -1, 1))
        insertRefPointInInsert = insertCFrame:vectorToObjectSpace(Vector3.new(-1, -1, 1))
        clampToSurface = Vector3.new(0,1,1)
    elseif getClosestAlignedWorldDirection(targetVectorInWorld) == 3 then
        targetRefPointInTarget = targetCFrame:vectorToObjectSpace(Vector3.new(-1, -1, -1))
        insertRefPointInInsert = insertCFrame:vectorToObjectSpace(Vector3.new(1, -1, -1))
        clampToSurface = Vector3.new(0,1,1)
    elseif getClosestAlignedWorldDirection(targetVectorInWorld) == 1 then
        targetRefPointInTarget = targetCFrame:vectorToObjectSpace(Vector3.new(-1, 1, 1))
        insertRefPointInInsert = insertCFrame:vectorToObjectSpace(Vector3.new(-1, -1, 1))
        clampToSurface = Vector3.new(1,0,1)		
    elseif getClosestAlignedWorldDirection(targetVectorInWorld) == 4 then
        targetRefPointInTarget = targetCFrame:vectorToObjectSpace(Vector3.new(-1, -1, 1))
        insertRefPointInInsert = insertCFrame:vectorToObjectSpace(Vector3.new(-1, 1, 1))
        clampToSurface = Vector3.new(1,0,1)
    elseif getClosestAlignedWorldDirection(targetVectorInWorld) == 2 then
        targetRefPointInTarget = targetCFrame:vectorToObjectSpace(Vector3.new(-1, -1, 1))
        insertRefPointInInsert = insertCFrame:vectorToObjectSpace(Vector3.new(-1, -1, -1))
        clampToSurface = Vector3.new(1,1,0)
    else
        targetRefPointInTarget = targetCFrame:vectorToObjectSpace(Vector3.new(1, -1, -1))
        insertRefPointInInsert = insertCFrame:vectorToObjectSpace(Vector3.new(1, -1, 1))
        clampToSurface = Vector3.new(1,1,0)
    end

    targetRefPointInTarget = targetRefPointInTarget * (0.5 * diagBBTarget) + 0.5 * (maxBBTarget + minBBTarget)
    insertRefPointInInsert = insertRefPointInInsert * (0.5 * diagBB) + 0.5 * (maxBB + minBB)
    
    -- To Do: For cases that are not aligned to the world grid, account for the minimal rotation
    -- needed to bring the Insert part(s) into alignment with the Target Part
    -- Apply the rotation here

    local delta = mouseHitInTarget - targetRefPointInTarget
    local deltaClamped = Vector3.new(grid * math.modf(delta.x/grid), grid * math.modf(delta.y/grid), grid * math.modf(delta.z/grid))
    deltaClamped = deltaClamped * clampToSurface
    local targetTouchInTarget = deltaClamped + targetRefPointInTarget

    local TargetTouchRelToWorld = targetCFrame:pointToWorldSpace(targetTouchInTarget)
    local InsertTouchInWorld = insertCFrame:vectorToWorldSpace(insertRefPointInInsert)
    local posInsertOriginInWorld = TargetTouchRelToWorld - InsertTouchInWorld

    local x, y, z, R00, R01, R02, R10, R11, R12, R20, R21, R22 = insertCFrame:components()
    targetConfig = CFrame.new(posInsertOriginInWorld.x, posInsertOriginInWorld.y, posInsertOriginInWorld.z, R00, R01, R02, R10, R11, R12, R20, R21, R22)
    admissibleConfig = true

    return targetConfig

end

local _exports = {}
_exports.findConfigAtMouseTarget = findConfigAtMouseTarget
return _exports