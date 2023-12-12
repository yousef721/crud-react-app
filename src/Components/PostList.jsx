import { Button, ButtonGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const PostList = ({ posts, deleteRecord, isLoggedIn }) => {
  const navigate = useNavigate();
  const handleDelete = (item) => {
    if (window.confirm(`Do you really want to delete record: ${item.title}`)) {
      deleteRecord(item.id);
    }
  };

  const records = posts.map((item, idx) => (
    <tr key={item.id}>
      <td>#{++idx}</td>
      <td>
        <Link to={`post/${item.id}`}>{item.title}</Link>
      </td>
      <td>
        <ButtonGroup aria-label="Basic example">
          <Button
            variant="success"
            onClick={() => navigate(`post/${item.id}/edit`)}
          >
            Edit
          </Button>
          <Button
            variant="danger"
            onClick={() => handleDelete(item)}
            disabled={!isLoggedIn}
          >
            Delete
          </Button>
        </ButtonGroup>
      </td>
    </tr>
  ));
  return <>{records}</>;
};

export default PostList;
