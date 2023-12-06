import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
	Flex,
	HStack,
	IconButton,
	Image,
	Spacer,
	Text,
	VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaInstagram, FaPinterest } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SideBarItem from "../components/SideBarItem";
import { BookTag } from "../types";

const SideBar = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [clickIndex, setClickIndex] = useState<number>(0);

	useEffect(() => {
		const { hash, pathname } = location;
		const url = pathname + hash;
		if (url.includes("/dictionary")) setClickIndex(1);
		if (url.includes("/book")) setClickIndex(2);
		if (url === "/") setClickIndex(0);
	}, [location]);

	return (
		<Flex
			as="nav"
			direction="column"
			position="sticky"
			top="0"
			left="0"
			gap="1rem"
			minH={{ base: "max-content", md: "100vh" }}
			h={{ base: "100%", md: "100vh" }}
		>
			<Link to="/" reloadDocument>
				<Image
					src="/image/logo_italic.svg"
					alt="logo"
					h="5rem"
					py="1rem"
					px={2}
				/>
			</Link>
			<Accordion
				defaultIndex={[0]}
				index={clickIndex}
				onChange={(e) => setClickIndex(e as number)}
			>
				<AccordionItem border="none" mb="1rem">
					<AccordionButton
						px={2}
						_hover={{ bgColor: "tint.500" }}
						_expanded={{ fontWeight: "bold" }}
					>
						<Box as="span" flex="1" textAlign="left" fontSize="1.5rem">
							HOME
						</Box>
						<AccordionIcon />
					</AccordionButton>

					<AccordionPanel pb={4} pl={6}>
						<VStack alignItems="start">
							<SideBarItem direct="/#hero" text={"Highlight \uFF06 Updated"} />
							<SideBarItem
								direct="/#reference-search"
								text={"Reference Search"}
							/>
							<SideBarItem direct="/#book" text={"Book"} />
						</VStack>
					</AccordionPanel>
				</AccordionItem>

				<AccordionItem border="none" mb="1rem">
					<AccordionButton
						px={2}
						_hover={{ bgColor: "tint.500" }}
						_expanded={{ fontWeight: "bold" }}
						onClick={() => navigate("/dictionary", { replace: true })}
					>
						<Box textAlign="left" w="100%" fontSize="1.5rem">
							{"DICTIONARY"}
						</Box>
					</AccordionButton>
				</AccordionItem>

				<AccordionItem border="none" mb="1rem">
					<AccordionButton
						px={2}
						_hover={{ bgColor: "tint.500" }}
						_expanded={{ fontWeight: "bold" }}
					>
						<Box as="span" flex="1" textAlign="left" fontSize="1.5rem">
							{"BOOK"}
						</Box>
						<AccordionIcon />
					</AccordionButton>
					<AccordionPanel pb={4} pl={6}>
						<VStack alignItems="start">
							<SideBarItem
								direct={`/book#${BookTag.ALL}`}
								text={"All \u3010CATEGORY\u3011"}
							/>
							<SideBarItem
								direct={`/book#${BookTag.PICK}`}
								text={"Buy \uFF06 Pick \u3010ITEM\u3011"}
							/>
							<SideBarItem
								direct={`/book#${BookTag.WEAR}`}
								text={"Dress \uFF06 Wear \u3010OUTFIT\u3011"}
							/>
							<SideBarItem
								direct={`/book#${BookTag.STYLE}`}
								text={"Style \uFF06 Air \u3010GROOMING \uFF06 BEAUTY \u3011"}
							/>
							<SideBarItem
								direct={`/book#${BookTag.OTHER}`}
								text={"Other \u3010FASHION \uFF06 LIFESTYLE\u3011"}
							/>
						</VStack>
					</AccordionPanel>
				</AccordionItem>
			</Accordion>
			<Box h="5rem" />

			<HStack p={4} flexDirection={{ base: "column-reverse", md: "row" }}>
				<Flex>
					<IconButton
						isRound
						bgColor="transparent"
						aria-label="Direct to Pinterest"
						fontSize="1.5rem"
						icon={<FaPinterest />}
					/>
					<IconButton
						isRound
						bgColor="transparent"
						aria-label="Direct to Instagram"
						fontSize="1.5rem"
						icon={<FaInstagram />}
					/>
				</Flex>
				<Spacer />
				<Flex
					w="100%"
					justifyContent={{ base: "space-between", md: "end" }}
					fontWeight="bold"
					fontSize="1.25rem"
				>
					<Text display={{ base: "block", md: "none" }}>Luggage</Text>
					<Text>English</Text>
				</Flex>
			</HStack>
		</Flex>
	);
};

export default SideBar;
