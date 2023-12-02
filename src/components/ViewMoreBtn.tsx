import { Button, Divider, Text } from "@chakra-ui/react";
import React from "react";

type Props = {
  onClick: (e: React.MouseEvent) => void;
};

const ViewMoreBtn = ({ onClick }: Props) => {
  return (
    <Button
      w="12rem"
      variant="link"
      type="button"
      onClick={onClick}
      position="absolute"
      bottom="0"
      translateY="140%"
      transform="auto"
      fontWeight={400}
      textColor="secondary"
      fontSize={20}
      borderBottom="solid 1px"
      rounded="none"
      _hover={{
        borderBottomColor: "transparent",
      }}
      role="group"
    >
      <Text position="relative">
        {"View More"}
        <Divider
          as="span"
          position="absolute"
          bottom="0"
          transform="auto"
          translateY="0.4rem"
          borderColor="secondary"
          left="0"
          transition="all 0.1s"
          _groupHover={{
            borderColor: "transparent",
          }}
        />
      </Text>
    </Button>
  );
};

export default ViewMoreBtn;
