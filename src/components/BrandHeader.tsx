import { Box, Divider, Heading, Text } from "@chakra-ui/react";

type Props = {};

const BrandHeader = (props: Props) => {
  return (
    <Box position="relative" w="100%">
      <Heading
        bgColor="white"
        mx="auto"
        fontSize={18}
        border="solid 1px"
        py="0.5rem"
        px="2rem"
        w="fit-content"
        position="relative"
        fontFamily="Gill Sans MT"
        zIndex={10}
      >
        {"Featured \u0026 Updated from Dictionary"}
      </Heading>
      <Divider
        position="absolute"
        top="50%"
        left="0"
        borderColor="secondary"
        transform="auto"
      />
      <Text
        position="absolute"
        lineHeight="18px"
        fontSize={18}
        top="50%"
        transform="auto"
        translateY="-100%"
        right="0"
        gap="0"
        fontStyle="italic"
      >
        {"Brand コレクション"}
      </Text>
    </Box>
  );
};

export default BrandHeader;
