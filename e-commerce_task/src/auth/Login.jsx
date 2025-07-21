import { Link, useNavigate } from "react-router-dom"
import MyContext from "../context/MyContext"
import { useContext, useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase/FirebaseConfig"
import { toast } from "react-toastify"
import Loader from "../components/loader/Loader"
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Grid,
} from "@mui/material"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const context = useContext(MyContext)
  const { loading, setLoading } = context

  const navigate = useNavigate()

  const login = async () => {
    setLoading(true)
    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      localStorage.setItem("user", JSON.stringify(result))
      toast.success("Signin Successfully")
      navigate("/")
      setLoading(false)
    } catch (error) {
      console.log(error)
      toast.error("Signin Failed")
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
            Login
          </Typography>

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
            onClick={login}
            sx={{
              mb: 2,
              bgcolor: "yellow.500",
              color: "black",
              fontWeight: "bold",
              ":hover": { bgcolor: "yellow.600" },
            }}
          >
            Login
          </Button>

          <Typography align="center" sx={{ color: "#fff" }}>
            Don&apos;t have an account?{" "}
            <Link to="/signup" style={{ color: "#facc15", fontWeight: "bold" }}>
              Signup
            </Link>
          </Typography>
        </Paper>
      </Box>
    </Container>
  )
}

export default Login
