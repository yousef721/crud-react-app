import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Loading from "../Components/Loading";
import usePostDetails from "../Hooks/use-post-details";

const Details = () => {
  const { loading, error, recordDetails } = usePostDetails();
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch({ type: "posts/cleanRecord" });
    };
  }, [dispatch]);

  return (
    <Loading loading={loading} error={error}>
      <div>
        <h2>Details</h2>
        <div>
          <h3>Title: {recordDetails.title}</h3>
          <h3>Description: {recordDetails.description}</h3>
        </div>
      </div>
    </Loading>
  );
};

export default Details;
