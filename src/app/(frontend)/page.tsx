import Link from "next/link";
import "./styles.css";

export default async function HomePage() {
  return (
    <div className="grid min-h-svh items-center justify-items-center">
      <div className="container space-y-2 text-center">
        <h1 className="text-5xl">Wetlands!</h1>
        <p className="text-sm">This is the frontend application.</p>
        <div className="grid">
          <Link href="/admin" className="card">
            Admin &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
