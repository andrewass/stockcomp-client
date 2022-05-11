import axios from "axios";
import {CONTEST_BASE_URL} from "../config/serviceConfig";

const URL = {
    sorted_participants: CONTEST_BASE_URL + "/participant/sorted-participants",
}

const getSortedParticipants = async contestNumber => {
    const response =  await axios({
        method: "get",
        url: URL.sorted_participants,
        params: {contestNumber},
        withCredentials: true
    });
    return response.data;
}

export {
    getSortedParticipants
}