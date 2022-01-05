import React from "react";
import { updateStatus } from "./http/trntAPI";

const UpdateStatus = (tournament, newStatus) => {
    const formData = new FormData()
    formData.append('id', tournament.id)
    formData.append('status', newStatus)
    updateStatus(formData)

    console.log('UPD | ID: ' + tournament.id + ', STATUS:  ' + newStatus)
    
    return 0
}

export default UpdateStatus