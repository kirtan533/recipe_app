"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  useEffect(() => {
    document.body.classList.add("hide-footer");

    return () => {
      document.body.classList.remove("hide-footer");
    };
  }, []);

  const onSubmit = (data) => {
    localStorage.setItem("user", JSON.stringify(data));
    window.dispatchEvent(new Event("userChanged"));
    router.push("/");
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-2xl shadow-md w-full max-w-sm"
      >
        <h2 className="text-xl font-bold mb-4 dark:text-black">Login</h2>

        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email Format",
            },
          })}
          placeholder="Email"
          className="w-full p-2 mb-3 border rounded-lg dark:placeholder:text-black placeholder:text-black dark:text-black"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        <input
          {...register("password", {
            required: "Password required",
            minLength: {
              value: 6,
              message: "Min 6 characters",
            },
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
              message: "Password must contain letters and numbers",
            },
          })}
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border rounded-lg dark:placeholder:text-black placeholder:text-black dark:text-black"
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
        <button className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 cursor-pointer">
          Login
        </button>
      </form>
    </div>
  );
}
