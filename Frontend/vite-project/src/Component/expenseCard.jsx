import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteExpense } from "./Feature/expenseSlice.js";
import {
  formatCurrency,
  formatDate,
  getCategoryMeta,
  normalizeCategory,
} from "./utils/formatters.js";

export default function ExpenseCard({ expense }) {
  const dispatch = useDispatch();
  const [deleting, setDeleting] = useState(false);

  const meta = getCategoryMeta(expense.category);
  const displayCategory = normalizeCategory(expense.category);

  const handleDelete = async () => {
    setDeleting(true);

    await dispatch(deleteExpense(expense.id));

    setDeleting(false);
  };

  return (
    <div className="group flex items-center gap-4 py-4 px-3 border-b border-zinc-100 transition hover:bg-[#0A3A2F]/5 rounded-2xl">

      {/* Icon */}
      <div
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-xl leading-none bg-[#0A3A2F]/5 text-[#0A3A2F]"
        style={{
          fontFamily:
            '"Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", sans-serif',
        }}
        aria-hidden
      >
        {meta.icon}
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <p className="truncate text-base font-semibold text-[#0A3A2F]">
          {expense.title}
        </p>

        <div className="mt-0.5 flex items-center gap-2">
          <span className="text-xs font-semibold text-[#0A3A2F]/70">
            {displayCategory}
          </span>

          {expense.date && (
            <span className="text-xs text-zinc-400 font-medium">
              · {formatDate(expense.date)}
            </span>
          )}
        </div>
      </div>

      {/* Amount */}
      <span className="shrink-0 text-base font-bold tabular-nums text-[#0A3A2F]">
        {formatCurrency(expense.amount)}
      </span>

      {/* Delete Button */}
      <button
        onClick={handleDelete}
        disabled={deleting}
        className="ml-1 flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 opacity-0 transition group-hover:opacity-100 hover:text-red-600 hover:bg-red-50 disabled:opacity-40"
        title="Delete"
      >
        {deleting ? (
          <span className="text-xs font-bold">...</span>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        )}
      </button>

    </div>
  );
}