import { Button, HStack, Text } from "@chakra-ui/react";
import React from "react";
import { FaChevronDown } from "react-icons/fa6";

type Props = {
  setLimit: React.Dispatch<React.SetStateAction<number>>;
};

const SeekMoreBtn = ({ setLimit }: Props) => {
  return (
    <Button
      variant="link"
      opacity={1}
      _hover={{ border: "none", opacity: "50%" }}
      onClick={(e: React.MouseEvent) => {
        e.preventDefault();
        setLimit((prev) => prev + 4);
      }}
    >
      <HStack gap="0" textColor="secondary" fontStyle="italic" fontSize={18}>
        <Text borderBottom="solid 2px" px="0.5rem">
          {"Seek More"}
        </Text>
        <FaChevronDown />
      </HStack>
    </Button>
  );
};

export default SeekMoreBtn;
