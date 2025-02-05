"use client";

import { useState,useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RootState } from "@/GlobalRedux/store";
import { useSelector,useDispatch } from "react-redux";
import { login } from "@/GlobalRedux/features/userSlice";
import { loginUser } from "@/services/loginPageApi";


import * as z from "zod";


const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const user=useSelector((state:RootState)=>state.user);
  const dispatch=useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  




  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormInputs) => {
    setLoading(true);
    setErrorMessage("");

    try {
      const response =await loginUser(data.email, data.password);
      dispatch(login(response.user));
      console.log("Login successful:", response.message);
      alert("Login successful! ✅");
    } catch (error: any) {
      setErrorMessage(error.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-80">
        <h2 className="text-2xl text-black font-semibold text-center mb-4">Login</h2>

        {errorMessage && <p className="text-red-500 text-sm text-center">{errorMessage}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              {...register("email",{required:"Email is required"})}
              className="w-full p-2 border rounded text-black"
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              {...register("password")}
              className="w-full p-2 border rounded text-black"
              placeholder="Enter your password"
            />
            {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Don't have an account? <a href="/register" className="text-blue-500">Register</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
