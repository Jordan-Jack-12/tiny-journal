import Button from "@/components/ui/button/Button";
import LinkButton from "@/components/ui/button/LinkButton";
import SecButton from "@/components/ui/button/SecButton";
import TopNavBar from "@/components/ui/landing-page-topbar/TopNavBar";

export default function Home() {
  return (
    <div className="min-h-screen sm:min-w-4xl mx-auto">
      <div className="sticky top-0">
        <TopNavBar />
      </div>
      <main className="sm:min-w-4xl mx-auto">
        <section className="flex flex-col mx-auto max-w-4xl justify-center items-center">
          <div className="pt-12">
            <h1 className="text-5xl font-semibold">Tiny Journal App</h1>
          </div>
          <div>
            <p>make your life good</p>
          </div>
          <div className="flex gap-2 py-10">
            <SecButton>Demo</SecButton>
            <LinkButton href="/dashboard">Get Started</LinkButton>
          </div>
        </section>
        <section className="flex flex-col mx-auto max-w-4xl justify-center items-center">
          <h2 className="text-3xl">How Tiny Journal Works</h2>
          <div className="">
            <video
              src="/sample_640x360.webm"
              className="rounded-2xl"
              controls
              controlsList="nodownload noremoteplayback"
            ></video>
          </div>
        </section>
        <section className="flex flex-col mx-auto max-w-4xl justify-center items-center">
          <h2 className="text-3xl">Why Tiny Journal</h2>
        </section>
        <section className="flex flex-col mx-auto max-w-4xl justify-center items-center">
          <h2 className="text-3xl">What Users are Saying</h2>
        </section>
        <section className="flex flex-col mx-auto max-w-4xl justify-center items-center">
          <h2 className="text-3xl">Choose What works for You</h2>
        </section>
      </main>
    </div>
  );
}
