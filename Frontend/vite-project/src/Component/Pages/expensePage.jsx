import { useEffect, useMemo, useState } from "react";
import { useLocation, useOutletContext } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchExpenses } from "../Feature/expenseSlice.js";

import ExpenseForm from "../expenseForm.jsx";
import ExpenseCard from "../expenseCard.jsx";
import {
  FILTER_OPTIONS,
  formatCurrency,
  getCategoryMeta,
  normalizeCategory,
} from "../utils/formatters.js";

export default function ExpensesPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [categoryFilter, setCategoryFilter] = useState("All");
  const { activeView, setActiveView, sidebarOpen, setSidebarOpen } = useOutletContext();

  const { expenses = [], loading = false } = useSelector((s) => s.expenses);

  const filteredExpenses = useMemo(() => {
    if (categoryFilter === "All") return expenses;
    return expenses.filter((exp) => {
      const normExp = normalizeCategory(exp.category).trim().toLowerCase();
      const normFilter = normalizeCategory(categoryFilter).trim().toLowerCase();
      return normExp === normFilter;
    });
  }, [expenses, categoryFilter]);

  const filteredTotal = useMemo(
    () =>
      filteredExpenses.reduce((sum, exp) => sum + Number(exp.amount), 0),
    [filteredExpenses]
  );

  useEffect(() => {
    dispatch(fetchExpenses());
  }, [dispatch]);

  useEffect(() => {
    if (location.pathname === "/dashboard") {
      setActiveView("dashboard");
    }
  }, [location.pathname]);

  const pageTitle = activeView === "add" ? "Add Expense" : "Dashboard";
  const pageSubtitle =
    activeView === "add"
      ? "Record a new transaction"
      : "Overview of your spending";

  return (
    <div className="w-full flex-1 flex flex-col">
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-8 sm:py-10">
        {activeView === "add" ? (
          <div className="mx-auto max-w-lg">
            <p className="mb-8 text-xs font-semibold text-zinc-400 uppercase tracking-wider">{pageSubtitle}</p>
            <ExpenseForm />
          </div>
        ) : (
          <div className="space-y-8">
            <p className="-mt-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">{pageSubtitle}</p>

            <div className="grid gap-6 sm:grid-cols-2">
              {/* Premium Forest Green Balance Card */}
              <div className="rounded-3xl bg-[#0A3A2F] text-white p-8 shadow-xl relative overflow-hidden flex flex-col justify-between min-h-[170px]">
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/5 rounded-full blur-3xl pointer-events-none" />
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#E2EBE9]/80">
                    {categoryFilter === "All"
                      ? "Total spending"
                      : `${categoryFilter} spending`}
                  </p>
                  <p className="mt-3 text-4xl font-extrabold tracking-tight text-white">
                    {formatCurrency(filteredTotal)}
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between text-[10px] text-[#E2EBE9]/60 font-bold border-t border-white/10 pt-4">
                  <span>Active Budget</span>
                  <span className="bg-white/10 px-2 py-0.5 rounded-full text-white text-[9px]">Premium Account</span>
                </div>
              </div>

              {/* Minimalist White Metric Card */}
              <div className="rounded-3xl border border-zinc-100 bg-white p-8 shadow-sm flex flex-col justify-between min-h-[170px] text-zinc-800">
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-wider text-zinc-400">
                    Transactions
                  </p>
                  <p className="mt-3 text-4xl font-extrabold tracking-tight text-[#0A3A2F]">
                    {filteredExpenses.length}
                  </p>
                </div>
                <p className="mt-4 text-[10px] font-bold text-zinc-400 border-t border-zinc-50 pt-4">
                  {categoryFilter === "All"
                    ? `${expenses.length} total recorded`
                    : `${expenses.length} total · filtered`}
                </p>
              </div>
            </div>

            {/* Category Filter Tabs */}
            <section className="bg-white border border-zinc-100 shadow-sm rounded-[24px] p-6 text-zinc-800">
              <h2 className="mb-4 text-xs font-extrabold text-[#0A3A2F]/80 uppercase tracking-wider">
                Filter by category
              </h2>
              <div className="flex flex-wrap gap-2">
                {FILTER_OPTIONS.map((cat) => {
                  const meta = cat === "All" ? null : getCategoryMeta(cat);
                  const active = categoryFilter === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategoryFilter(cat)}
                      className={
                        "inline-flex items-center gap-1.5 rounded-full border px-4 py-2.5 text-xs font-bold transition-all " +
                        (active
                          ? "border-[#0A3A2F] bg-[#0A3A2F] text-white shadow-sm shadow-[#0A3A2F]/10 scale-[1.02]"
                          : "border-zinc-200 bg-zinc-50 text-zinc-500 hover:border-zinc-300 hover:text-zinc-800 hover:bg-zinc-100/50")
                      }
                    >
                      {meta && (
                        <span
                          className="text-sm leading-none"
                          style={{
                            fontFamily:
                              '"Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", sans-serif',
                          }}
                          aria-hidden
                        >
                          {meta.icon}
                        </span>
                      )}
                      {cat === "All" ? "All" : cat}
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Expenses History List */}
            <section className="space-y-4">
              <div className="mb-4 flex items-center justify-between px-1">
                <h2 className="text-xl font-extrabold text-[#0A3A2F] tracking-tight">
                  Expenses
                </h2>
                {!loading && filteredExpenses.length > 0 && (
                  <span className="text-xs font-semibold text-zinc-400">
                    {filteredExpenses.length} item
                    {filteredExpenses.length !== 1 ? "s" : ""}
                  </span>
                )}
              </div>

              {loading ? (
                <div className="rounded-[24px] border border-zinc-100 bg-white py-24 text-center text-zinc-400 shadow-sm font-semibold text-sm">
                  Loading expenses...
                </div>
              ) : expenses.length === 0 ? (
                <div className="rounded-[24px] border border-dashed border-zinc-200 bg-white py-24 text-center shadow-sm">
                  <p className="font-semibold text-zinc-500">No expenses yet</p>
                  <p className="mt-1 text-xs text-zinc-400">
                    Use Add Expense in the menu to get started
                  </p>
                </div>
              ) : filteredExpenses.length === 0 ? (
                <div className="rounded-[24px] border border-zinc-100 bg-white py-24 text-center text-zinc-400 shadow-sm font-semibold text-sm">
                  No expenses in {categoryFilter}
                </div>
              ) : (
                <div className="bg-white border border-zinc-100 shadow-sm rounded-[24px] p-6 space-y-1">
                  {filteredExpenses.map((exp) => (
                    <ExpenseCard key={exp.id} expense={exp} />
                  ))}
                </div>
              )}
            </section>
          </div>
        )}
      </main>
    </div>
  );
}
