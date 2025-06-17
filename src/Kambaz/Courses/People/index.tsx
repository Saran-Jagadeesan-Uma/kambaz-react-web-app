import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as client from "../client";
import PeopleTable from "./Table";

export default function People() {
  const { cid } = useParams();
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!cid) return;
      const response = await client.findUsersForCourse(cid);
      setUsers(response);
    };
    fetchUsers();
  }, [cid]);

  return <PeopleTable users={users} />;
}
