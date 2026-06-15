import LandingHome from "@/components/LandingHome";

export const metadata = {
  title: "MISAL SUB | VTU, Airtime, Data & Bills Payment",
  description:
    "Buy data, recharge airtime, pay electricity and cable TV bills, and access BVN/NIN services from one secure VTU platform.",
  keywords:
    "MISAL SUB, VTU, data bundle, airtime recharge, electricity bill, cable TV, BVN, NIN, Nigeria",
  openGraph: {
    type: "website",
    title: "MISAL SUB | VTU, Airtime, Data & Bills Payment",
    description:
      "A dependable VTU platform for data, airtime, bill payments, and identity services.",
  },
  twitter: {
    card: "summary_large_image",
    title: "MISAL SUB | VTU Services",
    description:
      "Buy data, airtime, pay bills, and manage daily digital services from one dashboard.",
  },
};

const Home = () => {
  return <LandingHome />;
};

export default Home;
