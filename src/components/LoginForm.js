import PropTypes from 'prop-types'
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
                    id="username"
                    value={username}
                    name="Username"
                    //onChange={({target}) => setUsername(target.value)}
                    onChange={handleUsernameChange}
                    />
            </div>
            <div>
                password
                    <input
                    id="password"
                    type="password"
                    value={password}
                    name="Password"
                    //onChange={({target}) => setPassword(target.value)}
                    onChange={handlePasswordChange}
                    />
            </div>
            <button id="login-button"type="submit">login</button>
        </form>
        </div>
    )
}
LoginForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleUsernameChange: PropTypes.func.isRequired,
    handlePasswordChange: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
}
export default LoginForm
