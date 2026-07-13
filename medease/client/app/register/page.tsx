import Image from "next/image";
import { UserRegisterForm } from "@/components/forms/UserRegisterForm";

const Register = async ({ params: { userId } }: SearchParamProps) => {

  return (
    <div className="flex h-screen max-h-screen justify-center items-center">
      <section className="remove-scrollbar flex justify-center items-center container">
        <UserRegisterForm />
      </section>
      <Image
        src="/assets/images/register-img.png"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[500px]"
      />
    </div>
  );
};

export default Register;