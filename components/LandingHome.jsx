import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/logo/sm-data.png";
import {
  BadgeCheck,
  Bolt,
  ChevronRight,
  Clock3,
  CreditCard,
  Headphones,
  Landmark,
  PhoneCall,
  ReceiptText,
  ShieldCheck,
  Smartphone,
  Tv,
  Wifi,
} from "lucide-react";

const services = [
  {
    title: "Data bundles",
    description: "Affordable plans for MTN, Airtel, Glo, and 9mobile.",
    icon: Wifi,
    href: "/signin",
  },
  {
    title: "Airtime top-up",
    description: "Recharge any Nigerian network in a few taps.",
    icon: Smartphone,
    href: "/signin",
  },
  {
    title: "Cable TV",
    description: "Renew DSTV, GOtv, and StarTimes subscriptions.",
    icon: Tv,
    href: "/signin",
  },
  {
    title: "Electricity bills",
    description: "Pay prepaid and postpaid power bills securely.",
    icon: Bolt,
    href: "/signin",
  },
  {
    title: "BVN & NIN slips",
    description: "Access identity verification services from one dashboard.",
    icon: ReceiptText,
    href: "/signin",
  },
  {
    title: "Airtime to cash",
    description: "Convert excess airtime to wallet value with ease.",
    icon: CreditCard,
    href: "/signin",
  },
];

const stats = [
  { value: "24/7", label: "service access" },
  { value: "4+", label: "mobile networks" },
  { value: "99%", label: "instant delivery focus" },
];

const highlights = [
  {
    title: "Fast wallet flow",
    description:
      "Fund once, buy repeatedly, and keep every payment traceable from your account.",
    icon: Landmark,
  },
  {
    title: "Secure account access",
    description:
      "Protected sign-in, encrypted user storage, and payment-first transaction handling.",
    icon: ShieldCheck,
  },
  {
    title: "Reliable support",
    description:
      "Clear service paths for everyday users, agents, and business developers.",
    icon: Headphones,
  },
];

const LandingHome = () => {
  return (
    <main className="min-h-screen bg-[#f7fafc] text-slate-900">
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src={Logo}
              alt="SM Data"
              className="h-12 w-12 rounded-md object-contain"
              priority
            />
            <span className="text-base font-semibold tracking-normal text-slate-950">
              SM Data
            </span>
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
            <a href="#services" className="transition hover:text-slate-950">
              Services
            </a>
            <a href="#why-us" className="transition hover:text-slate-950">
              Why SM Data
            </a>
            <a href="#support" className="transition hover:text-slate-950">
              Support
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/signin"
              className="hidden rounded-md px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 sm:inline-flex"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
            >
              Get started
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-x-0 top-0 h-24 bg-[#e8f6f0]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 pb-16 pt-14 sm:px-6 lg:grid-cols-[1.03fr_0.97fr] lg:px-8 lg:pb-20 lg:pt-20">
          <div className="flex flex-col justify-center">
            <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-800">
              <BadgeCheck className="h-4 w-4" />
              Digital top-up and bill payment hub
            </div>
            <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-normal text-slate-950 sm:text-5xl lg:text-6xl">
              Buy data, airtime, and pay bills from one dependable VTU
              platform.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              SM Data gives individuals, agents, and growing teams a simple
              place to recharge phones, manage subscriptions, settle utilities,
              and access verification services.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-slate-950 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
              >
                Create free account
                <ChevronRight className="h-4 w-4" />
              </Link>
              <Link
                href="/signin"
                className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition hover:border-slate-400 hover:bg-slate-50"
              >
                Sign in to dashboard
              </Link>
            </div>

            <div className="mt-10 grid max-w-xl grid-cols-3 divide-x divide-slate-200 rounded-md border border-slate-200 bg-white shadow-sm">
              {stats.map((item) => (
                <div key={item.label} className="px-4 py-4">
                  <p className="text-2xl font-semibold text-slate-950">
                    {item.value}
                  </p>
                  <p className="mt-1 text-xs font-medium uppercase text-slate-500">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-[520px]">
            <div className="absolute inset-0 rounded-md bg-[#12211c]" />
            <div className="absolute inset-4 rounded-md border border-white/10 bg-[#17342b] p-5 shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <div className="flex items-center gap-3">
                  <Image
                    src={Logo}
                    alt="SM Data"
                    className="h-12 w-12 rounded-md bg-white object-contain"
                  />
                  <div>
                    <p className="text-sm font-medium text-emerald-100">
                      SM Data wallet
                    </p>
                    <p className="text-xs text-white/55">Ready for purchase</p>
                  </div>
                </div>
                <div className="rounded-md bg-emerald-400 px-3 py-1 text-xs font-bold text-emerald-950">
                  LIVE
                </div>
              </div>

              <div className="mt-6 rounded-md bg-white p-5 text-slate-950">
                <p className="text-sm font-medium text-slate-500">
                  Wallet balance
                </p>
                <p className="mt-2 text-4xl font-semibold">₦25,000</p>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <Link
                    href="/signin"
                    className="rounded-md bg-emerald-600 px-4 py-3 text-center text-sm font-semibold text-white"
                  >
                    Buy data
                  </Link>
                  <Link
                    href="/signin"
                    className="rounded-md border border-slate-200 px-4 py-3 text-center text-sm font-semibold text-slate-800"
                  >
                    Pay bill
                  </Link>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">
                {[
                  ["MTN data", "2GB delivered"],
                  ["Airtel airtime", "₦1,000 top-up"],
                  ["Electricity", "Token received"],
                  ["Cable TV", "Plan renewed"],
                ].map(([title, value]) => (
                  <div key={title} className="rounded-md bg-white/10 p-4">
                    <p className="text-xs font-medium text-white/55">{title}</p>
                    <p className="mt-2 text-sm font-semibold text-white">
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="absolute bottom-5 left-5 right-5 rounded-md border border-emerald-300/30 bg-emerald-300/10 p-4 text-emerald-50">
                <div className="flex items-center gap-3">
                  <Clock3 className="h-5 w-5" />
                  <p className="text-sm font-medium">
                    Recent orders stay organized in your dashboard history.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="bg-[#f7fafc] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-semibold uppercase text-emerald-700">
                Core services
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-normal text-slate-950">
                Everything customers buy daily, ready in one place.
              </h2>
            </div>
            <Link
              href="/signin"
              className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800"
            >
              Open dashboard
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <Link
                  href={service.href}
                  key={service.title}
                  className="group rounded-md border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-emerald-300 hover:shadow-md"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-md bg-slate-950 text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-slate-950">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {service.description}
                  </p>
                  <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-emerald-700">
                    Start transaction
                    <ChevronRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section id="why-us" className="bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase text-emerald-700">
              Built for repeat use
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-normal text-slate-950">
              A cleaner way to manage daily digital payments.
            </h2>
            <p className="mt-5 text-base leading-7 text-slate-600">
              The interface keeps essential VTU actions close, so customers can
              move from wallet funding to service purchase without switching
              tools or losing transaction records.
            </p>
          </div>

          <div className="grid gap-4">
            {highlights.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-md border border-slate-200 bg-[#fbfcfd] p-6"
                >
                  <div className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-emerald-100 text-emerald-700">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-950">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="support" className="bg-[#10231d] py-16 text-white sm:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_auto] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase text-emerald-300">
              Ready when you are
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-normal">
              Start with a customer account or return to your dashboard.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/70">
              Agents and business teams can use their dedicated sign-in paths as
              the platform grows.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-emerald-400 px-6 py-3 text-sm font-semibold text-emerald-950 transition hover:bg-emerald-300"
            >
              Create account
              <ChevronRight className="h-4 w-4" />
            </Link>
            <a
              href="tel:+2348140950947"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              <PhoneCall className="h-4 w-4" />
              Call support
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-slate-500 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div className="flex items-center gap-3">
            <Image
              src={Logo}
              alt="SM Data"
              className="h-9 w-9 rounded-md object-contain"
            />
            <span>© {new Date().getFullYear()} SM Data. All rights reserved.</span>
          </div>
          <div className="flex gap-5">
            <Link href="/signin" className="hover:text-slate-900">
              Sign in
            </Link>
            <Link href="/signup" className="hover:text-slate-900">
              Sign up
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default LandingHome;
