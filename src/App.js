import { useState, useEffect} from 'react'
import axios from 'axios'
import Note from './components/Note.js'
import noteService from './services/notes.js'
import loginService from './services/login.js'
import Notification from './components/Notification.js'
import Togglable from './components/Togglable.js'
import NoteForm from './components/NoteForm.js'
import LoginForm from './components/LoginForm.js'
const App = () => {
    const [notes, setNotes] = useState([])
    const [showAll, setShowAll] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [loginVisible, setLoginVisible] = useState(false)
    useEffect(() => {
        noteService
            .getAll()
            .then(initialNotes => {
                setNotes(initialNotes)
            })
    }, [])
    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
        if(loggedUserJSON){
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            noteService.setToken(user.token)
        }
    } ,[])
    const addNote = (noteObject) => {
        noteService
            .create(noteObject)
            .then(returnedNote => {
                setNotes(notes.concat(returnedNote))
            })
    }
    const toggleImportanceOf = (id) => {
        const note = notes.find( n => n.id === id )
        const changedNote = {...note, important: !note.important}
        noteService
            .update(id, changedNote)
            .then(returnedNote =>{
                setNotes(notes.map(note => note.id !== id ? note : returnedNote))
            })
            .catch(error => {
                setErrorMessage(
                    `the note '${note.content}' was already deleted from server`
                )
                setTimeout(() => {
                    setErrorMessage(null)
                }, 3000)
                setNotes(notes.filter(n=> n.id !== id))
            })
        }
    const notesToShow = showAll
        ? notes
        : notes.filter(note => note.important)
    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username, password
            })
            setUser(user)
            window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
            noteService.setToken(user.token)
            setUsername(user)
            setUsername('')
            setPassword('')
        }
        catch (exception){
            setErrorMessage('Wrong credentials')
            setTimeout(() => {
                setErrorMessage(null)
            }, 3000)
        }
    }
    return(
        <div>
            <h1>Notes</h1>
            <Notification message= {errorMessage}/>
            {user == null ? 
                <Togglable buttonLabel="login">
                    <LoginForm
                        username={username}
                        password={password}
                        handleUsernameChange={({target}) => setUsername(target.value)}
                        handlePasswordChange={({target}) => setPassword(target.value)}
                        handleSubmit={handleLogin}
                    />
                </Togglable>:
                <div>
                    <p>{user.name} logged in </p>
                    <Togglable buttonLabel="new note">
                    <NoteForm createNote={addNote}/>
                </Togglable>
                </div>
            }
        <div>
                <button onClick={()=> setShowAll(!showAll)}>
                    show {showAll ? 'important' : 'all'}
                </button>
        </div>
        <ul>
            {notesToShow.map(note => 
                <Note 
                    key={note.id} 
                    note={note}
                    toggleImportance={() => toggleImportanceOf(note.id)}
                />)}
        </ul>
        </div>
    )
}
export default App;
