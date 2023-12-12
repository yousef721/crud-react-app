import { memo } from "react";
import { Table } from "react-bootstrap";
import PostList from "./PostList";

const TableList = ({ posts, deleteRecord, isLoggedIn }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th style={{ width: "70%" }}>Title</th>
          <th style={{ width: "10%" }}></th>
        </tr>
      </thead>
      <tbody>
        <PostList posts={posts} deleteRecord={deleteRecord} isLoggedIn={isLoggedIn}/>
      </tbody>
    </Table>
  );
};

export default memo(TableList);
