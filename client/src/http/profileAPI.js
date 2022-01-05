import { $authHost, $host } from "./index";

export const fetchProfiles = async (page, limit) => {
    const {data} = await $host.get('api/profile', {params: {
        page, limit
    }})
    return data
}

export const fetchOneProfile = async (id) => {
    const {data} = await $host.get('api/profile/' + id)
    return data
}