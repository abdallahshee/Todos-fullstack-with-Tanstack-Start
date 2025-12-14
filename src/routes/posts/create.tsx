import { createPost } from "@/functions/post.functions";
import { PostDTO, PostSchema } from "@/schemas/post.schema";
import { useAuthStore } from "@/stores.ts/authStore";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, redirect, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Formik, ErrorMessage } from "formik";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

//  const item = localStorage.getItem("auth");
export const Route = createFileRoute("/posts/create")({
  // beforeLoad() {
  //   const isAuthenticated = useAuthStore.getState().isAuthenticated;
  //   if (!isAuthenticated) {

  //     throw redirect({ to: "/account" });
  //   }
  // },
  component: RouteComponent,
});
const initialValues: PostDTO = {
  title: "",
  description: "",
};
function RouteComponent() {
  const createTodoFn = useServerFn(createPost);
  const router = useRouter();
  const m = useMutation({
    mutationFn: (values: PostDTO) => {
      return createTodoFn({
        data: {
          title: values.title,
          description: values.description,
        },
      });
    },
    onSuccess: (result) => {
      // console.log("RESULT FROM SERVER:", result);
      router.navigate({ to: "/posts" });
    },
    onError: (err) => {
      console.log("Error encountered");
    },
  });
  const handleCreatePost = (values: PostDTO) => {
    m.mutate(values);
  };
  return (
    <div>
      <h1>Create Post</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={handleCreatePost}
        validationSchema={PostSchema}
      >
        {({
          handleBlur,
          handleSubmit,
          handleChange,
          values,
          errors,
          touched,
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!errors.title && touched.title}
              />
              <ErrorMessage name="title">
                {(msg) => (
                  <Form.Control.Feedback type="invalid">
                    {msg}
                  </Form.Control.Feedback>
                )}
              </ErrorMessage>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
               as="textarea" rows={3}
                name="description"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!errors.description && touched.description}
              />
              <ErrorMessage name="description">
                {(msg) => (
                  <Form.Control.Feedback type="invalid">
                    {msg}
                  </Form.Control.Feedback>
                )}
              </ErrorMessage>
            </Form.Group>

            <Form.Group>
              <Button type="submit" className="w-100" disabled={m.isPending}>
                {m.isPending ? "Creating..." : "Create"}
              </Button>
            </Form.Group>
          </Form>
        )}
      </Formik>
    </div>
  );
}
