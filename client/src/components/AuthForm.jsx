import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import Input from "./ui/input";

const AuthForm = ({ setShowAuth, isSignUp, setUser, setIsSignUp }) => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      password2: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email address is not valid")
        .required("Email is required"),
      password: Yup.string().min(6, "Password must be at least 6 characters"),
      password2: Yup.string().when("password", {
        is: (val) => (val && val.length > 0 ? true : false),
        then: () =>
          Yup.string().oneOf([Yup.ref("password")], "Passwords need to match"),
      }),
    }),
    onSubmit: () => handleSubmit(),
  });

  function handleSubmit() {
    if (isSignUp) {
      fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formik.values.email.toLocaleLowerCase(),
          password: formik.values.password,
          password_confirmation: formik.values.password2,
        }),
      }).then((r) => {
        if (r.ok) {
          r.json().then((data) => {
            setUser(data);
            navigate("/onboarding");
          });
        }
      });
    } else {
      fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formik.values.email.toLocaleLowerCase(),
          password: formik.values.password,
        }),
      }).then((r) => {
        if (r.ok) {
          r.json().then((data) => {
            setUser(data);
            navigate("/dashboard");
          });
        } else {
          r.json().then((errors) =>
            formik.setErrors({ password: errors.errors })
          );
        }
      });
    }
  }

  return (
    <div className="absolute left-0 right-0 top-[50px] mx-auto max-w-[500px] h-[600px] rounded-xl border bg-[#0c0a09]">
      <div className="flex w-full justify-end pr-4 pt-4">
        <button
          className=" hover:text-black"
          onClick={() => setShowAuth(false)}
        >
          <CrossCircledIcon className="text-right h-6 w-6" />
        </button>
      </div>
      <div className="flex flex-col space-y-1.5 p-6 text-center">
        <h3 className="font-semibold leading-none tracking-tight text-2xl">
          {isSignUp ? "CREATE ACCOUNT" : "LOG IN"}
        </h3>
      </div>
      <div className="p-6 pt-0">
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col items-center space-y-4"
        >
          <Input
            type="email"
            labelText="Email"
            placeholder="Enter your email address..."
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            errorText={formik.errors.email}
            errors={formik.errors.email}
            touched={formik.touched.email}
            className="w-[85%]"
          />

          <Input
            type="password"
            labelText="Password"
            placeholder="Enter your password..."
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            errorText={formik.errors.password}
            errors={formik.errors.password}
            touched={formik.touched.password}
            className="w-[85%]"
          />

          {isSignUp && (
            <Input
              type="password"
              labelText="Confirm Password"
              placeholder="Confirm your password..."
              name="password2"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password2}
              errorText={formik.errors.password2}
              errors={formik.errors.password2}
              touched={formik.touched.password2}
              className="w-[85%]"
            />
          )}
          <div className="w-full pt-4 flex justify-center">
            <button
              type="submit"
              className="w-[85%]  py-1.5 bg-[#f7f907] text-black font-bold text-base border-2 border-[#ccc] rounded-md border-box focus:outline-none focus:border-[#20abc6] focus:box-shadow-[#20abc6]"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <div className="flex justify-around">
        <p onClick={() => setIsSignUp((isSignUp) => !isSignUp)}>
          {isSignUp ? "Already have an account?" : "Don't have an account?"}
        </p>
        {/* <p onClick={() => setIsForgettingPassword(true)}>
          Forget your password?
        </p> */}
      </div>
    </div>
  );
};
export default AuthForm;
