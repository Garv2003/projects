import Image from "next/image";
import { LoginForm } from "@/components/forms/LoginForm";

const Register = async ({ params: { userId } }: SearchParamProps) => {

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <LoginForm />
      </section>
      <Image
        src="/assets/images/register-img.png"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[390px]"
      />
    </div>
  );
};

export default Register;
