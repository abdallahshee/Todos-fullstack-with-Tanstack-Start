import { loginUser } from "@/functions/user.functions";
import { UserDTO } from "@/schemas/user.schema";
import { useAuthStore } from "@/stores.ts/authStore";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Field, Form, Formik } from "formik";
import { Button } from "primereact/button";

export const Route = createFileRoute("/account/")({
  component: RouteComponent,
});

const initialValues: UserDTO = {
  email: "",
  password: "",
};
function RouteComponent() {
  const userLoginFunc = useServerFn(loginUser);
  const router=useRouter()
  const m = useMutation({
    mutationFn: (values: UserDTO) => userLoginFunc({ data: values }),
    onSuccess: async (res) => {
      if (!res) return; // guard clause

      const data = await res.json();
      // console.log("USER IS HERE "+JSON.stringify(data.user));
      useAuthStore.setState({
        user: data.user,
        isAuthenticated: true,
      });
      router.navigate({to:'/todos/create'})
    },
  });
  const handleSubmit = (values: UserDTO) => {
    // console.log(values);
    m.mutate(values);
  };
  return (
    <div>
      <div>
        <h1>Login User</h1>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({}) => (
            <Form>
              <div>
                <label>Email :</label>
                <Field name="email" />
              </div>
              <div>
                <label>Password:</label>
                <Field name="password" />
              </div>
              <div>
                <Button label="Login" type="submit" />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
