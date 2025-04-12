export default function Login() {
  return (
    <div>
      <form>
        <fieldset>
          <legend>Log In</legend>
          <label htmlFor="name">Enter Name</label>
          <input type="text" id="name" />
          <label htmlFor="password">Enter Password</label>
          <input type="password" id="password" />

          <button>Login In</button>
        </fieldset>
      </form>
    </div>
  );
}
