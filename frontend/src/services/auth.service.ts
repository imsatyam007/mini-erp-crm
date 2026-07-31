import axiosInstance from "@/api/axios";
import type {
  LoginRequest,
  LoginResponse,
  User,
} from "@/types/auth";

class AuthService {
  async login(payload: LoginRequest): Promise<LoginResponse> {
    const { data } = await axiosInstance.post<LoginResponse>(
      "/auth/login",
      payload
    );

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    return data;
  }

  logout(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  getToken(): string | null {
    return localStorage.getItem("token");
  }

  getCurrentUser(): User | null {
    const user = localStorage.getItem("user");

    return user ? (JSON.parse(user) as User) : null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}

export default new AuthService();