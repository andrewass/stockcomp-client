import axios from "axios";
import {CONTEST_BASE_URL} from "../config/properties";


export const URL = {
    participant_history: CONTEST_BASE_URL + "/contest/participant-history",
}

const getParticipantHistory = async (username: string) => {
    const response = await axios({
        method: "get",
        url: URL.participant_history,
        params: {username}
    })
    return response.data
}

export {
    getParticipantHistory
}