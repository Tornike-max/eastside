import { useForm } from "react-hook-form";
import { useSignin } from "../../hooks/users/useSignin";
import { Button, Input } from "@nextui-org/react";

export default function Signin() {
  const { register, handleSubmit } = useForm();
  const { mutate, isPending } = useSignin();

  function onSubmit(data: any) {
    if (!data) return;

    mutate({ email: data.email, password: data.password });
  }

  return (
    <div className="flex justify-center items-center flex-col gap-10 max-w-3xl w-full h-full">
      {/* <h1 className="text-purple-500 text-3xl font-serif">
        Welcome to East Side Official Website
      </h1> */}
      <form
        className="rounded-md  p-8 shadow-lg w-full text-stone-800"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-center text-3xl font-serif text-stone-200 py-8">
          Sign In
        </h1>
        <div className="mb-6">
          <Input
            type="email"
            id="email"
            variant="faded"
            label="Email"
            className="w-full text-stone-800"
            placeholder="Enter your email address"
            {...register("email", { required: "Email is required" })}
          />
        </div>
        <div className="mb-6">
          <Input
            type="password"
            id="password"
            variant="faded"
            label="Password"
            className="w-full text-stone-800"
            placeholder="Enter your password"
            {...register("password", { required: "Password is required" })}
          />
        </div>
        <div>
          <p></p>
        </div>
        <div className="flex justify-center items-center gap-2">
          <Button
            type="submit"
            color="secondary"
            variant="shadow"
            disabled={isPending}
          >
            {isPending ? "Signing In..." : "Sign In"}
          </Button>
          <Button
            type="button"
            color="default"
            variant="shadow"
            onClick={() => {
              // Your navigation logic to signup form here
            }}
          >
            Sign Up
          </Button>
        </div>
      </form>
    </div>
  );
}
