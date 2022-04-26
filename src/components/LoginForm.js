const LoginForm = ({
    handleSubmit,
    handleUsernameChange,
    handlePasswordChange,
    username,
    password
}) => {
    return(
        <div>
        <h2>login</h2>
        <form onSubmit={handleSubmit}>
            <div>
                username
                    <input
                    //type="text"
                    value={username}
                    name="Username"
                    //onChange={({target}) => setUsername(target.value)}
                    onChange={handleUsernameChange}
                    />
            </div>
            <div>
                password
                    <input
                    type="password"
                    value={password}
                    name="Password"
                    //onChange={({target}) => setPassword(target.value)}
                    onChange={handlePasswordChange}
                    />
            </div>
            <button type="submit">login</button>
        </form>
        </div>
    )
}

export default LoginForm
