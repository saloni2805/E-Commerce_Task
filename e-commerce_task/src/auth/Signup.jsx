import { createUserWithEmailAndPassword } from "firebase/auth"
import { Link } from "react-router-dom"
import { auth, fireDB } from "../firebase/FirebaseConfig"
import { useContext, useState } from "react"
import MyContext from "../context/MyContext"
import { toast } from "react-toastify"
import Loader from "../components/loader/Loader"
import { addDoc, collection, Timestamp } from "firebase/firestore"
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
} from "@mui/material"

function Signup() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const context = useContext(MyContext)
  const { loading, setLoading } = context

  const signup = async () => {
    setLoading(true)
    if (name === "" || email === "" || password === "") {
      setLoading(false)
      return toast.error("All fields are required")
    }
    try {
      const users = await createUserWithEmailAndPassword(auth, email, password)
      console.log(users)

      const user = {
        name: name,
        uid: users.user.uid,
        email: users.user.email,
        time: Timestamp.now(),
      }

      const userRef = collection(fireDB, "users")
      await addDoc(userRef, user)

      toast.success("Signup Successfully")

      setName("")
      setEmail("")
      setPassword("")
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  return (
    <Container maxWidth="sm">
      {loading && <Loader />}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Paper elevation={6} sx={{ p: 4, bgcolor: "grey.900" }}>
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{ color: "#fff", fontWeight: "bold" }}
          >
            Signup
          </Typography>

          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{
              mb: 2,
              bgcolor: "grey.800",
              input: { color: "#fff" },
              label: { color: "#ccc" },
            }}
          />

          <TextField
            fullWidth
            variant="filled"
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              mb: 2,
              bgcolor: "grey.800",
              input: { color: "#fff" },
              label: { color: "#ccc" },
            }}
          />

          <TextField
            fullWidth
            variant="filled"
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              mb: 2,
              bgcolor: "grey.800",
              input: { color: "#fff" },
              label: { color: "#ccc" },
            }}
          />

          <Button
            fullWidth
            variant="contained"
            onClick={signup}
            sx={{
              mb: 2,
              bgcolor: "red.500",
              color: "#fff",
              fontWeight: "bold",
              ":hover": { bgcolor: "red.600" },
            }}
          >
            Signup
          </Button>

          <Typography align="center" sx={{ color: "#fff" }}>
            Have an account?{" "}
            <Link to="/login" style={{ color: "#ef4444", fontWeight: "bold" }}>
              Login
            </Link>
          </Typography>
        </Paper>
      </Box>
    </Container>
  )
}

export default Signup
