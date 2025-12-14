import { loginUser } from "@/functions/account.functions";
import { LoginDTO, LoginSchema } from "@/schemas/user.schema";
import { useAuthStore } from "@/stores.ts/authStore";
import { useMutation } from "@tanstack/react-query";
import { Link, useRouter } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Button, Form, InputGroup } from "react-bootstrap";
import { Formik, ErrorMessage } from "formik";
import { useState } from "react";
import { Eye, EyeSlash } from "react-bootstrap-icons";

export const Route = createFileRoute("/account/")({
  component: RouteComponent,
});

const initialValues: LoginDTO = {
  email: "",
  password: "",
};
function RouteComponent() {
  const userLoginFunc = useServerFn(loginUser);
  const router = useRouter();
  const m = useMutation({
    mutationFn: (values: LoginDTO) => userLoginFunc({ data: values }),
    onSuccess: async (res) => {
      if (!res) return; // guard clause

      const data = await res.json();
      // console.log("USER IS HERE "+JSON.stringify(data.user));
      useAuthStore.setState({
        user: data.user,
        isAuthenticated: true,
      });
      router.navigate({ to: "/posts/create" });
    },
  });
  const handleLogin = (values: LoginDTO) => {
    console.log(values);
    m.mutate(values);
  };
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <Formik
      initialValues={{ ...initialValues, rememberMe: false }}
      validationSchema={LoginSchema}
      onSubmit={handleLogin}
    >
      {({
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        touched,
        errors,
      }) => (
        <Form className="my-2" noValidate onSubmit={handleSubmit}>
          {/* EMAIL */}
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

          {/* PASSWORD */}
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <InputGroup>
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!errors.password && touched.password}
              />
              <Button
                variant="outline-secondary"
                onClick={() => setShowPassword((prev) => !prev)}
                type="button"
              >
                {showPassword ? <EyeSlash /> : <Eye />}
              </Button>
              <ErrorMessage name="password">
                {(msg) => (
                  <Form.Control.Feedback type="invalid">
                    {msg}
                  </Form.Control.Feedback>
                )}
              </ErrorMessage>
            </InputGroup>
          </Form.Group>

          {/* REMEMBER ME & FORGOT PASSWORD */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <Form.Check
              type="checkbox"
              label="Remember Me"
              name="rememberMe"
              checked={values.rememberMe}
              onChange={handleChange}
            />
            <Link to="/account/reset">Forgot Password?</Link>
          </div>

          {/* SUBMIT BUTTON */}
          <Form.Group className="mb-3">
            <Button type="submit" className="w-100" disabled={m.isPending}>
              {m.isPending ? "Logging in..." : "Login"}
            </Button>
          </Form.Group>

          {/* REGISTER LINK */}
          <Form.Group className="mt-3 text-center">
            <h5>
              Don't have an account?{" "}
              <Link to="/account/register">Click Here</Link> to register
            </h5>
          </Form.Group>
        </Form>
      )}
    </Formik>
  );
}
