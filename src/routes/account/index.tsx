import { loginUser} from "@/functions/account.functions";
import { UserDTO } from "@/schemas/user.schema";
import { useMutation } from "@tanstack/react-query";
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
  const userCreateFun = useServerFn(loginUser);
 
  const m = useMutation({
    mutationFn: (values: UserDTO) => {
      return userCreateFun({ data: values });
    },
    onSuccess: (response) => {
      console.log(response);
    },
  });
  const handleSubmit = (values: UserDTO) => {
    console.log(values);
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
                <Button label="register" type="submit" />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
