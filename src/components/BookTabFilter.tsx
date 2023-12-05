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
	filter: string[];
	active: string | undefined;
	setActive: React.Dispatch<React.SetStateAction<string | undefined>>;
	setLimit: React.Dispatch<React.SetStateAction<number>>;
};

const ReferenceSearchTabFilter = ({
	filter,
	active,
	setActive,
	setLimit,
}: Props) => {
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
			<Box overflow="hidden" bgColor="drawer.500" w="100%">
				<Box position="relative" w="100%">
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
					{showRightBtn && (
						<Button
							rounded="none"
							variant="unstyle"
							bgColor="drawer.500"
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
						<Flex ref={childRef} px="1rem">
							{filter.length !== 0 &&
								filter.map((option, i) => (
									<Button
										key={i}
										textColor="secondary"
										fontSize={active === option ? 24 : 16}
										transition="all 0.2s"
										variant="link"
										type="button"
										px="1rem"
										onClick={(e) => {
											e.preventDefault();
											setActive(active === option ? undefined : option);
											setLimit(4);
										}}
									>
										{option}
									</Button>
								))}
						</Flex>
					</TabList>
				</Box>
			</Box>
		</Tabs>
	);
};

export default ReferenceSearchTabFilter;
