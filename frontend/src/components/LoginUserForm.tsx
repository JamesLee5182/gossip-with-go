import { useState } from "react"
import { Typography, Card, CardContent, CardActions, TextField} from "@mui/material"
import { Button } from "@mui/material"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginUserForm() {
    const [username, setUsername] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    const { login } = useAuth()
    const navigate = useNavigate()

    const handleLogin = async (e: React.FormEvent) => {
        if (!username.trim()) return;

        e.preventDefault()

        setIsSubmitting(true)

        try {
            await login(username)
            
            alert("Successfully logged in")
            navigate("/")
        } catch (err) {
            console.error(err)
        } finally {
            setIsSubmitting(false)
        }
    };

    return (
        <Card sx={{ minWidth: 275, mb: 2 }} variant="outlined">
            <form onSubmit={handleLogin}>
                <CardContent>
                    <TextField 
                        fullWidth
                        label="Username" 
                        variant="standard" 
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                    />
                </CardContent>

                <CardActions>
                    <Button 
                        variant="outlined" 
                        onClick={handleLogin}
                        disabled={isSubmitting}
                    >
                        Login
                    </Button>
                </CardActions>
            </form>
        </Card>
    )
}