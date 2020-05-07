











<div className="div_holding_login_form">
<form className="login_container" onSubmit={this.handleSubmit}>
<h1>Log In</h1>
<div className="login_input_inline">
<input
    placeholder="email"
    type="text"
    name="email"
    value={email}
    onChange={this.handleChange}
/>
<input
    placeholder="password"
    type="password"
    name="password"
    value={password}
    onChange={this.handleChange}
/>
</div>
<button placeholder="submit" type="submit">
    Log In
</button>
<div class="container signin">
    <p>Don't have an account? <Link to="/signup">Sign Up!</Link></p>
    <Link to="/about">About</Link>
  </div>

</form>
<div>
{
    this.state.errors ? this.handleErrors() : null
}
</div>
</div>