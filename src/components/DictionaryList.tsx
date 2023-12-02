import { Flex, VStack, useDisclosure } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Brand } from '../types';
import DictionaryCard from './DictionaryCard';
import DictionaryModal from './DictionaryModal';

type Props = {
	brands: Brand[];
	limit: number;
	rows: number;
};

const DictionaryList = ({ brands, limit, rows }: Props) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [activeBrand, setActiveBrand] = useState<Brand>();

	const detailHandler = (e: React.MouseEvent) => {
		e.preventDefault();
		const brand = brands.find((brand) => brand.id === e.currentTarget.id);
		setActiveBrand(brand);
		onOpen();
	};

	const nextHandler = (e: React.MouseEvent) => {
		e.preventDefault();
		const activeId = brands.findIndex((el) => el.id === activeBrand?.id);
		setActiveBrand(brands[activeId + 1]);
	};

	const previousHandler = (e: React.MouseEvent) => {
		e.preventDefault();
		const activeId = brands.findIndex((el) => el.id === activeBrand?.id);
		setActiveBrand(brands[activeId - 1]);
	};

	return (
		<Flex
			w="100%"
			gap={{ base: '1rem', md: '3rem' }}
			px={{ base: '0rem', md: '3rem' }}
			wrap="wrap"
			pb="3rem"
		>
			{activeBrand && (
				<DictionaryModal
					isOpen={isOpen}
					onClose={onClose}
					brand={activeBrand}
					nextHandler={nextHandler}
					previousHandler={previousHandler}
				/>
			)}
			{[...new Array(rows)].map((_, index) => (
				<VStack flex="1" key={index}>
					{brands.map((brand, i: number) => {
						// eslint-disable-next-line array-callback-return
						if (i % rows !== index || i > limit * rows - 1) return;
						return (
							<DictionaryCard
								key={brand.id}
								brand={brand}
								viewDetail={detailHandler}
							/>
						);
					})}
				</VStack>
			))}
		</Flex>
	);
};

export default DictionaryList;
