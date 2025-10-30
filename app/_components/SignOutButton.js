import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";

function SignOutButton() {
  return (
    <button className="py-3 px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex-col md:flex-row flex items-center gap-4 font-semibold text-primary-200 w-full">
      <ArrowRightOnRectangleIcon className="h-5 w-5 text-primary-600 animate-pulse" />
      <span className="hidden md:inline-block">Sign out</span>
    </button>
  );
}

export default SignOutButton;
