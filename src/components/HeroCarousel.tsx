import { GridItem, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { TBook } from "../types";
import { getBooks } from "../util/getBooks";
import Carousel from "./Carousel";

const cardLength = 10;

const HeroCarousel = () => {
  const [heroCardList, setHeroCardList] = useState<TBook[]>([]);
  const [imageLoading, setImageLoading] = useState<boolean[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    getBooks({ limit: cardLength }).then((res) => setHeroCardList(res));
  }, []);

  useEffect(() => {
    const allImageIsLoaded = imageLoading.every((status) => !status);
    setIsLoading(!allImageIsLoaded);
  }, [imageLoading]);

  return (
    <Carousel isReady={!isLoading} showProgressBar noGap>
      {heroCardList.map((heroCard, i) => (
        <GridItem key={i} position="relative" h="100%" minW="max-content">
          <Image
            src={heroCard.image}
            alt={heroCard.title}
            h="36rem"
            objectFit="cover"
            onLoadStart={() => {
              setImageLoading((prev) => {
                const newArr = [...prev];
                newArr[i] = true;
                return newArr;
              });
            }}
            onLoad={() => {
              setImageLoading((prev) => {
                const newArr = [...prev];
                newArr[i] = false;
                return newArr;
              });
            }}
          />
          <Text
            bg="white"
            position="absolute"
            bottom="5"
            left="50%"
            transform="auto"
            translateX="-50%"
            w="100%"
            maxW="80%"
          >
            {heroCard.title}
          </Text>
        </GridItem>
      ))}
    </Carousel>
  );
};

export default HeroCarousel;
