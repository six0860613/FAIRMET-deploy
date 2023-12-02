import { Box, Container, Flex, HStack, Text } from "@chakra-ui/react";
import { RiCopyrightLine } from "react-icons/ri";
import { Outlet } from "react-router-dom";
import MobileFooter from "../components/MobileFooter";
import SideBar from "./SideBar";

const RootLayout = () => {
  return (
    <Box bgColor="primary" textColor="secondary" minH="100vh" pos="relative">
      <Container
        as="main"
        px={{ base: 0, md: "1rem" }}
        mb={{ base: "4rem", md: 0 }}
        maxW={{ base: "48rem", md: "64rem", lg: "90rem" }}
        bgColor="white"
      >
        <Flex w="100%" justifyContent="center" gap={2}>
          <Box w="20%" display={{ base: "none", md: "block" }}>
            <SideBar />
          </Box>
          <Flex
            flexDirection="column"
            px={{ base: "1rem", md: 0 }}
            w={{ base: "100%", md: "80%" }}
          >
            <Box h="2.5rem" />
            <Outlet />
            <HStack alignSelf="center" w="fit-content">
              <Text>{"Copyright"}</Text>
              <RiCopyrightLine />
              <Text>{"2023 Owner. \u00A0All rights reserved"}</Text>
            </HStack>
          </Flex>
        </Flex>
      </Container>
      <MobileFooter />
    </Box>
  );
};

export default RootLayout;
