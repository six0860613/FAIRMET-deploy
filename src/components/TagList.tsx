import { Box, Flex, Tag, Text } from "@chakra-ui/react";
import React from "react";

type Props = {
  title: string;
  value: string[];
};

const TagList: React.FC<Props> = ({ title, value }) => {
  return (
    <Box textColor="secondary">
      <Text bgColor="tint.500" px="1rem" py="0.5rem" fontWeight={700}>
        {title}
      </Text>
      <Flex flexWrap="wrap" p="1rem" gap="1rem">
        {value.map((tag, i) => (
          <Tag
            key={i}
            bgColor="primary"
            rounded="none"
            px="1rem"
            py="0.5rem"
            w="fit-content"
            h="fit-content"
            border="1px"
            fontSize="sm"
          >
            {tag}
          </Tag>
        ))}
      </Flex>
    </Box>
  );
};

export default TagList;
