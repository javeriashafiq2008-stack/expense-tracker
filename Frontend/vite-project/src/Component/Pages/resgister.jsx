import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userRegister } from "../Feature/authSlice.js";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, token } = useSelector((s) => s.auth);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { name: "", email: "", password: "", confirm: "" },
  });

  const password = watch("password");

  useEffect(() => {
    if (token) {
      navigate("/dashboard", { replace: true });
    }
  }, [token, navigate]);

  const onSubmit = async ({ confirm, ...payload }) => {
    const result = await dispatch(userRegister(payload));
    if (userRegister.fulfilled.match(result)) {
      navigate("/dashboard", { replace: true });
    }
  };

  return (
    <div className="w-full max-w-sm bg-white rounded-[24px] shadow-xl p-8 border border-zinc-100 text-zinc-800">
      <h1 className="text-3xl font-extrabold text-center text-[#0A3A2F] tracking-tight mb-2">
        Air Pay
      </h1>
      <p className="text-center text-xs text-zinc-400 font-bold mb-8">
        CREATE YOUR FINTECH ACCOUNT.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>

        <div>
          <label className="block text-[10px] font-extrabold text-zinc-400 uppercase tracking-wider mb-1.5">Full Name</label>
          <input
            type="text"
            placeholder="John Doe"
            className="w-full p-3.5 rounded-xl border border-zinc-200 bg-zinc-50 text-zinc-900 outline-none transition focus:border-[#0A3A2F] focus:ring-1 focus:ring-[#0A3A2F] text-xs font-semibold"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <p className="mt-1.5 text-xs font-semibold text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-[10px] font-extrabold text-zinc-400 uppercase tracking-wider mb-1.5">Email</label>
          <input
            type="email"
            placeholder="name@example.com"
            className="w-full p-3.5 rounded-xl border border-zinc-200 bg-zinc-50 text-zinc-900 outline-none transition focus:border-[#0A3A2F] focus:ring-1 focus:ring-[#0A3A2F] text-xs font-semibold"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: EMAIL_PATTERN,
                message: "Enter a valid email",
              },
            })}
          />
          {errors.email && (
            <p className="mt-1.5 text-xs font-semibold text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-[10px] font-extrabold text-zinc-400 uppercase tracking-wider mb-1.5">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full p-3.5 rounded-xl border border-zinc-200 bg-zinc-50 text-zinc-900 outline-none transition focus:border-[#0A3A2F] focus:ring-1 focus:ring-[#0A3A2F] text-xs font-semibold"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <p className="mt-1.5 text-xs font-semibold text-red-500">{errors.password.message}</p>
          )}
        </div>

        <div>
          <label className="block text-[10px] font-extrabold text-zinc-400 uppercase tracking-wider mb-1.5">Confirm Password</label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full p-3.5 rounded-xl border border-zinc-200 bg-zinc-50 text-zinc-900 outline-none transition focus:border-[#0A3A2F] focus:ring-1 focus:ring-[#0A3A2F] text-xs font-semibold"
            {...register("confirm", {
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
          />
          {errors.confirm && (
            <p className="mt-1.5 text-xs font-semibold text-red-500">{errors.confirm.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 p-3.5 rounded-xl bg-[#0A3A2F] text-white font-bold text-xs tracking-wide uppercase transition hover:bg-[#06241D] hover:shadow-lg hover:shadow-[#0A3A2F]/10 active:scale-[0.98] disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Account"}
        </button>
      </form>

      <p className="text-center text-xs font-semibold text-zinc-400 mt-6">
        Already have an account?{" "}
        <Link to="/login" className="text-[#0A3A2F] hover:underline font-bold">
          Login
        </Link>
      </p>
    </div>
  );
}
