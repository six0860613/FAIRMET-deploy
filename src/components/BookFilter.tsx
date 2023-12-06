import { Button, HStack } from "@chakra-ui/react";
import React from "react";
import { BookTag } from "../types";

const bookFilter: BookTag[] = [
	BookTag.ALL,
	BookTag.PICK,
	BookTag.WEAR,
	BookTag.STYLE,
	BookTag.OTHER,
];

type Props = {
	active: BookTag;
	clickHandler: (filter: BookTag) => void;
};

const BookFilter: React.FC<Props> = ({ active, clickHandler }) => {
	return (
		<HStack pt="1rem" display="flex" gap="1rem">
			{bookFilter.map((filter, i) => (
				<Button
					rounded="none"
					textColor={active === filter ? "secondary" : "shade.500"}
					borderBottom={active === filter ? "2px" : "1px"}
					borderBottomStyle="solid"
					borderBottomColor="shade.500"
					borderTop={active === filter ? "2px" : "1px"}
					borderTopStyle="solid"
					borderTopColor="shade.500"
					fontSize={active === filter ? 28 : 20}
					_hover={{
						fontSize: active === filter ? 28 : 24,
					}}
					transition="all 0.2s ease-in-out"
					h="2rem"
					variant="link"
					flex="1"
					key={i}
					type="button"
					fontWeight="400"
					fontStyle="italic"
					onClick={(e) => {
						e.preventDefault();
						clickHandler(filter);
					}}
				>
					{filter}
				</Button>
			))}
		</HStack>
	);
};

export default BookFilter;
