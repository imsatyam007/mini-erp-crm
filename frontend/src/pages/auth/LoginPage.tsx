import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAuth } from "@/hooks/useAuth";

const loginSchema = z.object({
  email: z.email("Please enter a valid email."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setLoading(true);
      setServerError("");

      const response = await login(data);

switch (response.user.role) {
  case "ADMIN":
    navigate("/");
    break;

  case "SALES":
    navigate("/customers");
    break;

  case "WAREHOUSE":
    navigate("/inventory");
    break;

  case "ACCOUNTS":
    navigate("/challans");
    break;

  default:
    navigate("/");
}
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setServerError(
          error.response?.data?.message ??
            "Unable to login. Please try again."
        );
      } else {
        setServerError("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

 return (
  <div className="min-h-screen flex items-center justify-center bg-background px-4">
    <div
      className="bg-surface border border-border rounded-xl p-8"
      style={{
        width: "420px",
        boxShadow: "var(--shadow-card)",
      }}
    >
      <h1
        className="text-text font-bold text-center"
        style={{
          fontSize: "2.25rem",
          marginBottom: "8px",
        }}
      >
        Mini ERP CRM
      </h1>

      <p
        className="text-text-secondary text-center"
        style={{ marginBottom: "32px" }}
      >
        Sign in to continue
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ marginBottom: "20px" }}>
          <label
            className="text-text"
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: 600,
            }}
          >
            Email
          </label>

          <input
            type="email"
            {...register("email")}
            placeholder="Enter your email"
            className="bg-background border border-border text-text"
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "var(--radius-md)",
              boxSizing: "border-box",
              outline: "none",
            }}
          />

          {errors.email && (
            <p
              className="text-danger"
              style={{ marginTop: "6px" }}
            >
              {errors.email.message}
            </p>
          )}
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label
            className="text-text"
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: 600,
            }}
          >
            Password
          </label>

          <input
            type="password"
            {...register("password")}
            placeholder="Enter your password"
            className="bg-background border border-border text-text"
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "var(--radius-md)",
              boxSizing: "border-box",
              outline: "none",
            }}
          />

          {errors.password && (
            <p
              className="text-danger"
              style={{ marginTop: "6px" }}
            >
              {errors.password.message}
            </p>
          )}
        </div>

        {serverError && (
          <div
            className="bg-danger-bg text-danger"
            style={{
              padding: "10px",
              borderRadius: "var(--radius-md)",
              marginBottom: "20px",
            }}
          >
            {serverError}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-primary text-sidebar-text"
          style={{
            width: "100%",
            padding: "12px",
            border: "none",
            borderRadius: "var(--radius-md)",
            cursor: "pointer",
            fontWeight: 600,
            transition: "var(--transition-fast)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--color-primary-hover)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "var(--color-primary)";
          }}
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>
      </form>
    </div>
  </div>
);
}