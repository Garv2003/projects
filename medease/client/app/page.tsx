import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const Home = () => {

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-10 w-fit"
          />

          <div className="text-24-bold text-dark-800 mb-4">
            Welcome to CarePluse
          </div>

          <div className="flex items-center justify-center gap-2">
            <Link href="/login">
              <Button className="btn-primary">Login</Button>
            </Link>
            <Link href="/register">
              <Button className="btn-secondary">Register</Button>
            </Link>
          </div>

          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © 2024 CarePluse
            </p>
            <Link href="/?admin=true" className="text-green-500">
              Admin
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
