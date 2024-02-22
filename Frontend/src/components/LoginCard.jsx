import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useSetRecoilState } from "recoil";
import authScreenAtom from "../atoms/authAtom";
import { useToast } from '@chakra-ui/react'
import userAtom from "../atoms/userAtom";



export default function LoginCard() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const setAuthScreen = useSetRecoilState(authScreenAtom);
  
  const toast = useToast();

  const [input ,setInput] = useState({
    username:"",
    password:"",
  })

  const setUser = useSetRecoilState(userAtom);


  const handleLogin = async () => {
    setLoading(true);
    try {
      
      const res = await fetch('/api/users/login',{
        method: 'POST',
        headers:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input)
      });

      const data = await res.json();

      if(data.message){
        toast({
          title: "Error",
          description: data.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });

      

      }
      localStorage.setItem("user-thread",JSON.stringify(data));
      setUser(data);
    
    }

     catch (error) {
      console.log(error);
    }
   finally {
    setLoading(false);
  }
  }

  return (
    <Flex align={"center"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Login
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.dark")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Username</FormLabel>
              <Input type="text" 
              onChange={(e) => setInput({...input,username:e.target.value})}
              value={input.username}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? "text" : "password"} 
                onChange={(e) => setInput({...input,password:e.target.value})}
                value={input.password}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={() => handleLogin()}
                isLoading={loading}
              >
                Login
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Don't have an account ?{" "}
                <Link
                  color={"blue.400"}
                  onClick={() => setAuthScreen("signup")}
                >
                  Sign up
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
