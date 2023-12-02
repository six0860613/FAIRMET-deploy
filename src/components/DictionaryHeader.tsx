import { HStack, Heading, Text, VStack } from '@chakra-ui/react';
import React from 'react';

type Props = {};

const DictionaryHeader = (props: Props) => {
	return (
		<VStack>
			<Heading fontSize={{ base: '1.5rem', md: '2rem' }}>
				{'DICTIONARY'}
			</Heading>
			<HStack
				fontSize={18}
				gap="0"
				fontStyle="italic"
				fontWeight="bold"
				fontFamily="Gill Sans MT"
				display={{ base: 'none', md: 'flex' }}
			>
				<Text as="span" fontFamily="Fill Sans MT" fontStyle="normal">
					{'\u3010'}
				</Text>
				<Text as="span">{`Search for Fashion`}</Text>
				<Text as="span" fontFamily="Fill Sans MT" fontStyle="normal">
					{'\u3011'}
				</Text>
				<Text as="span">
					{`Seek your air, build your wardrobe \uFF06 find your lifestyle`}
				</Text>
			</HStack>
		</VStack>
	);
};

export default DictionaryHeader;
