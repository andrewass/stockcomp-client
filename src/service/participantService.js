import axios from "axios";
import {CONTEST_BASE_URL} from "../config/serviceConfig";

const URL = {
    sorted_participants: CONTEST_BASE_URL + "/participant/sorted-participants",
    get_participant: CONTEST_BASE_URL + "/participant/participant-by-contest"
}

const getParticipant = async contestNumber => {
    const response = await axios({
        method: "get",
        url: URL.get_participant,
        params: {contestNumber}
    });
    return response.data;
}

const getSortedParticipants = async contestNumber => {
    const response = await axios({
        method: "get",
        url: URL.sorted_participants,
        params: {contestNumber}
    });
    return response.data;
}

export {
    getParticipant, getSortedParticipants
}