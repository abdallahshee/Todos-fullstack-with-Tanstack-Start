import { createTodo } from "@/functions/post.functions";
import { PostDTO } from "@/schemas/post.schema";
import { useAuthStore } from "@/stores.ts/authStore";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, redirect, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Formik, Form, Field } from "formik";
import { Button } from "primereact/button";

  //  const item = localStorage.getItem("auth");
export const Route = createFileRoute("/todos/create")({
beforeLoad() {
  const isAuthenticated=useAuthStore.getState().isAuthenticated
  if(!isAuthenticated){
    console.log('Not Authenticated');
    throw redirect({to:"/account"})
  }
},
  component: RouteComponent,
});
const initialValues: PostDTO = {
  title: "",

};
function RouteComponent() {
  const createTodoFn = useServerFn(createTodo);
  const router=useRouter()
  const m = useMutation({
    mutationFn: (values: PostDTO) => {
      return createTodoFn({
        data: {
          title: values.title,
       
        },
      });
    },
    onSuccess: (result) => {
      console.log("RESULT FROM SERVER:", result);
      router.navigate({to:"/todos"})

    },
    onError:(err)=>{
      console.log("Error encountered");
    }
  });
  const handleSubmit = (values: PostDTO) => {
    m.mutate(values);
  };
  return (
    <div>
      <h1>Create Todo</h1>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({}) => (
          <Form>
            <div>
              <label>Title :</label>
              <Field name="title" />
            </div>

            <div>
              <Button label="create" type="submit" />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
