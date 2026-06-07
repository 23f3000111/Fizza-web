import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-[60vh] grid place-items-center text-center py-24">
      <div className="container-site">
        <span className="eyebrow justify-center before:hidden">Error 404</span>
        <h1 className="font-serif text-6xl sm:text-8xl text-navy my-5">Lost the title.</h1>
        <p className="text-mute max-w-[42ch] mx-auto mb-7">The page you&apos;re after doesn&apos;t exist — but the listings are all still here.</p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link href="/" className="btn btn-primary">Back home</Link>
          <Link href="/listings" className="btn btn-ghost">Browse listings</Link>
        </div>
      </div>
    </section>
  );
}
