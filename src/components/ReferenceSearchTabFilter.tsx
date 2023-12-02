import {
	Box,
	Button,
	Divider,
	Flex,
	HStack,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	Text,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { Filter } from "../types";

type Props = {
	items: Filter[];
	filter: string[];
	setFilter: React.Dispatch<React.SetStateAction<string[]>>;
};

const ReferenceSearchTabFilter = ({ items, filter, setFilter }: Props) => {
	const [showLeftBtn, setShowLeftBtn] = useState<boolean>(false);
	const [showRightBtn, setShowRightBtn] = useState<boolean>(true);
	const containerRef = useRef<HTMLDivElement>(null);
	const childRef = useRef<HTMLDivElement>(null);

	const getOffset = () => {
		return childRef.current?.offsetWidth! - containerRef.current?.offsetWidth!;
	};

	const leftHandler = (e: React.MouseEvent) => {
		e.preventDefault();
		containerRef.current?.scrollTo(0, 0);
	};

	const rightHandler = (e: React.MouseEvent) => {
		e.preventDefault();
		const offset = getOffset();
		containerRef.current?.scrollTo(offset, 0);
	};

	const onScrollHandler = () => {
		const offset = getOffset();
		if (
			containerRef.current?.getClientRects()[0].x! -
				childRef.current?.getClientRects()[0].x! ===
				offset &&
			showRightBtn
		) {
			setShowRightBtn(false);
		} else if (
			containerRef.current?.getClientRects()[0].x! -
				childRef.current?.getClientRects()[0].x! !==
				offset &&
			!showRightBtn
		) {
			setShowRightBtn(true);
		}

		if (
			containerRef.current?.getClientRects()[0].x! -
				childRef.current?.getClientRects()[0].x! ===
				0 &&
			showLeftBtn
		) {
			setShowLeftBtn(false);
		} else if (
			containerRef.current?.getClientRects()[0].x! -
				childRef.current?.getClientRects()[0].x! !==
				0 &&
			!showLeftBtn
		) {
			setShowLeftBtn(true);
		}
	};

	return (
		<Tabs display={{ base: "none", md: "block" }}>
			<Box overflow="hidden" bgColor="tint.500" w="100%">
				<Box position="relative" w="100%">
					<HStack
						h="999rem"
						bgColor="tint.500"
						transform="auto"
						translateY="-50%"
						position="absolute"
						top="50%"
						left="0"
						gap="0"
					>
						<Text
							px="1rem"
							borderRight="solid 2px"
							fontWeight={700}
							whiteSpace="nowrap"
						>
							{"Specific Items"}
						</Text>
						{showLeftBtn && (
							<Button
								variant="unstyle"
								rounded="none"
								p="0"
								onClick={leftHandler}
							>
								<FaChevronLeft />
							</Button>
						)}
					</HStack>
					{showRightBtn && (
						<Button
							rounded="none"
							variant="unstyle"
							bgColor="tint.500"
							py="0"
							px="0"
							position="absolute"
							right="0"
							top="0"
							onClick={rightHandler}
						>
							<FaChevronRight />
						</Button>
					)}
					<TabList
						border="none"
						ref={containerRef}
						onScroll={onScrollHandler}
						overflowX="auto"
						overflowY="hidden"
						css={{
							"&::-webkit-scrollbar": {
								display: "none",
							},
						}}
					>
						<Flex ref={childRef} pl="11rem" pr="1rem">
							{items.map((item, i) => (
								<Tab
									key={i}
									textColor="shade.500"
									fontWeight={700}
									whiteSpace="nowrap"
									_selected={{
										textColor: "secondary",
									}}
								>
									{item.type}
								</Tab>
							))}
						</Flex>
					</TabList>
				</Box>
			</Box>

			<TabPanels bgColor="tint.500" position="relative">
				{items.map((item, i) => (
					<TabPanel key={i} display="flex" gap="1rem" flexWrap="wrap">
						<Divider
							h="1px"
							bgColor="shade.500"
							w="97%"
							position="absolute"
							top="0"
							left="50%"
							transform="auto"
							translateX="-50%"
						/>
						{item.options.map((option, i) => {
							const isActive = filter.includes(option);
							return (
								<Button
									key={i}
									boxShadow={
										isActive
											? "1px 1px 0 2px var(--chakra-colors-shade-500) inset"
											: "1px 1px 0 1px var(--chakra-colors-shade-500)"
									}
									bgColor={isActive ? "shade.200" : "primary"}
									_hover={{
										background: isActive ? "shade.300" : "shade.100",
									}}
									_active={{
										boxShadow:
											"1px 1px 1px 1px var(--chakra-colors-shade-500) inset",
										background: isActive ? "shade.400" : "shade.200",
									}}
									rounded="none"
									p="0"
									w="fit-content"
									h="fit-content"
									wordBreak="break-word"
									border="1px"
									whiteSpace="break-spaces"
									fontSize="sm"
									onClick={(e: React.MouseEvent) => {
										e.preventDefault();
										const newFilter = isActive
											? filter.filter((el) => el !== option)
											: [...filter, option];
										setFilter(newFilter);
									}}
								>
									{option}
								</Button>
							);
						})}
					</TabPanel>
				))}
			</TabPanels>
		</Tabs>
	);
};

export default ReferenceSearchTabFilter;
