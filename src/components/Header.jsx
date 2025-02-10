import { Link } from "react-router";

export function Header() {
  return (
    <header className="mx-auto w-full text-center bg-background p-4 flex items-center justify-between border-b">
      <div className="flex w-3/4 justify-between mx-auto">
          <h1 className="text-2xl font-bold">Flight Tracker</h1>
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-md">Home</Link>
            <Link to="/favorites" className="text-md">Preferiti</Link>
      </div>
      </div>
    </header>
  );
}

