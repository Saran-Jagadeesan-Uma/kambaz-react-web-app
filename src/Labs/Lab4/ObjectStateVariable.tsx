import { useState } from "react";
import { Form } from "react-bootstrap";

export default function ObjectStateVariable() {
  const [person, setPerson] = useState({ name: "Peter", age: 24 });
  return (
    <div>
      <h2>Object State Variables</h2>
      <pre>{JSON.stringify(person, null, 2)}</pre>
      <Form.Control
        defaultValue={person.name}
        onChange={(e) => setPerson({ ...person, name: e.target.value })}
      />
      <Form.Control
        defaultValue={person.age}
        onChange={(e) =>
          setPerson({ ...person, age: parseInt(e.target.value) })
        }
      />
      <hr />
    </div>
  );
}
