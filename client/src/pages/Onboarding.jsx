import { useFormik } from "formik";
import React from "react";
import NavBar from "../components/NavBar";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Input from "../components/ui/input";
import { cn } from "../lib/utils";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import RadioGroup from "../components/ui/radio-group";
import Checkbox from "../components/ui/checkbox";

const Onboarding = ({ user, showAuth, isEditingProfile, setUser }) => {
  const navigate = useNavigate();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstname: user.first_name || "",
      dob_day: user.dob_day || "",
      dob_month: user.dob_month || "",
      dob_year: user.dob_year || "",
      show_gender: user.show_gender || false,
      gender_identity: user.gender_identity || "",
      show_sexual_orientation: user.show_sexual_orientation || false,
      sexual_orientation: user.sexual_orientation || "",
      gender_interest: user.gender_interest || "",
      image_url: user.image_url || "",
      bio: user.bio || "",
    },
    validationSchema: Yup.object({
      firstname: Yup.string().required("Name is required"),
      dob_day: Yup.number()
        .min(1, "Day must be greater than 1")
        .max(31, "Day must be smaller than 31")
        .required("Day is required"),
      dob_month: Yup.number()
        .min(1, "Day must be greater than 1")
        .max(12, "Month must be smaller than 12")
        .required("Month is required"),
      dob_year: Yup.number()
        .min(1900, "Day must be greater than 1900")
        .max(2020, "Day must be smaller than 2020")
        .required("Year is required"),
      show_gender: Yup.boolean().required("Show gender is required"),
      gender_identity: Yup.string().required("Gender identity is required"),
      show_sexual_orientation: Yup.boolean().required(
        "Show sexual orientation is required"
      ),
      sexual_orientation: Yup.string().required(
        "Sexual orientation is required"
      ),
      gender_interest: Yup.string().required("Gender interest is required"),
      image_url: Yup.string()
        .url("The filed must contain a valid URL")
        .required("Photo url is required"),
      bio: Yup.string().required("The field is required"),
    }),
    onSubmit: () => handleSubmit(),
  });

  function handleSubmit() {
    fetch(`/api/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formik.values),
    }).then((r) => {
      if (r.ok) {
        if (isEditingProfile) {
          r.json().then((data) => {
            setUser(data);
            navigate("/account");
          });
        } else {
          r.json().then((data) => {
            setUser(data);
            navigate("/dashboard");
          });
        }
      }
    });
  }
  return (
    <>
      <NavBar user={user} color={true} showAuth={showAuth} setUser={setUser} />
      <div className="border-t-2 border-t-[#d5d5d5] pt-14">
        <h2 className="text-center text-3xl font-bold mt-4">
          {isEditingProfile ? "EDIT PROFILE" : "CREATE ACCOUNT"}
        </h2>
        <form onSubmit={formik.handleSubmit} className="flex justify-center">
          <section className="flex flex-col mx-12 p-5 w-1/3 text-left">
            <Input
              type="url"
              labelText="Profile Photo"
              placeholder="Image Url..."
              name="image_url"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.image_url}
              errorText={formik.errors.image_url}
              touched={formik.touched.image_url}
              className="w-[85%]"
            />
            {formik.values.image_url && (
              <img
                className="profile-photo"
                src={formik.values.image_url}
                alt=""
              />
            )}
          </section>
          <section className="flex flex-col mx-12 p-5 w-1/3 text-left space-y-4">
            <Input
              type="text"
              labelText="First Name"
              placeholder="First name..."
              name="firstname"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstname}
              errorText={formik.errors.firstname}
              touched={formik.touched.firstname}
              className=""
            />
            <label className="block text-sm font-medium leading-6">
              Date of Birth
            </label>
            <div className="flex gap-x-4">
              <Input
                type="number"
                labelText=""
                placeholder="DD"
                name="dob_day"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.dob_day}
                errorText=""
                errors={false}
                touched={formik.touched.dob_day}
                className="w-1/4"
              />
              <Input
                type="number"
                labelText=""
                placeholder="MM"
                name="dob_month"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.dob_month}
                errorText=""
                errors={false}
                touched={formik.touched.dob_month}
                className="w-1/4"
              />
              <Input
                type="number"
                labelText=""
                placeholder="YYYY"
                name="dob_year"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.dob_year}
                errorText=""
                errors={false}
                touched={formik.touched.dob_year}
                className="w-1/2"
              />
              {formik.touched.dob_day &&
                formik.touched.dob_month &&
                formik.touched.dob_year &&
                (formik.errors.dob_day ||
                  formik.errors.dob_month ||
                  formik.errors.dob_year) && (
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <ExclamationTriangleIcon
                      className="h-5 w-5 text-red-500"
                      aria-hidden="true"
                    />
                  </div>
                )}
            </div>
            {formik.touched.dob_day && formik.errors.dob_day && (
              <p className="mt-2 text-sm text-red-600">
                {formik.errors.dob_day}
              </p>
            )}
            {formik.touched.dob_month && formik.errors.dob_month && (
              <p className="mt-2 text-sm text-red-600">
                {formik.errors.dob_month}
              </p>
            )}
            {formik.touched.dob_year && formik.errors.dob_year && (
              <p className="mt-2 text-sm text-red-600">
                {formik.errors.dob_year}
              </p>
            )}

            <RadioGroup
              labelText="Gender"
              placeholder="Select your gender"
              options={[
                {
                  name: "gender_identity",
                  value: "man",
                  id: "man-gender-identity",
                  labelText: "Male",
                  checked: formik.values.gender_identity === "man",
                },
                {
                  name: "gender_identity",
                  value: "woman",
                  id: "woman-gender-identity",
                  labelText: "Female",
                  checked: formik.values.gender_identity === "woman",
                },
                {
                  name: "gender_identity",
                  value: "non-binary",
                  id: "non-binary-gender-identity",
                  labelText: "Non-binary",
                  checked: formik.values.gender_identity === "non-binary",
                },
              ]}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              touched={formik.touched.gender_identity}
              errors={formik.errors.gender_identity}
            />
            <Checkbox
              name="show_gender"
              id="show-gender"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              checked={formik.values.show_gender}
              labelText={"Show gender on my profile"}
              touched={formik.touched.show_gender}
              errors={formik.errors.show_gender}
            />

            <RadioGroup
              labelText="Sexual Orientation"
              placeholder="Select your sexual orientation"
              options={[
                {
                  name: "sexual_orientation",
                  value: "straight",
                  id: "straight-sexual-orientation",
                  labelText: "Straight",
                  checked: formik.values.sexual_orientation === "straight",
                },
                {
                  name: "sexual_orientation",
                  value: "gay",
                  id: "gay-sexual-orientation",
                  labelText: "Gay",
                  checked: formik.values.sexual_orientation === "gay",
                },
                {
                  name: "sexual_orientation",
                  value: "lesbian",
                  id: "lesbian-sexual-orientation",
                  labelText: "Lesbian",
                  checked: formik.values.sexual_orientation === "lesbian",
                },
                {
                  name: "sexual_orientation",
                  value: "bisexual",
                  id: "bisexual-sexual-orientation",
                  labelText: "Bisexual",
                  checked: formik.values.sexual_orientation === "bisexual",
                },
                {
                  name: "sexual_orientation",
                  value: "asexual",
                  id: "asexual-sexual-orientation",
                  labelText: "Asexual",
                  checked: formik.values.sexual_orientation === "asexual",
                },
                {
                  name: "sexual_orientation",
                  value: "demisexual",
                  id: "demisexual-sexual-orientation",
                  labelText: "Demisexual",
                  checked: formik.values.sexual_orientation === "demisexual",
                },
                {
                  name: "sexual_orientation",
                  value: "pansexual",
                  id: "pansexual-sexual-orientation",
                  labelText: "Pansexual",
                  checked: formik.values.sexual_orientation === "pansexual",
                },
                {
                  name: "sexual_orientation",
                  value: "queer",
                  id: "queer-sexual-orientation",
                  labelText: "Queer",
                  checked: formik.values.sexual_orientation === "queer",
                },
                {
                  name: "sexual_orientation",
                  value: "questioning",
                  id: "questioning-sexual-orientation",
                  labelText: "Questioning",
                  checked: formik.values.sexual_orientation === "questioning",
                },
              ]}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              touched={formik.touched.sexual_orientation}
              errors={formik.errors.sexual_orientation}
            />

            <Checkbox
              name="show_sexual_orientation"
              id="show-sexual-orientation"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              checked={formik.values.show_sexual_orientation}
              labelText={"Show sexual orientation on my profile"}
              touched={formik.touched.show_sexual_orientation}
              errors={formik.errors.show_sexual_orientation}
            />

            <RadioGroup
              labelText="Show Me"
              placeholder="Select your dating prefrence"
              options={[
                {
                  name: "gender_interest",
                  value: "man",
                  id: "man-gender-interest",
                  labelText: "Male",
                  checked: formik.values.gender_interest === "man",
                },
                {
                  name: "gender_interest",
                  value: "woman",
                  id: "woman-gender-interest",
                  labelText: "Female",
                  checked: formik.values.gender_interest === "woman",
                },
                {
                  name: "gender_interest",
                  value: "non-binary",
                  id: "non-binary-gender-interest",
                  labelText: "Non-binary",
                  checked: formik.values.gender_interest === "non-binary",
                },
                {
                  name: "gender_interest",
                  value: "everyone",
                  id: "everyone-gender-interest",
                  labelText: "Everyone",
                  checked: formik.values.gender_interest === "everyone",
                },
              ]}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              touched={formik.touched.gender_interest}
              errors={formik.errors.gender_interest}
            />

            <div className="">
              <label
                htmlFor="bio"
                className="block text-sm font-medium leading-6"
              >
                About Me
              </label>
              <div className="relative mt-2 rounded-md shadow-sm">
                <textarea
                  className={cn(
                    formik.errors.bio
                      ? "text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-red-500"
                      : "",
                    "bg-transparent block w-full rounded-md border py-1.5 pl-3 pr-10 focus:outline-none focus:border-[#20abc6] focus:box-shadow-[#20abc6]  sm:text-sm sm:leading-6"
                  )}
                  id="bio"
                  name="bio"
                  type="text"
                  rows={6}
                  placeholder="Something bio you..."
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.bio}
                />
                {formik.touched.bio && formik.errors.bio && (
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <ExclamationTriangleIcon
                      className="h-5 w-5 text-red-500"
                      aria-hidden="true"
                    />
                  </div>
                )}
              </div>
              {formik.touched.bio && formik.errors.bio && (
                <p className="mt-2 text-sm text-red-600" id={`bio-error`}>
                  {formik.errors.bio}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="py-1.5 bg-[#f7f907] text-black font-bold text-base border-2 border-[#ccc] rounded-md border-box focus:outline-none focus:border-[#20abc6] focus:box-shadow-[#20abc6]"
            >
              Submit
            </button>
          </section>
        </form>
      </div>
    </>
  );
};
export default Onboarding;
