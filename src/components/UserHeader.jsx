import { Box, VStack, Text, Flex } from "@chakra-ui/layout";
import { Avatar, Link } from "@chakra-ui/react";
import { PiInstagramLogo } from "react-icons/pi";
import { PiDotsThreeCircle } from "react-icons/pi";
import { Menu, MenuButton, MenuList, MenuItem, Portal } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";

const UserHeader = () => {
  const toast = useToast();

  const copyURL = () => {
    const currentURL = window.location.href;
    navigator.clipboard.writeText(currentURL).then(() => {
      toast({
        title: "Copied.",
        description: "You have copied the profile link.",
        status: "success",
        duration: 300,
        isClosable: true,
      });
    });
  };

  return (
    <VStack gap={4} alignItems={"start"}>
      <Flex justifyContent={"space-between"} w={"full"}>
        <Box>
          <Text fontSize={"2xl"} fontWeight={"bold"}>
            Mark Zuckerberg
          </Text>
          <Flex gap={2} alignItems={"center"}>
            <Text fontSize={"small"}>markzuckerberg</Text>
            <Text
              fontSize={"smaller"}
              bg={"gray.dark"}
              color={"gray.light"}
              p={1}
              borderRadius={"full"}
            >
              thread.net
            </Text>
          </Flex>
        </Box>
        <Box>
          <Avatar name="Mark zuckerberg" src="/zuck-avatar.png" size={"xl"} />
        </Box>
      </Flex>
      <Text>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt,
        repellat! Enim quam est minus eveniet officiis voluptatibus sunt sed
        commodi corrupti dolorum hic facilis rem eius, autem sint dicta eos?
      </Text>
      <Flex w={"full"} justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text>3.2k followers</Text>
          <Box w="1" h="1" bg={"gray.light"} borderRadius={"full"}></Box>
          <Link color={"gray.light"}>instagram.com</Link>
        </Flex>
        <Flex>
          <Box className="icon-container">
            <PiInstagramLogo size={24} cursor={"pointer"} />
          </Box>
          <Box className="icon-container">
            <Menu>
              <MenuButton>
                <PiDotsThreeCircle size={24} cursor={"pointer"} />
              </MenuButton>
              <Portal>
                <MenuList bg={"gray.dark"}>
                  <MenuItem bg={"gray.dark"} onClick={copyURL}>
                    Copy Link
                  </MenuItem>
                </MenuList>
              </Portal>
            </Menu>
          </Box>
        </Flex>
      </Flex>
      <Flex w={"full"}>
        <Flex
          flex={1}
          borderBottom={"1.5px solid white"}
          justifyContent={"center"}
          pb="3"
          cursor={"pointer"}
        >
          <Text fontWeight={"bold"}>Threads</Text>
        </Flex>
        <Flex
          flex={1}
          borderBottom={"1.5px solid gray"}
          justifyContent={"center"}
          pb="3"
          cursor={"pointer"}
          color={"gray.light"}
        >
          <Text fontWeight={"bold"}>Repiles</Text>
        </Flex>
      </Flex>
    </VStack>
  );
};

export default UserHeader;
