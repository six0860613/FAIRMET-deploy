import {
	Accordion,
	AccordionButton,
	AccordionItem,
	AccordionPanel,
	Box,
	Button,
	Flex,
	HStack,
	Select,
	Tag,
	Text,
	Divider,
	useMediaQuery,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useRouteLoaderData } from "react-router-dom";
import { Brand, Filter, TagKey } from "../types";
import { getBrands } from "../util/getBrands";
import DictionaryList from "./DictionaryList";
import FindMoreBtn from "./FindMoreBtn";
import Pagination from "./Pagination";
import ReferenceSearchBox from "./ReferenceSearchBox";
import ReferenceSearchBoxMobile from "./ReferenceSearchBoxMobile";
import ReferenceSearchTabFilter from "./ReferenceSearchTabFilter";
import SeekMoreBtn from "./SeekMoreBtn";
import { IoIosClose } from "react-icons/io";

let rows = 3;

export enum PaginationType {
	normal,
	infinite,
}

type Props = {
	type: PaginationType;
	initLimit: number;
};

const upperTags: TagKey[] = [
	"Style, Occasion",
	"Function & Activity",
	"Item & Category",
	"Country & Region",
	"Notable Category & Item",
];
const lowerTags: TagKey[] = ["Field", "Price", "Sort", "Gender"];
const mobileTags: TagKey[] = [
	"Style, Occasion",
	"Function & Activity",
	"Item & Category",
	"Country & Region",
	"Notable Category & Item",
	"Field",
	"Price",
	"Sort",
	"Gender",
	"Specific Item",
];

const ReferenceSearch: React.FC<Props> = ({ type, initLimit }) => {
	const [filter, setFilter] = useState<string[]>([]);
	const [brands, setBrands] = useState<Brand[]>([]);
	const [limit, setLimit] = useState<number>(initLimit);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [total, setTotal] = useState<number>(1);
	const [isLargerThan768] = useMediaQuery("(min-width: 769px)");
	rows = isLargerThan768 ? 3 : 2;

	const data = useRouteLoaderData("filters") as {
		filters: Filter[];
		items: Filter[];
	};

	useEffect(() => {
		getBrands({ ...(filter.length !== 0 && { filter }) }).then((res) =>
			setTotal(res.length)
		);
	}, [filter]);

	useEffect(() => {
		getBrands({
			limit: limit * rows,
			...(type === PaginationType.normal && {
				skip: (currentPage - 1) * limit * rows,
			}),
			...(filter.length !== 0 && { filter }),
		}).then((res) => setBrands(res));
	}, [limit, currentPage, type, filter]);

	return (
		<>
			<HStack justifyContent="end">
				{type === PaginationType.normal && (
					<>
						<Text>{"Limit"}</Text>
						<Select
							w="fit-content"
							h="fit-content"
							border="none"
							defaultValue={initLimit}
							onChange={(e) => {
								setLimit(Number(e.target.value));
								setCurrentPage(1);
							}}
						>
							{Array.from(
								{ length: Math.ceil(total / rows) },
								(_, index) => index + 1
							).map((index, i) => (
								<option key={i} value={index}>
									{index}
								</option>
							))}
						</Select>
					</>
				)}
				<Text fontSize={{ base: 14, md: 16 }}>{"Sort by\uFF1A"}</Text>
				<Select
					fontSize={{ base: 14, md: 16 }}
					w="fit-content"
					h="fit-content"
					fontStyle="italic"
					fontWeight="semibold"
					border="none"
					_focus={{ ring: "none" }}
				>
					<option value="RANDOM">{"RANDOM"}</option>
					<option value="DATE">{"DATE"}</option>
					<option value="CHAR">{"A-Z \uFF08CAPITAL\uFF09"}</option>
					<option value="Default/Featured">{"Default/Featured"}</option>
					<option value="Spotlight/Hightlight">{"Spotlight/Hightlight"}</option>
				</Select>
			</HStack>
			<Accordion allowToggle mb="1rem">
				<AccordionItem bgColor="tint.600">
					<AccordionButton p="0">
						<Box
							as="span"
							flex="1"
							textAlign="right"
							fontWeight="700"
							px="1rem"
							textColor="shade.500"
						>
							{"Filter and Order by"}
						</Box>
					</AccordionButton>

					<AccordionPanel pb={4} bgColor="tint.100">
						<Flex display={{ base: "none", md: "flex" }}>
							{upperTags.map((tag, i) => (
								<ReferenceSearchBox
									key={i}
									data={data.filters}
									tag={tag}
									filter={filter}
									setFilter={setFilter}
								/>
							))}
						</Flex>
						<Divider
							my="2"
							borderColor="secondary"
							display={{ base: "none", md: "block" }}
						/>
						<Flex display={{ base: "none", md: "flex" }}>
							{lowerTags.map((tag, i) => (
								<ReferenceSearchBox
									key={i}
									data={data.filters}
									tag={tag}
									filter={filter}
									setFilter={setFilter}
								/>
							))}
						</Flex>
						<Flex display={{ base: "flex", md: "none" }} flexDirection="column">
							<Accordion allowToggle mb="1rem">
								{mobileTags.map((tag, i) => (
									<ReferenceSearchBoxMobile
										key={i}
										data={data.filters}
										tag={tag}
										filter={filter}
										setFilter={setFilter}
									/>
								))}
							</Accordion>
						</Flex>
					</AccordionPanel>
				</AccordionItem>
			</Accordion>

			<ReferenceSearchTabFilter
				filter={filter}
				items={data.items}
				setFilter={setFilter}
			/>

			<Box h="1rem" />

			{filter.length !== 0 && (
				<HStack mb="1rem" flexWrap="wrap">
					{filter.map((el, i) => (
						<Tag
							bgColor="white"
							rounded="none"
							border="1px"
							key={i}
							textColor="shade.500"
							fontWeight="700"
							fontStyle="italic"
							whiteSpace="nowrap"
							pos="relative"
							role="group"
						>
							{el}&nbsp;
							<Box
								cursor="pointer"
								display="none"
								_groupHover={{
									display: "block",
								}}
								onClick={() => {
									const newFilter = filter.filter((v) => v !== el);
									setFilter(newFilter);
								}}
							>
								<IoIosClose />
							</Box>
						</Tag>
					))}
					<Button
						p="0"
						h="fit-content"
						variant="link"
						fontStyle="italic"
						_hover={{
							border: "none",
							textColor: "shade",
						}}
						onClick={(e: React.MouseEvent) => {
							e.preventDefault();
							setFilter([]);
						}}
					>
						{"Clear All"}
					</Button>
				</HStack>
			)}
			<Box h="1rem" />
			<Flex alignItems="center" direction="column">
				{brands.length !== 0 && (
					<DictionaryList rows={rows} limit={limit} brands={brands} />
				)}
				{type === PaginationType.infinite &&
					(total > brands.length ? (
						<SeekMoreBtn setLimit={setLimit} />
					) : (
						<FindMoreBtn to="/dictionary" />
					))}
				{type === PaginationType.normal && limit * rows < total && (
					<Pagination
						currentPage={currentPage}
						setCurrentPage={setCurrentPage}
						total={Math.ceil(total / (rows * limit))}
					/>
				)}
			</Flex>
		</>
	);
};

export default ReferenceSearch;
