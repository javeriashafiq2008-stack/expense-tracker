export const formatCurrency = (amount, currency = "PKR") =>
  new Intl.NumberFormat("en-PK", { style: "currency", currency }).format(amount);

export const formatDate = (dateStr) =>
  new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(dateStr));

export const CATEGORIES = [
  "Food",
  "Travel",
  "Shopping",
  "Salary/Income",
  "Other",
];

/** Plain UTF-8 emoji strings — no icon libraries */
export const CATEGORY_EMOJI = {
  Food: "🍔",
  Travel: "✈️",
  Shopping: "🛒",
  "Salary/Income": "💰",
  Other: "🧾",
};

export const CATEGORY_META = {
  Food: {
    icon: CATEGORY_EMOJI.Food,
    label: "Food",
    color: "text-amber-400",
    bg: "bg-amber-400/10",
  },
  Travel: {
    icon: CATEGORY_EMOJI.Travel,
    label: "Travel",
    color: "text-sky-400",
    bg: "bg-sky-400/10",
  },
  Shopping: {
    icon: CATEGORY_EMOJI.Shopping,
    label: "Shopping",
    color: "text-rose-400",
    bg: "bg-rose-400/10",
  },
  "Salary/Income": {
    icon: CATEGORY_EMOJI["Salary/Income"],
    label: "Salary/Income",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
  },
  Other: {
    icon: CATEGORY_EMOJI.Other,
    label: "Other",
    color: "text-zinc-400",
    bg: "bg-zinc-400/10",
  },
};

/** Maps legacy DB categories to current filter categories */
const CATEGORY_ALIASES = {
  "Food & Drink": "Food",
  food: "Food",
  Food: "Food",
  Transport: "Travel",
  travel: "Travel",
  Travel: "Travel",
  Shopping: "Shopping",
  shopping: "Shopping",
  "Salary/Income": "Salary/Income",
  salary: "Salary/Income",
  income: "Salary/Income",
  Housing: "Other",
  Entertainment: "Other",
  Health: "Other",
  Education: "Other",
  other: "Other",
  Other: "Other",
};

export const normalizeCategory = (category) => {
  if (!category) return "Other";
  const trimmed = String(category).trim();
  return CATEGORY_ALIASES[trimmed] || trimmed;
};

export const getCategoryMeta = (category) => {
  const key = normalizeCategory(category);
  return CATEGORY_META[key] || CATEGORY_META.Other;
};

export const FILTER_OPTIONS = ["All", ...CATEGORIES];
