import "./App.css";
import { SubmitHandler, useForm } from "react-hook-form";

function App() {
  interface Inputs {
    name: string;
    lastName: string;
    Email: string;
  }
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };
  console.log("errors", errors);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          {...register("name", {
            required: "Name must not be empty",
            maxLength: {
              value: 10,
              message: "Name must not be more than 10 charachters",
            },
          })}
        />
        {errors.name && <p>{errors.name.message}</p>}

        <input
          type="text "
          {...register("lastName", {
            required: "lastName must not be empty",
            minLength: {
              value: 5,
              message: "lastName must contain at leasr 5 charachters",
            },
          })}
        />
        {errors.lastName && <p>{errors.lastName.message}</p>}

        <input
          type="text "
          {...register("Email", {
            required: "Email must not be empty",
            pattern: {
              value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
              message: "Email isn't valid",
            },
          })}
        />
        {errors.Email && <p>{errors.Email.message}</p>}
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default App;
