import { logoutUser } from "@/functions/user.functions";
import { useAuthStore } from "@/stores.ts/authStore";
import { Link, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Button } from "primereact/button";

const Header = () => {
  const router=useRouter()
  const logoutFunc = useServerFn(logoutUser);
  const handleClick = () => {
    logoutFunc().then(()=>{
  useAuthStore.setState({isAuthenticated:false,user:null})
      router.navigate({to:"/account"})
    })
  
  };
  return (
    <div>
      <Button
        label="logout"
        size="large"
        onClick={handleClick}
        className="w-2/5 bg-blue-600"
      />
      <div className="grid grid-cols-3 w-3/5">
        <Link to="/account">LOGIN</Link>
        <Link to="/account/register">REGISTER</Link>
        <Link to="/todos/create">NEW TODO</Link>
   
      </div>
    </div>
  );
};

export default Header;
