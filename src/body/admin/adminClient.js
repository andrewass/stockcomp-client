import {CONTEST_BASE_URL} from "../../config/serviceConfig";
import axios from "axios";


const URL = {
    create_contest: CONTEST_BASE_URL + "/contest/create",
    update_contest: CONTEST_BASE_URL + "/contest/update",
    delete_contest: CONTEST_BASE_URL + "/contest/delete",
}

const createContest = async request => {
    await axios({
        method: "post",
        url: URL.create_contest,
        data: request
    });
}

const updateContest = async request => {
    await axios({
        method: "post",
        url: URL.update_contest,
        data: request
    });
}

const deleteContest = async contestNumber => {
    await axios({
        method: "post",
        url: URL.delete_contest,
        params: {contestNumber}
    });
}

export {
    createContest, updateContest, deleteContest
}