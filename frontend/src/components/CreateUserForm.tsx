import { useState } from 'react';

export default function CreateUserForm() {
    const [username, setUsername] = useState("");

    const handleSubmit = async () => {
        try {
            await fetch("http://localhost:8000/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username: username }), 
            });
        } catch (err) {
            console.error(err)
        }
    };

    return (
        <div>
            <h1>Create New User</h1>
            <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username..."
            />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}