import { useEffect, useState } from "react";
import UserHeader from "../components/UserHeader";
import UserPost from "../components/UserPost";
import {useParams} from "react-router-dom"
import useShowToast from "../hooks/useShowToast";
import { useRecoilValue } from "recoil";
import Post from "../components/Post";
import userAtom from "../atoms/userAtom";
import { useRecoilState } from "recoil";
import postsAtom from "../atoms/postsAtom";
import useGetUserProfile from "../hooks/useGetUserProfile";
import { Flex, Spinner } from '@chakra-ui/react'
import checkPost from "../atoms/checkPost";

const UserPage = () => {
	const {username} = useParams()
	console.log(username)

	const showToast = useShowToast();

	const [posts, setPosts] = useRecoilState(postsAtom);
	const [fetchingPosts, setFetchingPosts] = useState(true);
	const { user, loading } = useGetUserProfile();
	const isCheckPostUpdated = useRecoilValue(checkPost);


	
	useEffect(() => {

		const getPosts = async () => {
			setFetchingPosts(true);
			try {
				const res = await fetch(`/api/posts/user/${username}`);
				const data = await res.json();
				setPosts(data);
			} catch (error) {
				showToast("Error", error.message, "error");
				setPosts([]);
			} finally {
				setFetchingPosts(false);
			}
		};

		getPosts();

	}, [username, setPosts,isCheckPostUpdated]);
	console.log("posts is here and it is recoil state", posts);

	return (
		<>
			<UserHeader user={user} />
			{!posts && (
				<>
			<UserPost likes={1200} replies={481} postImg='/post1.png' postTitle="Let's talk about threads." />
			<UserPost likes={451} replies={12} postImg='/post2.png' postTitle='Nice tutorial. Highly recommended.' />
			<UserPost
				likes={6721}
				replies={989}
				postImg='/post3.png'
				postTitle="I love this guy and can't wait to see him in cage. 💪"
			/>
			<UserPost likes={212} replies={56} postTitle='This is my first thread.' /> 
			</>)}

			{!fetchingPosts && posts.length === 0 && <h1>User has not posts.</h1>}
			{fetchingPosts && (
				<Flex justifyContent={"center"} my={12}>
					<Spinner size={"xl"} />
				</Flex>
			)}

			{posts.map((post) => (
				<Post key={post._id} post={post} postedBy={post.postedBy} />
			))}
		</>
	);
};

export default UserPage;