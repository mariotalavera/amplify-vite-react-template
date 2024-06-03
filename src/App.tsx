import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

// require('dotenv').config();

function App() {
  // console.log(process.env.FIRST_NAME);
  // console.log(process.env.MIDDLE_NAME);
  // console.log(process.env.LAST_NAME);

//  console.log('FIRST_NAME', process.env.FIRST_NAME);
  // console.log('MIDDLE_NAME', process.env.MIDDLE_NAME);
  
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

// const FIRST_NAME = process.env.FIRST_NAME;

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content") });
  }
  
  function deleteTodo(id: string) {
    client.models.Todo.delete({ id })
  }

  return (
    <main>
      <h1>My todos</h1>
      <p>Owner: process.env.FIRST_NAME Talavera</p>
      <button onClick={createTodo}>+ new</button>
      <ul>
        {todos.map((todo) => (
          <li 
          onClick={() => deleteTodo(todo.id)}
          key={todo.id}>{todo.content}</li>
        ))}
      </ul>
      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
          Review next step of this tutorial.
        </a>
      </div>
    </main>
  );
}

export default App;
