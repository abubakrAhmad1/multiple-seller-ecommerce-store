import { useDispatch, useSelector } from "react-redux";
import { handleChange, submitSignInData } from "../redux/slice/signInSlice";

export default function Login() {
  const variables = useSelector((state) => state.signin);
  const dispatch = useDispatch();

  function loginFunction(event) {
    event.preventDefault();
    if (!variables.name || !variables.password || !variables.type) {
      alert("please enter complete credentials");
      return;
    }
    dispatch(submitSignInData(variables));
  }
  return (
    <div>
      <form>
        <fieldset>
          <legend>Log In</legend>
          <label htmlFor="name">Enter Name</label>
          <input
            type="text"
            id="name"
            value={variables.name}
            onChange={(e) => dispatch(handleChange(e.target))}
          />
          <label htmlFor="password">Enter Password</label>
          <input
            type="password"
            id="password"
            value={variables.password}
            onChange={(e) => dispatch(handleChange(e.target))}
          />

          <select
            id="type"
            value={variables.type}
            onChange={(e) => dispatch(handleChange(e.target))}
          >
            <option value="" disabled selected>
              Select Type
            </option>
            <option value="seller">Seller</option>
            <option value="buyer">Buyer</option>
          </select>

          <button onClick={loginFunction}>Login In</button>
        </fieldset>
      </form>
    </div>
  );
}
