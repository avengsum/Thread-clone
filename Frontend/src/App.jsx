import {Box, Container } from "@chakra-ui/react";
import {Route ,Routes} from 'react-router-dom'
import UserPage from "./Pages/UserPage";
import PostPage from "./Pages/PostPage";
import Header from "./components/Header";
import Auth from "./Pages/Auth";
import { useRecoilValue } from "recoil";
import userAtom from "./atoms/userAtom";
import { Navigate } from "react-router-dom";
import UpdateProfilePage from "./Pages/UpdateUserProfile";
import CreatePost from "./components/CreatePost";
import HomePage from './Pages/HomePage'
import ChatPage from "./Pages/ChatPage";


function App() {

  const user = useRecoilValue(userAtom);

  console.log(user)

  return ( 
    <Box position={"relative"} w='full'>
			<Container maxW='620px'>
				<Header />
				<Routes>
					<Route path='/' element={user ? <HomePage /> : <Navigate to='/auth' />} />
					<Route path='/auth' element={!user ? <AuthPage /> : <Navigate to='/' />} />
					<Route path='/update' element={user ? <UpdateProfilePage /> : <Navigate to='/auth' />} />

					<Route
						path='/:username'
						element={
							user ? (
								<>
									<UserPage />
									<CreatePost />
								</>
							) : (
								<UserPage />
							)
						}
					/>
					<Route path='/:username/post/:pid' element={<PostPage />} />
					<Route path='/chat' element={user ? <ChatPage /> : <Navigate to={"/auth"} />} />
				</Routes>
			</Container>
		</Box>
  );
}

export default App;
