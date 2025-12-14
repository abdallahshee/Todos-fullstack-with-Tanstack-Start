import { getMyPosts } from "@/functions/post.functions";
import { searchSchema } from "@/schemas/post.schema";
import { yupSearchValidator } from "@/schemas/validation.schemas";
import { useAuthStore } from "@/stores.ts/authStore";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";

type PostsSearch = {
  status?: string;
};
export const Route = createFileRoute("/posts/")({
  // searchSchema, // optional if you want auto-validation
  // validateSearch: (search: unknown) =>
  //   yupSearchValidator(searchSchema, search, {}),

  // loader: async ({ router }) => {
  //   // You can access search via `router.currentRoute.search` or `router.currentRoute.search?.status`
  //   const search = router.currentRoute.search as PostsSearch;

  //   return getMyPosts({
  //     data: { status: search?.status },
  //   });
  // },

  component: RouteComponent,
});
function RouteComponent() {
 const data=Route.useLoaderData()
  return (
    <div>
      <h2>My Posts</h2>
      {/* <div>
        {data &&
          data.map((item) => (
            <div key={item._id}>
         
              <h4>{item.createdBy}</h4>
              ..............
            </div>
          ))}
      </div> */}
    </div>
  );
}
