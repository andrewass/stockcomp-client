import axios from "axios";
import {CONTEST_BASE_URL} from "../config/serviceConfig";

const URL = {
    participant_sign_up: CONTEST_BASE_URL + "/participant/sign-up-participant",
    sorted_participants: CONTEST_BASE_URL + "/participant/sorted-participants",
    get_participant: CONTEST_BASE_URL + "/participant/participant-by-contest"
}

const signUpParticipant = async (contestNumber: number) => {
    return axios({
        method: "post",
        url: URL.participant_sign_up,
        params: {contestNumber}
    })
}

const getParticipant = async (contestNumber: number) => {
    const response = await axios({
        method: "get",
        url: URL.get_participant,
        params: {contestNumber}
    })
    return response.data
}

const getSortedParticipants = async (contestNumber: number) => {
    const response = await axios({
        method: "get",
        url: URL.sorted_participants,
        params: {contestNumber}
    })
    return response.data
}

export {
    getParticipant, getSortedParticipants, signUpParticipant
}