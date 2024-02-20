import { Button } from "@chakra-ui/button";
import { useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import { useToast } from '@chakra-ui/react'

const LogoutButton = () => {
	const setUser = useSetRecoilState(userAtom);
  const toast = useToast()

	const handleLogout = async () => {
		try {
			const res = await fetch("/api/users/logout", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			});
			const data = await res.json();

			if (data.error) {
        toast({
          title: "Error",
          description: data.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
				return;
			}

			localStorage.removeItem("user-thread");
			setUser(data);
		} catch (error) {
      toast({
        title: "Error",
        description: error,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
		};
	};
	return (
		<Button position={"fixed"} top={"30px"} right={"30px"} size={"sm"} onClick={handleLogout}>
			Logout
		</Button>
	);
};

export default LogoutButton;