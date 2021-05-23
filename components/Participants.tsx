import { Text, Flex } from "@chakra-ui/react";
import Image from "next/image";
import Participant from "../types/participant";
import Link from "next/link";

interface ParticipantsProps {
  participant: Participant;
}

export const Participants = ({ participant }: ParticipantsProps) => {
  const { summonerName, championId } = participant;
  return (
    <Link href="/summoner/[name]" as={`/summoner/${summonerName}`}>
      <a>
        <Flex m={1}>
          <Image
            src={`https://cdn.communitydragon.org/latest/champion/${championId}/square`}
            width={20}
            height={15}
          />
          <Text ml="1" noOfLines={1}>
            {summonerName}
          </Text>
        </Flex>
      </a>
    </Link>
  );
};
