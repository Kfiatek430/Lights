import { LoginForm } from "./components/LoginForm";

export default function Page() {
  return (
    <div className="flex flex-1 min-h-0 w-full items-center justify-center p-5">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
