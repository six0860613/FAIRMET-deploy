import {
	Box,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
	Flex,
	useDisclosure,
} from '@chakra-ui/react';
import SideBar from '../pages/SideBar';
import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

type Props = {};

const MobileFooter: React.FC<Props> = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const location = useLocation();
	const [footerActive, setFooterActive] = useState<string>('');

	useEffect(() => {
		if (location) onClose();
		setFooterActive(location.pathname);
	}, [location, onClose]);
	return (
		<>
			<Drawer isOpen={isOpen} placement="left" onClose={onClose} size="xs">
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader></DrawerHeader>
					<DrawerBody>
						<SideBar />
					</DrawerBody>
				</DrawerContent>
			</Drawer>
			<Flex
				display={{ base: 'flex', md: 'none' }}
				w="100%"
				maxW="100vw"
				pos="fixed"
				zIndex="100"
				bottom="0"
				bgColor="black"
				color="primary"
				justifyContent="space-around"
				alignContent="center"
			>
				<Box fontSize="1.25rem" lineHeight="3rem">
					Optted
				</Box>
				<Box
					fontStyle="italic"
					borderTop={`${footerActive === '/' ? '2px solid white' : ''}`}
					p="2"
				>
					<Link to={'/'}>{'Home'}</Link>
				</Box>
				<Box
					fontStyle="italic"
					borderTop={`${
						footerActive === '/dictionary' ? '2px solid white' : ''
					}`}
					p="2"
				>
					<Link to={'/dictionary'}>{'Dictionary'}</Link>
				</Box>
				<Box
					fontStyle="italic"
					borderTop={`${footerActive === '/book' ? '2px solid white' : ''}`}
					p="2"
				>
					<Link to={'/book'}>{'Book'}</Link>
				</Box>
				<Box fontStyle="italic" onClick={onOpen} cursor="pointer" py="2">
					MENU
				</Box>
			</Flex>
		</>
	);
};

export default MobileFooter;
