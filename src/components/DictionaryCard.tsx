import {
	Box,
	Card,
	CardBody,
	Image,
	Text,
	Stack,
	StackDivider,
} from '@chakra-ui/react';
import React from 'react';
import { Brand } from '../types';

type Props = {
	brand: Brand;
	viewDetail: (e: React.MouseEvent) => void;
};

const DictionaryCard: React.FC<Props> = ({ brand, viewDetail }) => {
	return (
		<Card
			id={brand.id}
			as="button"
			cursor="pointer"
			border="none"
			shadow="none"
			rounded="none"
			role="group"
			transition="all 0.3s ease"
			onClick={viewDetail}
		>
			<CardBody p="0" position="relative" overflow="hidden">
				<Box cursor="pointer" overflow="hidden" position="relative" zIndex="5">
					<Box
						_groupHover={{ transform: 'scale(105%)' }}
						transition="all 0.3s ease"
					>
						<Image
							objectFit="cover"
							src={`/image/Brand/${brand.title}/logo.png`}
							alt={brand.title}
						/>
					</Box>
					<Box
						position="absolute"
						transition="all 0.3s ease"
						zIndex="10"
						bgColor="shade.alpha.800"
						bottom="-100%"
						w="100%"
						h="100%"
						p={{ base: '2', md: '4' }}
						_groupHover={{ transform: 'translateY(-100%)' }}
					>
						<Text
							color="primary"
							fontWeight="bold"
							fontStyle="italic"
							fontSize={{ base: '1rem', md: '1.25rem' }}
							w="100%"
							h="100%"
							overflow="hidden"
						>
							{brand.content}
						</Text>
					</Box>
				</Box>
				<Text
					position="relative"
					zIndex="5"
					align="center"
					fontWeight="bold"
					_groupHover={{ bgColor: 'tint.500' }}
				>
					{brand.title}
				</Text>
				<Box
					borderWidth="0px"
					borderColor="gray"
					position="relative"
					height="0"
					transition="all 0.3s ease"
					transform="translateY(-100%)"
					zIndex="1"
					px="4"
					py="0"
					_groupHover={{
						transform: 'translateY(0%)',
						height: 'max-content',
						borderWidth: '1px 0px',
					}}
				>
					<Stack divider={<StackDivider borderColor="shade.900" />} spacing="1">
						{Object.values(brand.tags)?.map((el, i) => {
							return (
								<Box key={i}>
									<Text p="2" fontSize="14" align="left">
										{el.join(', ')}
									</Text>
								</Box>
							);
						})}
					</Stack>
				</Box>
			</CardBody>
		</Card>
	);
};

export default DictionaryCard;
