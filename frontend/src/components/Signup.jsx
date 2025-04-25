import { useSelector, useDispatch } from "react-redux";
import { googleSignUp, handleChange ,submitFormData} from "../redux/slice/signupSlice";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const variables = useSelector((state) => state.signup);

  async function googleSignIn(event) {
    event.preventDefault();

    if (!variables.type) {
      alert("Please select a user type before signing in with Google.");
      return;
    }
    dispatch(googleSignUp());
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (
      !variables.name ||
      !variables.email ||
      !variables.password ||
      !variables.type
    ) {
      alert("Please fill in all fields.");
      return;
    }
    //HERE THE SUBMIT THUNK CAN BE CALLED LIKE "dispatch(submitFormData(varibales))" 
    dispatch(submitFormData(variables));
    navigate('/login');
  }

  return (
    <div>
      <form>
        <h1>SIGN UP</h1>

        <fieldset>
          <legend>Details</legend>

          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            value={variables.name}
            onChange={(e) => dispatch(handleChange(e.target))}
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={variables.email}
            onChange={(e) => dispatch(handleChange(e.target))}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={variables.password}
            onChange={(e) => dispatch(handleChange(e.target))}
          />

          <label htmlFor="type">Select Type</label>
          <select
            id="type"
            value={variables.type}
            onChange={(e) => dispatch(handleChange(e.target))}
          >
            <option value="" disabled>
              Select Type
            </option>
            <option value="seller">Seller</option>
            <option value="buyer">Buyer</option>
          </select>

          <button onClick={googleSignIn}>Sign Up with Google</button>
          <button onClick={handleSubmit}>Submit</button>
        </fieldset>
      </form>
    </div>
  );
}
