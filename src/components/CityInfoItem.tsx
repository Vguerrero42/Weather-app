import React from "react";
import { Box, Flex, Spacer } from "@chakra-ui/layout";
import { InfoProps } from "../myTypes";

const CityInfoItem: React.FC<InfoProps> = ({ info: { label, value } }) => {
  value = Array.isArray(value) ? `${value[0]} / ${value[1]}` : value;
  return (
    <Flex
      direction="row"
      m="6"
      paddingBottom="10"
      borderBottom="2px solid"
      borderColor="gray.400"
    >
      <Box>{label}</Box>
      <Spacer />
      <Box aria-label={`value for ${label}`}>{value}</Box>
    </Flex>
  );
};

export default CityInfoItem;
