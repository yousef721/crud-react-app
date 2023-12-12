import { useEffect } from "react";
import Loading from "../Components/Loading";
import { Button, Form } from "react-bootstrap";
import usePostDetails from "../Hooks/use-post-details";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { editPost } from "../State/postSlice";
import withGuard from "../util/withGuard";
import { PostScheme } from "../util/validationScheme";

const EditPost = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, recordDetails } = usePostDetails();

  useEffect(() => {
    return () => {
      dispatch({ type: "posts/cleanRecord" });
    };
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      title: recordDetails ? recordDetails.title : "",
      description: recordDetails ? recordDetails.description : "",
    },
    validationSchema: PostScheme,
    enableReinitialize: true,
    onSubmit: (values) => {
      dispatch(
        editPost({
          id: recordDetails.id,
          title: values.title,
          description: values.description,
        })
      )
        .unwrap()
        .then(() => {
          navigate("/");
        });
    },
  });
  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          onChange={formik.handleChange}
          value={formik.values.title}
          isInvalid={!!formik.errors.title}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.title}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="description"
          onChange={formik.handleChange}
          value={formik.values.description}
          isInvalid={!!formik.errors.description}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.description}
        </Form.Control.Feedback>
      </Form.Group>
      <Loading loading={loading} error={error}>
        <Button variant="primary" type="submit">
          Edit
        </Button>
      </Loading>
    </Form>
  );
};

export default withGuard(EditPost);
