import { GetServerSideProps } from "next";
import axios from "axios";

import {
  Flex,
  Button,
  Heading,
  Text,
  Image,
  Container,
  useMediaQuery,
} from "@chakra-ui/react";

import Link from "next/link";

import { TeamList } from "../../components/TeamList";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { name } = query;

  const res = await axios.get(`http://localhost:5000/api/v1/summoner/${name}`);
  const { data } = res;

  if (!data) {
    return { notFound: true };
  }

  return {
    props: { data },
  };
};

export default function Summoner({ data }) {
  console.log(data);
  const { level, profileIcon, name, puuid } = data.summoner;

  const [isLargerThan500] = useMediaQuery("(min-width: 500px)");

  const getMe = (match) => {
    const me = match.participants.filter((par) => par.puuid == puuid);
    return me[0];
  };

  return (
    <Container maxW={isLargerThan500 ? "80%" : "100%"} centerContent>
      <Flex
        alignItems="center"
        mt="10"
        flexDirection={isLargerThan500 ? "row" : "column"}
      >
        <Image
          src={`https://cdn.communitydragon.org/latest/profile-icon/${profileIcon}`}
          alt={`${name}'s profile icon`}
          width={220}
          borderRadius="3xl"
          fallbackSrc="https://cdn.communitydragon.org/latest/champion/generic/square"
        />
        <Flex direction="column" ml={isLargerThan500 ? "10" : null}>
          <Heading>{name}</Heading>
          <Text textAlign="center">Level : {level}</Text>
        </Flex>
      </Flex>

      {data.matches.map((match) => {
        const {
          win,
          championId,
          championName: champName,
          kills,
          deaths,
          assists,
        } = getMe(match);
        const championName = champName.split(/(?=[A-Z])/).join(" ");
        return (
          <Flex
            flex={1}
            backgroundColor={win ? "green.300" : "red.300"}
            w="100%"
            borderRadius="lg"
            mt="10"
            padding="5"
            justifyContent="space-between"
            alignItems="center"
          >
            <Flex direction="column">
              <Image
                src={`https://cdn.communitydragon.org/latest/champion/${championId}/square`}
                alt={`${name}'s profile icon`}
                width={100}
                height={100}
                borderRadius="full"
                fallbackSrc="https://cdn.communitydragon.org/latest/champion/generic/square"
              />

              <Text textAlign="center" mt="2">
                {championName}
              </Text>
            </Flex>

            <Flex direction="column" textAlign="center">
              <Text>{`${kills} / ${deaths} / ${assists}`}</Text>
              <Text>{`${((kills + assists) / deaths).toFixed(2)} KDA`}</Text>
            </Flex>

            <Flex width="300px">
              <TeamList
                participants={match.participants.filter(
                  (par) => par.teamId == 100
                )}
              />
              <TeamList
                participants={match.participants.filter(
                  (par) => par.teamId == 200
                )}
              />
            </Flex>
          </Flex>
        );
      })}

      <Link href="/">
        <Button my="10" colorScheme="teal" size="lg">
          Go back
        </Button>
      </Link>
    </Container>
  );
}
