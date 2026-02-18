import LinkButton from "@/components/ui/button/LinkButton";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white sm:items-start">
        <LinkButton href="/screening-test">Take Tests</LinkButton>
        <LinkButton href="/dashboard">Dashboard</LinkButton>
      </main>
    </div>
  );
}
