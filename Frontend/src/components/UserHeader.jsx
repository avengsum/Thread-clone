import { Box, VStack, Text, Flex  } from "@chakra-ui/layout";
import { Avatar} from "@chakra-ui/react";
import { PiInstagramLogo } from "react-icons/pi";
import { PiDotsThreeCircle } from "react-icons/pi";
import { Menu, MenuButton, MenuList, MenuItem, Portal , Button } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useState } from "react";
import useShowToast from "../hooks/useShowToast";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";


const UserHeader = ({user}) => {
  const toast = useToast();

  const showToast = useShowToast();

  const currentUser = useRecoilValue(userAtom)

  const [following , setFollowing]  = useState(user?.followers.some((follower) => follower._id === currentUser._id));

  const handleFollowUnFollow = async () => {
    try {
      
      const res = await fetch(`api/users/follow/${user._id}`,{
        method:"POST",
        headers: {
          "Content-Type": "application/json",
        }
      });

      const data = res.json();

      console.log(data)

      if(following){
        showToast("Success",`Unfollowed ${user.name}`,"success");
        user.followers.pop();
      }else{
        showToast("Success",`Followed ${user.name}`,"success");
        user.followers.push(currentUser._id)
      }
      setFollowing(!following);

    } catch (error) {
      
    }
  }

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
            {user?.name}
          </Text>
          <Flex gap={2} alignItems={"center"}>
            <Text fontSize={"small"}>{user?.username}</Text>
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
          {user?.profilePic && (
            <Avatar name={user?.name} src={user?.profilePic} size={"xl"} />
          )} 
          {!user?.profilePic && (
            <Avatar name={user?.name} src="http://bit.ly/broken-link" size={"xl"} />
          )} 
        </Box>
      </Flex>
      <Text>
        {user?.bio}
      </Text>
      {currentUser?._id === user?._id && (
        <Link to="/update">
        <Button size={"sm"}>Update Profile</Button></Link>
      )
      }
      {currentUser?._id === user?._id && (

        <Button onClick={() => handleFollowUnFollow} size={"sm"}>{following ? "UnFollow" : "Follow" }</Button>
      )
      }

      <Flex w={"full"} justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text>{user?.followers.lenght} followers</Text>
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
