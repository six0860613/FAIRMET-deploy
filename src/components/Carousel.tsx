import {
  Box,
  Button,
  Grid,
  Skeleton,
  Slider,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/react";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

type Props = {
  isReady: boolean;
  showProgressBar?: boolean;
  noGap?: boolean;
};

const Carousel: React.FC<PropsWithChildren<Props>> = ({
  isReady,
  children,
  showProgressBar,
  noGap,
}) => {
  const [showLeftBtn, setShowLeftBtn] = useState<boolean>(false);
  const [showRightBtn, setShowRightBtn] = useState<boolean>(true);
  const [currentOffset, setCurrentOffset] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const scrollLeft = useRef<number | null>(null);
  const startX = useRef<number | null>(null);
  const isDown = useRef<boolean>(false);
  const isDrag = useRef<boolean>(false);

  const onScrollHandler = () => {
    if (
      containerRef.current?.getClientRects()[0].right ===
        ref.current?.lastElementChild?.getClientRects()[0].right &&
      showRightBtn
    ) {
      setShowRightBtn(false);
    } else if (
      containerRef.current?.getClientRects()[0].right !==
        ref.current?.lastElementChild?.getClientRects()[0].right &&
      !showRightBtn
    ) {
      setShowRightBtn(true);
    }

    if (
      containerRef.current?.getClientRects()[0].left ===
        ref.current?.firstElementChild?.getClientRects()[0].left &&
      showLeftBtn
    ) {
      setShowLeftBtn(false);
    } else if (
      containerRef.current?.getClientRects()[0].left !==
        ref.current?.firstElementChild?.getClientRects()[0].left &&
      !showLeftBtn
    ) {
      setShowLeftBtn(true);
    }

    setCurrentOffset(
      ((containerRef.current?.getClientRects()[0].x! -
        ref.current?.firstElementChild?.getClientRects()[0].x! +
        containerRef.current?.offsetWidth! / 2) /
        ref.current?.offsetWidth!) *
        100
    );
  };

  const startHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    isDown.current = true;
    startX.current = e.pageX - innerRef.current?.offsetLeft!;
    scrollLeft.current = innerRef.current!.scrollLeft;
  };

  const moveHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isDown.current) return;
    isDrag.current = true;
    const currentX = e.pageX - innerRef.current?.offsetLeft!;
    const walk = currentX - startX.current!;
    innerRef.current!.scrollLeft! = scrollLeft.current! - walk;
  };

  const endHandler = (e: React.MouseEvent) => {
    if (!isDown.current) return;
    if (isDrag.current) e.stopPropagation();
    e.preventDefault();
    isDrag.current = false;
    isDown.current = false;
    startX.current = null;

    // let elToShow = 0;
    // for (const [i, el] of [...ref.current!.children].entries()) {
    // 	if (
    // 		el.getClientRects()[0].left >
    // 		containerRef.current?.getClientRects()[0].x!
    // 	) {
    // 		elToShow = i;
    // 		break;
    // 	}
    // }

    // const offset =
    // 	ref.current!.children[elToShow].getClientRects()[0].left -
    // 	ref.current!.children[0].getClientRects()[0].left!;

    // innerRef.current?.scrollTo(offset, 0);
  };

  const leftHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!ref.current) return;
    let elToShow = 0;
    for (const [i, el] of [...ref.current.children].entries()) {
      if (
        el.getClientRects()[0].left >=
        containerRef.current?.getClientRects()[0].x!
      ) {
        elToShow = i - 1;
        break;
      }
    }

    const offset =
      ref.current.children[elToShow < 0 ? 0 : elToShow].getClientRects()[0]
        .left - ref.current.children[0].getClientRects()[0].x!;

    innerRef.current?.scrollTo(offset, 0);
  };

  const rightHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!ref.current) return;
    let elToShow = 0;
    for (const [i, el] of [...ref.current.children].entries()) {
      if (
        el.getClientRects()[0].right >
        containerRef.current?.offsetWidth! +
          containerRef.current?.getClientRects()[0].x!
      ) {
        elToShow = i;
        break;
      }
    }

    const offset =
      ref.current.children[elToShow].getClientRects()[0].left -
      ref.current.children[0].getClientRects()[0].x!;

    innerRef.current?.scrollTo(offset, 0);
  };

  useEffect(() => {
    setIsLoading(
      !ref.current?.offsetWidth &&
        !innerRef.current?.offsetWidth &&
        !containerRef.current?.offsetWidth
    );
  }, [
    ref.current?.offsetWidth,
    innerRef.current?.offsetWidth,
    containerRef.current?.offsetWidth,
  ]);

  return (
    <Box position="relative">
      <Skeleton isLoaded={!isLoading && isReady}>
        {showProgressBar && (
          <Box
            position="absolute"
            width="20%"
            top="0"
            right="0"
            transform="auto"
            translateY="-100%"
          >
            <Box position="relative">
              <Slider
                aria-label="slider-ex-1"
                overflow="hidden"
                defaultValue={0}
                value={currentOffset}
              >
                <SliderTrack />
                <SliderThumb
                  transition="linear"
                  transitionDuration="0.1s"
                  rounded="none"
                  h="100%"
                  w={
                    containerRef.current?.offsetWidth! /
                    ref.current?.offsetWidth!
                  }
                  bgColor="secondary"
                />
              </Slider>
              <Box
                zIndex={10}
                w="100%"
                h="100%"
                bgColor="transparent"
                position="absolute"
                top="0"
                left="0"
              />
            </Box>
          </Box>
        )}
        <Box overflow="hidden" ref={containerRef}>
          <Box
            overflowX="auto"
            scrollBehavior="smooth"
            ref={innerRef}
            onScroll={onScrollHandler}
            onMouseDownCapture={startHandler}
            onMouseUpCapture={endHandler}
            onMouseLeave={endHandler}
            onMouseMove={moveHandler}
            cursor={isDown.current ? "grabbing" : "grab"}
            userSelect="none"
            willChange="transform"
            transition="all 0.2s"
            css={{
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            <Grid
              ref={ref}
              w="max-content"
              maxW="max-content"
              gridAutoFlow="column"
              h="fit-content"
              gap={noGap ? "0" : "0.5rem"}
            >
              {children}
            </Grid>
          </Box>
        </Box>
        {showLeftBtn && (
          <Button
            variant="unstyled"
            textColor="secondary"
            position="absolute"
            fontSize="28"
            rounded="none"
            display="flex"
            justifyContent="center"
            alignItems="center"
            transform="auto"
            top="50%"
            translateY="-50%"
            left="0"
            bg="white"
            p="0"
            onClick={leftHandler}
          >
            <FaChevronLeft />
          </Button>
        )}
        {showRightBtn && (
          <Button
            variant="unstyled"
            textColor="secondary"
            position="absolute"
            fontSize="28"
            bgColor="white"
            rounded="none"
            display="flex"
            justifyContent="center"
            alignItems="center"
            transform="auto"
            top="50%"
            translateY="-50%"
            right="0"
            p="0"
            onClick={rightHandler}
          >
            <FaChevronRight />
          </Button>
        )}
      </Skeleton>
    </Box>
  );
};

export default Carousel;
