import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addExpense } from "./Feature/expenseSlice.js";
import { CATEGORIES } from "./utils/formatters.js";

const EMPTY = { title: "", amount: "", category: "Food" };

export default function ExpenseForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((s) => s.expenses);
  const { token } = useSelector((s) => s.auth);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: EMPTY,
  });

  const onSubmit = async (data) => {
    if (!token) {
      navigate("/register", { replace: true });
      return;
    }

    const result = await dispatch(
      addExpense({ ...data, amount: +data.amount })
    );

    if (addExpense.fulfilled.match(result)) {
      reset(EMPTY);
      navigate("/dashboard", { replace: true });
    }
  };

  return (
    <div className="bg-white border border-zinc-100 shadow-xl rounded-[24px] p-8 text-zinc-800">
      <h2 className="mb-5 text-xl font-extrabold text-[#0A3A2F] tracking-tight">
        New Expense
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>

        <div>
          <label className="block text-[10px] font-extrabold text-zinc-400 uppercase tracking-wider mb-2">
            Title
          </label>

          <input
            placeholder="e.g. Morning coffee"
            className="w-full p-3.5 rounded-xl border border-zinc-200 bg-zinc-50 text-zinc-900 outline-none transition focus:border-[#0A3A2F] focus:ring-1 focus:ring-[#0A3A2F] text-xs font-semibold"
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && (
            <p className="mt-1.5 text-xs font-semibold text-red-500">{errors.title.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">

          <div>
            <label className="block text-[10px] font-extrabold text-zinc-400 uppercase tracking-wider mb-2">
              Amount
            </label>

            <input
              type="number"
              step="0.01"
              placeholder="0.00"
              className="w-full p-3.5 rounded-xl border border-zinc-200 bg-zinc-50 text-zinc-900 outline-none transition focus:border-[#0A3A2F] focus:ring-1 focus:ring-[#0A3A2F] text-xs font-semibold"
              {...register("amount", {
                required: "Amount is required",
                validate: (value) => {
                  const num = Number(value);
                  if (Number.isNaN(num) || num <= 0) {
                    return "Enter a valid amount greater than 0";
                  }
                  return true;
                },
              })}
            />
            {errors.amount && (
              <p className="mt-1.5 text-xs font-semibold text-red-500">{errors.amount.message}</p>
            )}
          </div>

          <div>
            <label className="block text-[10px] font-extrabold text-zinc-400 uppercase tracking-wider mb-2">
              Category
            </label>

            <select
              className="w-full cursor-pointer p-3.5 rounded-xl border border-zinc-200 bg-zinc-50 text-zinc-900 outline-none transition focus:border-[#0A3A2F] focus:ring-1 focus:ring-[#0A3A2F] text-xs font-semibold"
              {...register("category", { required: "Category is required" })}
            >
              {CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            {errors.category && (
              <p className="mt-1.5 text-xs font-semibold text-red-500">{errors.category.message}</p>
            )}
          </div>

        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 p-3.5 rounded-xl bg-[#0A3A2F] text-white font-bold text-xs tracking-wide uppercase transition hover:bg-[#06241D] hover:shadow-lg hover:shadow-[#0A3A2F]/10 active:scale-[0.98] disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add Expense"}
        </button>

      </form>
    </div>
  );
}
