import React from "react";
import { updateRegisteredUsers } from "./http/trntAPI"

const UpdateRegisteredUsers = (tournament_id, user_id) => {
    const formData = new FormData()
    formData.append('trn_id', tournament_id.id)
    formData.append('user_id', user_id.id)
    updateRegisteredUsers(formData)
    return 0
}

export default UpdateRegisteredUsers