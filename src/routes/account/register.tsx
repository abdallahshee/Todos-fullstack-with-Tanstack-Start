import { registerUser } from "@/functions/account.functions";
import { UserDTO, UserSchema } from "@/schemas/user.schema";
import { useMutation } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ErrorMessage, Formik } from "formik";
import { Button, Form } from "react-bootstrap";

export const Route = createFileRoute("/account/register")({
  component: RouteComponent,
});
const initialValues: UserDTO = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
};
function RouteComponent() {
  const userCreateFun = useServerFn(registerUser);
  const router = useRouter();
  const m = useMutation({
    mutationFn: (values: UserDTO) => {
      return userCreateFun({ data: values });
    },
    onSuccess: (response) => {
      router.navigate({ to: "/account" });
    },
  });
  const handleRegister = (values: UserDTO) => {
    console.log(values);
    m.mutate(values);
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleRegister}
      validationSchema={UserSchema}
    >
      {({
        handleBlur,
        handleSubmit,
        handleChange,
        touched,
        errors,
        values,
      }) => (
        <Form className="my-2" noValidate onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Firstname</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={!!errors.firstName && touched.firstName}
            />
            <ErrorMessage name="firstName">
              {(msg) => (
                <Form.Control.Feedback type="invalid">
                  {msg}
                </Form.Control.Feedback>
              )}
            </ErrorMessage>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Lastname</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={!!errors.lastName && touched.lastName}
            />
            <ErrorMessage name="lastName">
              {(msg) => (
                <Form.Control.Feedback type="invalid">
                  {msg}
                </Form.Control.Feedback>
              )}
            </ErrorMessage>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={!!errors.email && touched.email}
            />
            <ErrorMessage name="email">
              {(msg) => (
                <Form.Control.Feedback type="invalid">
                  {msg}
                </Form.Control.Feedback>
              )}
            </ErrorMessage>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={!!errors.password && touched.password}
            />
            <ErrorMessage name="password">
              {(msg) => (
                <Form.Control.Feedback type="invalid">
                  {msg}
                </Form.Control.Feedback>
              )}
            </ErrorMessage>
          </Form.Group>
          <Form.Group>
            <Button type="submit" className="w-100" disabled={m.isPending}>
              {m.isPending ? "Registering ..." : "Register"}
            </Button>
          </Form.Group>
          <Form.Group className="mt-3">
            <h5>
              Already have an account <Link to="/account"> Click Here</Link> to
              login
            </h5>
          </Form.Group>
        </Form>
      )}
    </Formik>
  );
}
