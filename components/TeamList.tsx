import Participant from "../types/participant";
import { Participants } from "./Participants";
import { Flex } from "@chakra-ui/react";

interface TeamListProps {
  participants: Participant[];
}

export const TeamList = ({ participants }: TeamListProps) => {
  return (
    <Flex width="50%" direction="column" mr="5">
      {participants.map((participant) => (
        <Participants participant={participant} />
      ))}
    </Flex>
  );
};
