import { Button } from "@chakra-ui/react";

type Props = {
	currentPage: number;
	page: number;
	onClick: (e: React.MouseEvent) => void;
};

const PaginationButton: React.FC<Props> = ({ currentPage, page, onClick }) => (
	<Button
		variant="link"
		fontSize={20}
		h="2.5rem"
		w="2.5rem"
		color={currentPage === page ? "white" : "secondary"}
		bgColor={currentPage === page ? "secondary" : "transparent"}
		_hover={{ bgColor: currentPage === page ? "secondary" : "shade.100" }}
		onClick={onClick}
	>
		{page}
	</Button>
);

export default PaginationButton;
