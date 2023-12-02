import { Box, Button } from "@chakra-ui/react";
import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";

type Props = {
  to: string;
};

const FindMoreBtn: React.FC<Props> = ({ to }) => {
  return (
    <Button
      variant="link"
      rounded="none"
      display="flex"
      gap="0.5rem"
      fontSize={18}
      textColor="secondary"
      fontWeight={600}
      alignItems="center"
      opacity="100%"
      _hover={{ opacity: "50%" }}
    >
      <Box borderBottom="solid 2px" px="1rem" fontStyle="italic">
        <Link to={to}>{"Seek more to find your air"}</Link>
      </Box>
      <Box fontSize={22}>
        <FaChevronRight />
      </Box>
    </Button>
  );
};

export default FindMoreBtn;
