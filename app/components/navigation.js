import Link from "next/link";

export default function Navigation() {
  return (
    <ul className="decoration-none flex items-end justify-center gap-4">
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/cabins">Cabins</Link>
      </li>
      <li>
        <Link href="/about">about</Link>
      </li>
      <li>
        <Link href="/account">account</Link>
      </li>
    </ul>
  );
}
