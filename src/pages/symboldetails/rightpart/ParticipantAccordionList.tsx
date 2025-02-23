import {DetailedParticipant} from "../../../domain/participant/participantTypes";
import ParticipantAccordion from "./ParticipantAccordion";

interface Props {
    participants: DetailedParticipant[]
    symbol: string
}

export default function ParticipantAccordionList({participants, symbol}: Props) {
    return (
        <div>
            {participants.map(participant =>
                <ParticipantAccordion participant={participant} symbol={symbol}/>
            )}
        </div>
    );
}