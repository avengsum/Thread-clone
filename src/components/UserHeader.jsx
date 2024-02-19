import {Box,VStack ,Text, Flex } from '@chakra-ui/layout'
import { Avatar,Link } from '@chakra-ui/react'
import { PiInstagramLogo } from "react-icons/pi";

const UserHeader = () => {
  return (
    <VStack gap={4} alignItems={"start"}>
      <Flex justifyContent={"space-between"} w={"full"}>
        <Box>
          <Text fontSize={"2xl"} fontWeight={"bold"}>
            Mark Zuckerberg
          </Text>
          <Flex gap={2} alignItems={"center"}>
            <Text fontSize={"small"}>markzuckerberg</Text>
            <Text fontSize={"smaller"} bg={"gray.dark"} color={"gray.light"} p={1} borderRadius={"full"}>
              thread.net
            </Text>
          </Flex>
        </Box>
        <Box>
          <Avatar name = 'Mark zuckerberg' src='/zuck-avatar.png' size={"xl"} />
        </Box> 
      </Flex>
      <Text>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, repellat! Enim quam est minus eveniet officiis voluptatibus sunt sed commodi corrupti dolorum hic facilis rem eius, autem sint dicta eos?
      </Text>
      <Flex w={"full"} justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text>3.2k followers</Text>
          <Box w="1" h= "1" bg={"gray.light"} borderRadius={"full"}></Box>
          <Link color={"gray.light"}>instagram.com</Link>
        </Flex>
        <Flex>
          <Box>
          <PiInstagramLogo size={24} cursor={"pointer"} />
          </Box>
        </Flex>
      </Flex>
    </VStack>
  )
}

export default UserHeader