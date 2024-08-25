import { useSearchParams } from 'next/navigation';

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams?.get('error');

  return (
    <div>
      <h1>Erreur d'authentification</h1>
      <p>{error ? decodeURIComponent(error) : "Une erreur inconnue est survenue."}</p>
    </div>
  );
}
