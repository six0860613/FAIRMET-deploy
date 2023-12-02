import {
	Box,
	Button,
	Flex,
	Image,
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	Text,
} from "@chakra-ui/react";
import { faker } from "@faker-js/faker";
import React from "react";
import { Brand, TagKey } from "../types";
import TagList from "./TagList";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

type Props = {
	isOpen: boolean;
	onClose: () => void;
	brand: Brand;
	previousHandler: (e: React.MouseEvent) => void;
	nextHandler: (e: React.MouseEvent) => void;
};

const imageGridMinH = 60;
const productTagList: TagKey[] = [
	"Style, Occasion",
	"Function & Activity",
	"Item & Category",
	"Notable Category & Item",
];
const otherTagList: TagKey[] = [
	"Sort",
	"Field",
	"Country & Region",
	"Price",
	"Gender",
];

const DictionaryModal: React.FC<Props> = ({
	isOpen,
	onClose,
	brand,
	nextHandler,
	previousHandler,
}) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent
				my="auto"
				rounded="none"
				h={{ base: "85vh", md: "80vh" }}
				w={{ base: "85vw", md: "80vw" }}
				maxW="80rem"
				px="2rem"
				py="1rem"
				position="relative"
			>
				<Button
					variant="unstyled"
					textColor="secondary"
					position="absolute"
					fontSize="40"
					_hover={{ textColor: "shade.100" }}
					rounded="none"
					display="flex"
					justifyContent="center"
					alignItems="center"
					transform="auto"
					top="50%"
					translateY="-50%"
					left="0"
					translateX="-100%"
					p="0"
					onClick={previousHandler}
				>
					<FaChevronLeft />
				</Button>
				<Button
					variant="unstyled"
					textColor="secondary"
					_hover={{ textColor: "shade.100" }}
					position="absolute"
					fontSize="40"
					rounded="none"
					display="flex"
					justifyContent="center"
					alignItems="center"
					transform="auto"
					top="50%"
					translateY="-50%"
					right="0"
					translateX="100%"
					p="0"
					onClick={nextHandler}
				>
					<FaChevronRight />
				</Button>

				<Box overflow="hidden" h="100%" w="100%">
					<Flex
						flexDirection={{ base: "column", md: "row" }}
						overflowY="auto"
						h="100%"
						css={{
							"&::-webkit-scrollbar": {
								display: "none",
							},
						}}
					>
						<Flex
							flex="2"
							direction="column"
							gap="1rem"
							minH={`${imageGridMinH}rem`}
							display={{ base: "none", md: "flex" }}
						>
							<Box flex={`2 1 ${imageGridMinH / 2}rem`} minH="0" minW="0">
								<Image
									src={faker.image.url()}
									objectFit="cover"
									w="100%"
									h="100%"
									objectPosition="center"
								/>
							</Box>
							<Box flex={`1 1 ${imageGridMinH / 4}rem`} minH="0" minW="0">
								<Image
									src={faker.image.url()}
									w="100%"
									h="100%"
									objectFit="cover"
									objectPosition="center"
								/>
							</Box>
							<Flex flex={`1 1 ${imageGridMinH / 4}rem`} minH="0" minW="0">
								<Box flexBasis="50%">
									<Image
										w="100%"
										h="100%"
										src={faker.image.url()}
										objectFit="cover"
										objectPosition="center"
									/>
								</Box>
								<Box flexBasis="50%">
									<Image
										w="100%"
										h="100%"
										src={faker.image.url()}
										objectFit="cover"
										objectPosition="center"
									/>
								</Box>
							</Flex>
						</Flex>
						<Flex display={{ base: "flex", md: "none" }} pos="relative">
							<Image
								src={faker.image.url()}
								w="100%"
								h="100%"
								objectFit="cover"
								objectPosition="center"
							/>
							<Image
								objectFit="cover"
								src={`/image/Brand/${brand.title}/logo.png`}
								alt={brand.title}
								w="40%"
								border="2px solid white"
								pos="absolute"
								zIndex={20}
								right="5%"
								bottom="-10%"
								opacity="0.9"
							/>
						</Flex>
						<Box flex={{ base: "1", md: "3" }}>
							<ModalHeader px={{ base: 1, md: 8 }}>{brand.title}</ModalHeader>
							<ModalBody px={{ base: 1, md: 8 }}>
								<Tabs display={{ base: "none", md: "block" }}>
									<TabList display="flex">
										<Tab
											flex="1"
											_selected={{
												textColor: "secondary",
												borderBottom: "solid 1px",
											}}
											textColor="shade.500"
										>
											{"Introduction"}
										</Tab>
										<Tab
											flex="1"
											_selected={{
												textColor: "secondary",
												borderBottom: "solid 1px",
											}}
											textColor="shade.500"
										>
											{"Personality \u0026 Product"}
										</Tab>
										<Tab
											flex="1"
											_selected={{
												textColor: "secondary",
												borderBottom: "solid 1px",
											}}
											textColor="shade.500"
										>
											{"Other Detail \u0026 Link"}
										</Tab>
									</TabList>

									<TabPanels>
										<TabPanel
											display="flex"
											px="2rem"
											py="3rem"
											gap="1rem"
											flexDirection="column"
										>
											{brand?.content ? (
												brand.content.split("\n").map((section, i) => (
													<Text key={i} textColor="secondary">
														{section}
													</Text>
												))
											) : (
												<Text
													textAlign="center"
													fontSize={18}
													textColor="shade.500"
													opacity="20%"
													fontWeight={700}
													fontStyle="italic"
												>
													{"Empty"}
												</Text>
											)}
										</TabPanel>
										<TabPanel>
											<Flex flexDirection="column" gap="2rem">
												{productTagList.map((title, i) => (
													<TagList
														key={i}
														title={title}
														value={brand.tags[title]}
													/>
												))}
											</Flex>
										</TabPanel>
										<TabPanel>
											<Flex flexDirection="column" gap="2rem">
												{otherTagList.map((title, i) => (
													<TagList
														key={i}
														title={title}
														value={brand.tags[title]}
													/>
												))}
											</Flex>
										</TabPanel>
									</TabPanels>
								</Tabs>
								<Flex display={{ base: "block", md: "none" }}>
									<Box
										fontStyle="italic"
										fontWeight="bold"
										fontSize={18}
										borderBottom="1px solid black"
									>
										{"Introduction"}
									</Box>
									<Box h="1rem"></Box>
									<Flex flexDirection="column">
										{brand?.content ? (
											brand.content.split("\n").map((section, i) => (
												<Text key={i} textColor="secondary">
													{section}
												</Text>
											))
										) : (
											<Text
												textAlign="center"
												fontSize={18}
												textColor="shade.500"
												opacity="20%"
												fontWeight={700}
												fontStyle="italic"
											>
												{"Empty"}
											</Text>
										)}
									</Flex>
									<Box h="3rem"></Box>
									<Box
										fontStyle="italic"
										fontWeight="bold"
										fontSize={18}
										borderBottom="1px solid black"
									>
										{"Personality \u0026 Product"}
									</Box>
									<Box h="1rem"></Box>
									<Flex flexDirection="column" gap="2rem">
										{productTagList.map((title, i) => (
											<TagList
												key={i}
												title={title}
												value={brand.tags[title]}
											/>
										))}
									</Flex>
									<Box h="3rem"></Box>
									<Box
										fontStyle="italic"
										fontWeight="bold"
										fontSize={18}
										borderBottom="1px solid black"
									>
										{"Other Detail \u0026 Link"}
									</Box>
									<Box h="1rem"></Box>
									<Flex flexDirection="column" gap="2rem">
										{otherTagList.map((title, i) => (
											<TagList
												key={i}
												title={title}
												value={brand.tags[title]}
											/>
										))}
									</Flex>
									<Box h="3rem"></Box>
								</Flex>
							</ModalBody>
						</Box>
					</Flex>
				</Box>
			</ModalContent>
		</Modal>
	);
};

export default DictionaryModal;
