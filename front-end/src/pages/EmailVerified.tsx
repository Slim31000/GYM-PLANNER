import { Link } from "react-router-dom";

export default function EmailVerified() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md border rounded-xl p-6 space-y-4 text-center">
        <h1 className="text-2xl font-bold">Email vérifié</h1>
        <p>Ton adresse email a bien été confirmée.</p>

        <Link
          to="/auth/sign-in"
          className="inline-block border rounded-lg px-4 py-2"
        >
          Aller à la connexion
        </Link>
      </div>
    </main>
  );
}