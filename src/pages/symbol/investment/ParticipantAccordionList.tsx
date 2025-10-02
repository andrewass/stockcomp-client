import type { DetailedParticipant } from "../../../domain/participant/participantTypes";
import ParticipantAccordion from "./ParticipantAccordion";

interface Props {
	participants: DetailedParticipant[];
	symbol: string;
}

export default function ParticipantAccordionList({
	participants,
	symbol,
}: Props) {
	return (
		<div>
			{participants.map((participant, index) => (
				<ParticipantAccordion
					participant={participant}
					symbol={symbol}
					index={index}
					key={index}
				/>
			))}
		</div>
	);
}
