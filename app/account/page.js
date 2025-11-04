import { auth } from "../_library/auth";

export const metadata = {
  title: "Guest Area",
};
export default async function Page() {
  const session = await auth();

  const firstName = session.user.name.split(" ").at(0);
  return (
    <h1 className="sm:text-3xl text-xl font-bold text-accent-400 animate-pulse">
      Welcome ,{firstName}
    </h1>
  );
}
