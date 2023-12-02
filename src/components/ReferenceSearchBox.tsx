import { Button, Flex, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { Filter, TagKey } from "../types";

type Props = {
	data: Filter[];
	tag: TagKey;
	filter: string[];
	setFilter: React.Dispatch<React.SetStateAction<string[]>>;
};

const ReferenceSearchBox = ({ data, tag, filter, setFilter }: Props) => {
	if (tag === "Specific Item") return <></>;
	return (
		<VStack flex="1" maxW="100%" w="100%" h="12rem" overflow="hidden" p="2">
			<Text w="100%" fontWeight="bold">
				{tag}
			</Text>
			<Flex flexDirection="column" w="100%" overflowY="auto" px="2">
				{data
					.find((el) => el.type === tag)!
					.options.map((option: string, i: number) => {
						const isActive = filter.includes(option);
						return (
							<Button
								key={i}
								variant="link"
								rounded="none"
								px="0"
								py="1"
								w="fit-content"
								h="fit-content"
								justifyContent="flex-start"
								wordBreak="break-word"
								whiteSpace="nowrap"
								fontWeight="bold"
								fontStyle="italic"
								fontSize="sm"
								color="shade.500"
								onClick={(e: React.MouseEvent) => {
									e.preventDefault();
									const newFilter = isActive
										? filter.filter((el) => el !== option)
										: [...filter, option];
									setFilter(newFilter);
								}}
								pos="relative"
								_before={{
									content: `""`,
									position: "absolute",
									left: "-3px",
									width: "80%",
									height: "70%",
									bg: "shade.500",
									opacity: `${isActive ? "0.3" : "0"}`,
								}}
							>
								{option}
							</Button>
						);
					})}
			</Flex>
		</VStack>
	);
};

export default ReferenceSearchBox;
