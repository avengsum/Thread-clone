import { Container } from "@chakra-ui/react";
import {Route ,Routes} from 'react-router-dom'
import UserPage from "./Pages/UserPage";
import PostPage from "./Pages/PostPage";
import Header from "./components/Header";
import Auth from "./Pages/Auth";
import { useRecoilValue } from "recoil";
import userAtom from "./atoms/userAtom";
import HomePage from "./Pages/Homepage";
import { Navigate } from "react-router-dom";
import LogoutButton from "./components/LogoutButton";
import UpdateProfilePage from "./Pages/UpdateUserProfile";
import CreatePost from "./components/CreatePost";


function App() {

  const user = useRecoilValue(userAtom);

  console.log(user)

  return ( 
    <Container maxW="620px">
      <Header />
      <Routes>
        <Route path="/" element={ user ? <HomePage /> : <Navigate to='/auth' />} />
        <Route path="/:username" element = {<UserPage />} />
        <Route path="/update" element={user ? <UpdateProfilePage /> : <Navigate to="/auth" />} />
        <Route path="/auth" element={!user ? <Auth /> : <Navigate to="/" />} />
        <Route path="/:username/post/:pid" element={<PostPage />} />
      </Routes>

      {user && <LogoutButton />}
      {user && <CreatePost />}

    </Container>
  );
}

export default App;
