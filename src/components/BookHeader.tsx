import { Box, Divider, Heading, Text, VStack } from "@chakra-ui/react";

type Props = {};

const BookHeader = (props: Props) => {
	return (
		<VStack flexDirection={{ base: "column", md: "row" }} pos="relative">
			<Box position="relative" w="100%">
				<Heading
					bgColor="white"
					mx={{ base: "auto", md: "5%", lg: "20%" }}
					fontSize={{ base: "1.5rem", md: "2rem" }}
					border="solid 1px"
					py="0.5rem"
					px="2rem"
					w="fit-content"
					position="relative"
					zIndex={10}
				>
					{"Book 記事一覧"}
				</Heading>
				<Divider
					position="absolute"
					top="50%"
					left="0"
					borderColor="secondary"
					transform="auto"
				/>
			</Box>
			<Text
				pos={{ base: "relative", md: "absolute" }}
				right={{ base: "0", md: "5rem" }}
				fontSize={{ base: 16, md: 18 }}
				bgColor="white"
				zIndex="5"
				px="3"
				gap="0"
				fontStyle="italic"
				fontWeight="bold"
				fontFamily="Gill Sans MT"
			>
				{"Discover \u0026 Share More with You"}
			</Text>
		</VStack>
	);
};

export default BookHeader;
