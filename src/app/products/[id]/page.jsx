export default function SingleProduct({ params }) {
  return (
    <section className="min-h-screen">
      <h1>{params.id}</h1>
    </section>
  );
}
