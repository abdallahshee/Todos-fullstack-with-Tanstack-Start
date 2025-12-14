import { getPostById } from '@/functions/post.functions'
import { createFileRoute } from '@tanstack/react-router'


export const Route = createFileRoute('/posts/$postId/details')({
  component: RouteComponent,
loader: async ({ params, context }) => {
  const post = await getPostById({data:{postId: params.postId} });

  context.queryClient.setQueryData(["post", params.postId], post);

  return post;
}
})

function RouteComponent() {


  return <div>Hello "/posts/$postId"!</div>
}
