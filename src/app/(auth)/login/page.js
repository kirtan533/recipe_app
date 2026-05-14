"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { login } from "@/services/auth";

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.classList.add("hide-footer");
    }

    return () => {
      if (typeof document !== "undefined") {
        document.body.classList.remove("hide-footer");
      }
    };
  }, []);

  const handleLogin = async (data) => {
    try {
      await login(data.email, data.password);
      toast.success("Login successful 🎉");
      reset();
      router.replace("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDemoLogin = async () => {
    try {
      await login("demo@gmail.com", "123456");
      toast.success("Demo login successful 🚀");
      reset();
      router.replace("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md w-full max-w-sm"
      >
        <h2 className="text-xl font-bold mb-4 dark:text-white">Login</h2>

        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email format",
            },
          })}
          placeholder="Email"
          className="w-full p-2 mb-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 placeholder-black dark:text-white dark:placeholder-gray-400"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mb-2">{errors.email.message}</p>
        )}

        <input
          {...register("password", {
            required: "Password required",
            minLength: {
              value: 6,
              message: "Min 6 characters",
            },
          })}
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border rounded-lg dark:bg-gray-700 placeholder-black dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mb-2">{errors.password.message}</p>
        )}

        <button
          className="w-full bg-black dark:bg-white dark:text-black text-white py-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 cursor-pointer transition"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>

        <p
          className="mt-3 text-sm text-center cursor-pointer text-blue-500 dark:text-blue-400"
          onClick={() => router.push("/signup")}
        >
          New user? Signup
        </p>
        <button
          type="button"
          onClick={handleDemoLogin}
          className="w-full mt-3 border py-2 rounded-lg hover:bg-gray-100 dark:hover:text-gray-400 transition font-medium"
        >
          Login as Demo User
        </button>
        <p className="text-[.8rem] text-gray-500 mt-2 text-center font-semibold">
          Use demo account for quick access
        </p>
      </form>
    </div>
  );
}
