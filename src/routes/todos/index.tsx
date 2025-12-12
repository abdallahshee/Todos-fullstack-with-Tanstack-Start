import { getMyTodos } from "@/functions/post.functions";
import { Post } from "@/models/post.model";
import { useAuthStore } from "@/stores.ts/authStore";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";

export const Route = createFileRoute("/todos/")({
  beforeLoad:()=>{
    const isAuth=useAuthStore.getState().isAuthenticated

  },
  component: RouteComponent,
  
});

function RouteComponent() {

const getMyTodosFunc = useServerFn(getMyTodos);

const { data } = useQuery({
  queryKey: ["myTodos"],
  queryFn: () => getMyTodosFunc()
});
  return (
    <div>
      <h2>Todos</h2>
      <div>
        {data && data.map((item)=>(
        <div key={item._id}>
            {/* <h4>{item.title}</h4> */}
             <h4>{item.createdBy}</h4>
             ..............
        </div>
        ))}
      </div>
    </div>
  );
}
