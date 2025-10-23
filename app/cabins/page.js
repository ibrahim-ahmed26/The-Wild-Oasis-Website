import Counter from "../components/Counter";

export default async function Page() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await res.json();
  return (
    <div>
      <h1 className="text-amber-500 text-center font-bold shadow-lg border  w-full border-red-200 rounded-md">
        Hello Cabins
      </h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
      <Counter users={users} />
    </div>
  );
}
