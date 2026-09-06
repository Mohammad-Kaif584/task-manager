import React from "react";
import {
  MdOutlineDone,
  MdDelete,
  MdClose,
  MdSave,
} from "react-icons/md";

export default function Button({
  type = "button",
  text = "Submit",
  loading = false,
  loadingText = "Saving...",
  onClick,
  disabled = false,
  variant = "primary",
  className = "",
}) {
  const variants = {
    primary: {
      btn: loading
        ? "bg-gradient-to-br from-sky-400 to-sky-500 cursor-not-allowed text-white"
        : "bg-gradient-to-br from-sky-400 to-sky-500 active:scale-[0.98] shadow-md hover:shadow-lg text-white",
      iconBg: "bg-white/20",
      icon: <MdOutlineDone className="text-white text-xs" />,
    },

    cancel: {
      btn: "bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-700 shadow-sm",
      iconBg: "bg-slate-200",
      icon: <MdClose className="text-slate-500 text-xs" />,
    },

    delete: {
      btn: "bg-red-500 hover:bg-red-600 text-white shadow-md",
      iconBg: "bg-white/20",
      icon: <MdDelete className="text-white text-xs" />,
    },

    save: {
      btn: "bg-green-500 hover:bg-green-600 text-white shadow-md",
      iconBg: "bg-white/20",
      icon: <MdSave className="text-white text-xs" />,
    },
  };

  const current = variants[variant];

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading || disabled}
      className={`flex-1 flex items-center justify-center gap-2 rounded-2xl py-2.5 text-sm font-bold transition-all ${current.btn} ${className}`}
    >
      {loading ? (
        <>
          <svg
            className="animate-spin h-4 w-4 text-white"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>

          {loadingText}
        </>
      ) : (
        <>
          <span
            className={`w-5 h-5 rounded-full flex items-center justify-center ${current.iconBg}`}
          >
            {current.icon}
          </span>

          {text}
        </>
      )}
    </button>
  );
}