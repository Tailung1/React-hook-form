import "./App.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

function App() {
  interface Inputs {
    name: string;
    lastName: string;
    Email: string;
  }

  const schema = yup.object({
    name: yup.string().required("Name must not be empty"),

    lastName: yup
      .string()
      .required("LastName must not be empty")
      .min(5, "Name must not be more than 5 charachters")
      .test(
        "no-spaces",
        "LastName must not include space charachter",
        (value) => !value.includes(" ")
      ),

    Email: yup.string().email().required("Email must not be empty"),
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data); // consols only when all input are valid
    setValue("name", "done")
  };

  //   const name = watch("name"); // colsols only name property
  //   const wholeObj = watch(); // consols whole obj dynamically
  //   console.log(name);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Name</label>
        <input type="text" {...register("name")} id="name" placeholder="Name" />
        {errors.name && <p>{errors.name.message}</p>}

        <label htmlFor="LastName">LastName</label>
        <input type="text " {...register("lastName")} id="LastName" placeholder="LastName" />
        {errors.lastName && <p>{errors.lastName.message}</p>}

        <label htmlFor="Email">Email</label>
        <input type="text " {...register("Email")} id="Email" placeholder="Email" />
        {errors.Email && <p>{errors.Email.message}</p>}

        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default App;
