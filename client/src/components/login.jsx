export default function Login() {
  return (
    <div>
      <form action="/auth/signup" method="POST">
        <input
          type="username"
          name="username"
          id="password"
          placeholder="abc"
        />
        <br />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="password"
        />
        <br />
        <input
          type="email"
          name="email"
          id="email"
          placeholder="abc@gmail.com"
        />
        <br />
        <input type="number" name="age" id="age" placeholder="age" />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
