import { Box, Divider, Heading, Text, VStack } from '@chakra-ui/react';

type Props = {};

const BookHeader = (props: Props) => {
	return (
		<VStack>
			<Box position="relative" w="100%">
				<Heading
					bgColor="white"
					mx="auto"
					fontSize={{ base: '1.5rem', md: '2rem' }}
					border="solid 1px"
					py="0.5rem"
					px="2rem"
					w="fit-content"
					position="relative"
					zIndex={10}
				>
					{'Book 記事一覧'}
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
				fontSize={{ base: 16, md: 18 }}
				gap="0"
				fontStyle="italic"
				fontWeight="bold"
				fontFamily="Gill Sans MT"
			>
				{'Discover \u0026 Share More with You'}
			</Text>
		</VStack>
	);
};

export default BookHeader;
