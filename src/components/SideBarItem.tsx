import { Box } from "@chakra-ui/react";
import React from "react";
import { Link, useLocation } from "react-router-dom";

type Props = {
  direct: string;
  text: string;
};

const SideBarItem: React.FC<Props> = ({ direct, text }) => {
  const location = useLocation();
  const { hash, pathname } = location;
  return (
    <Box
      textAlign="left"
      w="100%"
      _hover={{ textDecoration: "underline" }}
      fontWeight={direct === pathname + hash ? "500" : "400"}
      pos="relative"
    >
      {direct === pathname + hash && (
        <Box
          w="2"
          h="2"
          bgColor="black"
          rounded="50%"
          pos="absolute"
          left="-1rem"
          top="50%"
          transform="translateY(-50%)"
        />
      )}

      <Link to={direct}>{text}</Link>
    </Box>
  );
};

export default SideBarItem;
