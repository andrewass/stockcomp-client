import {Contest} from "../../domain/contests/contestTypes";

interface Props{
    contest: Contest
}

const RegisteredContest = ({contest}: Props) => {
    return(
        <p>Contest {contest.contestNumber}</p>
    )
}

export default RegisteredContest;