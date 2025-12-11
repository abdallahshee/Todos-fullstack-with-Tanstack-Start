import { createTodo } from "@/functions/todos.functions";
import { TodoDTO } from "@/schemas/todo.schema";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Formik, Form, Field } from "formik";
import { Button } from "primereact/button";

  //  const item = localStorage.getItem("auth");
export const Route = createFileRoute("/todos/create")({
beforeLoad(ctx) {
  if(!ctx.context.isAuthenticated){
    console.log('Not Authenticated');
    throw redirect({to:"/account"})
  }
},
  component: RouteComponent,
});
const initialValues: TodoDTO = {
  title: "",
  userId: "",
};
function RouteComponent() {
  const createTodoFn = useServerFn(createTodo);
  const m = useMutation({
    mutationFn: (values: TodoDTO) => {
      return createTodoFn({
        data: {
          title: values.title,
          userId: values.userId,
        },
      });
    },
    onSuccess: (result) => {
      console.log("RESULT FROM SERVER:", result);
    },
    onError:(err)=>{
      console.log("Error encountered");
    }
  });
  const handleSubmit = (values: TodoDTO) => {
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
              <label>User iD :</label>
              <Field name="userId" />
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
