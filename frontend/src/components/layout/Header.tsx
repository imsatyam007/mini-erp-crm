export default function Header() {
  return (
    <header
      className="fixed top-0 left-64 right-0 z-50 flex h-16 items-center justify-between border-b bg-white px-6"
      style={{ borderColor: "var(--color-border)" }}
    >
      <div>
        <h1
          className="text-xl font-semibold"
          style={{ color: "var(--color-primary)" }}
        >
          Mini ERP + CRM
        </h1>
      </div>

      <div className="text-sm text-gray-500">
        Welcome, Admin
      </div>
    </header>
  );
}