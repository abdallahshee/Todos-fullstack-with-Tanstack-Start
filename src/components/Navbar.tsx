import { logoutUser } from "@/functions/account.functions";
import { useAuthStore } from "@/stores.ts/authStore";
import { Link, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";

export const Header = () => {
  const isAuthenticated = useAuthStore.getState().isAuthenticated;
  const currentUser = useAuthStore.getState().user;
  const router = useRouter();
  const logoutFunc = useServerFn(logoutUser);
  const handleClick = () => {
    logoutFunc().then(() => {
      useAuthStore.setState({ isAuthenticated: false, user: null });
      router.navigate({ to: "/account" });
    });
  };
  return (
    <nav className="flex justify-between p-4 bg-gray-200">
      <div className="flex gap-4">
        <Link to="/account/home">Home</Link>
        <Link to="/posts">All Posts</Link>
        <Link to="/about">About</Link>
      </div>
      <div className="flex gap-4">
        {isAuthenticated ? (
          <>
            <button
              onClick={handleClick}
              className="text-blue-600 hover:text-blue-800"
            >
              Logout
            </button>
            {currentUser && (
              <img src={currentUser?.url} className="img-fluid"style={{width:40,height:40}}/>

            )}
          </>
        ) : (
          <span className="flex gap-4">
            <Link to="/account">Login</Link>
            <Link to="/account/register">Register</Link>
          </span>
        )}
      </div>
    </nav>
  );
};
