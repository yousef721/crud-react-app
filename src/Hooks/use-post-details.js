import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPost } from "../State/postSlice";

const usePostDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, error, recordDetails } = useSelector(
    (state) => state.postSlice
  );

  useEffect(() => {
    dispatch(fetchPost(id));
  }, [dispatch, id]);
  
  return { loading, error, recordDetails };
};

export default usePostDetails;
