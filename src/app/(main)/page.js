import Navbar from "@/components/layout/Navbar";


export default function HomePage() {
  return (
    <>
      <Navbar />

      <main className="container-custom py-20">
        <div className="dashboard-card">
          <h1 className="section-title">
            ShelfParcel Theme Test
          </h1>

          <p className="mt-4 text-muted-foreground">
            Toggle dark and light mode from navbar.
          </p>

          <button className="btn-primary mt-8 bg-primary">
            Test Button
          </button>
        </div>
      </main>
    </>
  );
}