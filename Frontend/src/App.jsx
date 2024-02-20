import { Container } from "@chakra-ui/react";
import {Route ,Routes} from 'react-router-dom'
import UserPage from "./Pages/UserPage";
import PostPage from "./Pages/PostPage";
import Header from "./components/Header";
import Auth from "./Pages/Auth";

function App() {
  return ( 
    <Container maxW="620px">
      <Header />
      <Routes>
        <Route path="/:username" element = {<UserPage />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/:username/post/:pid" element={<PostPage />} />
      </Routes>
    </Container>
  );
}

export default App;
