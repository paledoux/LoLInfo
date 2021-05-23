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
  const { level, profileIcon, name } = data.summoner;

  const [isLargerThan500] = useMediaQuery("(min-width: 500px)");

  return (
    <Container maxW="80%" centerContent>
      <Flex
        alignItems="center"
        mt="10"
        flexDirection={isLargerThan500 ? "row" : "column"}
      >
        <Image
          src={`https://cdn.communitydragon.org/latest/profile-icon/${profileIcon}`}
          alt={`${name}'s profile icon`}
          width={220}
          borderRadius="full"
          fallbackSrc="https://cdn.communitydragon.org/latest/champion/generic/square"
        />
        <Flex direction="column" ml={isLargerThan500 ? "10" : null}>
          <Heading>{name}</Heading>
          <Text textAlign="center">Level : {level}</Text>
        </Flex>
      </Flex>
      <Link href="/">
        <Button colorScheme="teal" size="lg">
          Go back
        </Button>
      </Link>
    </Container>
  );
}
