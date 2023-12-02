import { Box, Flex } from '@chakra-ui/react';
import React, { PropsWithChildren } from 'react';

const ThinContainer: React.FC<PropsWithChildren> = ({ children }) => {
	return (
		<Flex w="100%">
			<Box w={{ base: '100%', md: '75%' }} bgColor="tint.500">
				{children}
			</Box>
			<Box w={{ base: '0%', md: '25%' }} />
		</Flex>
	);
};

export default ThinContainer;
