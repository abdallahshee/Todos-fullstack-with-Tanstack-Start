import { sendPasswordReset } from "@/functions/account.functions"; // your server fn
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Button, Form } from "react-bootstrap";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "@tanstack/react-router";

// Yup schema for email validation
const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

export const Route = createFileRoute("/account/reset")({
  component: RouteComponent,
});

const initialValues = { email: "" };

function RouteComponent() {
  const router = useRouter();
  // const forgotPasswordFunc = useServerFn(sendPasswordReset);

  // const mutation = useMutation({
  //   mutationFn: (values: { email: string }) => forgotPasswordFunc({ data: values }),
  //   onSuccess: () => {
  //     alert("If this email exists, a reset link has been sent.");
  //     router.navigate({ to: "/account" });
  //   },
  // });

  const handleSubmit = (values: { email: string }) => {
    // mutation.mutate(values);
    console.log(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ForgotPasswordSchema}
      onSubmit={handleSubmit}
    >
      {({ values, handleChange, handleBlur, handleSubmit, touched, errors }) => (
        <Form className="my-4" noValidate onSubmit={handleSubmit}>
          <h2 className="mb-4">Forgot Password</h2>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={!!errors.email && touched.email}
              placeholder="Enter your registered email"
            />
            <ErrorMessage name="email">
              {(msg) => <Form.Control.Feedback type="invalid">{msg}</Form.Control.Feedback>}
            </ErrorMessage>
          </Form.Group>

          <Form.Group className="mb-3">
            {/* <Button type="submit" className="w-100" disabled={mutation.isPending}>
              {mutation.isPending ? "Sending..." : "Send Reset Link"}
            </Button> */}

                <Button type="submit" className="w-100" >
             Send otp
            </Button>
          </Form.Group>

          <Form.Group className="mt-3 text-center">
            <h5>
              Remembered your password? <Link to="/account">Login here</Link>
            </h5>
          </Form.Group>
        </Form>
      )}
    </Formik>
  );
}
