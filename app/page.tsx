import LinkButton from "@/components/ui/button/LinkButton";
import SecButton from "@/components/ui/button/SecButton";
import TopNavBar from "@/components/ui/landing-page-topbar/TopNavBar";

export default function Home() {
  return (
    <div className="min-h-screen sm:min-w-4xl mx-auto">
      <TopNavBar />
      <main className="sm:min-w-4xl mx-auto">
        <SecButton>fsljfsalj</SecButton>
        <LinkButton href="/screening-test">Take Tests</LinkButton>
        <LinkButton href="/dashboard">Dashboard</LinkButton>
      </main>
    </div>
  );
}
