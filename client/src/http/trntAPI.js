import { $authHost, $host } from "./index";

export const createTournament = async (tournament) => {
    const {data} = await $authHost.post('api/tournament_list', tournament)
    return data
}

// export const fetchTournaments = async () => {
//     const {data} = await $host.get('api/tournament_list')
//     return data
// }

export const fetchTournaments = async (status, page, limit) => {
    const {data} = await $host.get('api/tournament_list', {params: {
        status, page, limit
    }})
   
    return data
}

export const fetchOneTournament = async (id) => {
    const {data} = await $host.get('api/tournament_list/' + id)
    return data
}

export const updateStatus = async (tournament) => {
    const {data} = await $authHost.post('api/tournament_list/updateStatus', tournament)
    return data
}

export const updateRegisteredUsers = async (_data) => {
    const {data} = await $authHost.post('api/tournament_list/updateRegisteredUsers', _data)
    return data
}