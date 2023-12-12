import { useDispatch, useSelector } from "react-redux";
import TableList from "../Components/TableList";
import { useCallback, useEffect } from "react";
import { deletePost, fetchPosts } from "../State/postSlice";
import Loading from "../Components/Loading";

const Index = () => {
  const dispatch = useDispatch();
  const postsList = useSelector((state) => state.postSlice);
  const { isLoggedIn } = useSelector((state) => state.authSlice);

  const deleteRecord = useCallback(
    (id) => {
      dispatch(deletePost(id));
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <Loading loading={postsList.loading} error={postsList.error}>
      <TableList posts={postsList.record} deleteRecord={deleteRecord} isLoggedIn={isLoggedIn} />
    </Loading>
  );
};

export default Index;
