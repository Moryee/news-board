import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { CreatePost, ListPosts } from "../components/Posts";

const HomePage = () => {
  const { user } = useContext(AuthContext);
  
  return (
    <section>
      {user &&
        <CreatePost />}
      <ListPosts />
    </section>
  );
};

export default HomePage;
