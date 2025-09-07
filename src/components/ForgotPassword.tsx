import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  Paper,
} from "@mui/material";
import Cookies from "js-cookie";
import { forgotPassword, verifyOtp, changePassword } from "../api/authApi"; // import all needed APIs
import { useNavigate } from "react-router-dom";

const ForgotPassword: React.FC = () => {
  const [step, setStep] = useState<"email" | "otp" | "reset">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [password, setPassword] = useState("");
  const [timeLeft, setTimeLeft] = useState(600);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string[] | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const navigate = useNavigate();

  // Step 1: Submit email - send OTP
  const handleEmailSubmit = async () => {
    setLoading(true);
    setError(null);
    setMessage(null);

    const { message, token, error } = await forgotPassword({ email });
    setLoading(false);

    if (error) {
      setError(error);
    } else {
      const expirationTime = new Date(new Date().getTime() + 10 * 60 * 1000);
      Cookies.set("token", token!, { expires: expirationTime, path: "/" });
      setMessage(message || "OTP sent successfully!");
      setStep("otp");
      setOtp(Array(6).fill(""));
      setTimeLeft(600);
    }
  };

  // Handle OTP input change
  const handleChange = (value: string, index: number) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  // Step 2: Submit OTP - verify OTP and get new token
  const handleSubmitOtp = async () => {
    const otpValue = otp.join("");
    if (otpValue.length !== 6) return;

    setLoading(true);
    setError(null);
    setMessage(null);

    const token = Cookies.get("token");
    const { message, token: newToken, error } = await verifyOtp(
      { otp: otpValue },
      token || ""
    );
    setLoading(false);

    if (error) {
      setError(error);
    } else {
      // Store new token from verification
      const expirationTime = new Date(new Date().getTime() + 10 * 60 * 1000);
      Cookies.set("token", newToken!, { expires: expirationTime, path: "/" });
      setMessage(message || "OTP verified successfully!");
      setStep("reset");
      setPassword("");
    }
  };

  // Step 3: Reset password with new token
  const handleSubmitNewPassword = async () => {
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    setError(null);
    setMessage(null);
    setSuggestions(null);
    setWarning(null);

    const token = Cookies.get("token");
    const { message, suggestions, warning, error } = await changePassword(
      { password_hash: password },
      token || ""
    );
    setLoading(false);

    if (error) {
      setError(error);
      setSuggestions(suggestions || null);
      setWarning(warning || null);
    } else {
      setMessage(message || "Password changed successfully! Redirecting...");
      setSuggestions(suggestions || null);
      setWarning(warning || null);
      // Clear token cookie after password reset
      Cookies.remove("token", { path: "/" });
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  };

  // OTP timer effect
  useEffect(() => {
    if (timeLeft <= 0 || step !== "otp") return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, step]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8, borderRadius: 3 }}>
        {step === "email" && (
          <>
            <Typography variant="h5" align="center" gutterBottom>
              Forgot Password
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              align="center"
              gutterBottom
            >
              Enter your email to receive a 6-digit OTP.
            </Typography>

            <Box mt={3}>
              <TextField
                label="Email"
                type="email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Box>

            {error && (
              <Typography color="error" align="center" mt={2}>
                {error}
              </Typography>
            )}
            {message && (
              <Typography color="primary" align="center" mt={2}>
                {message}
              </Typography>
            )}

            <Box mt={4} textAlign="center">
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleEmailSubmit}
                disabled={loading || !email}
              >
                {loading ? "Sending..." : "Send OTP"}
              </Button>
            </Box>
          </>
        )}

        {step === "otp" && (
          <>
            <Typography variant="h5" align="center" gutterBottom>
              Verify OTP
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              align="center"
              gutterBottom
            >
              Enter the 6-digit OTP sent to <b>{email}</b>
            </Typography>

            <Box mt={3}>
              <Grid container spacing={2} justifyContent="center">
                {otp.map((digit, index) => (
                  <Grid item xs="auto" key={index}>
                    <TextField
                      id={`otp-${index}`}
                      value={digit}
                      onChange={(e) => handleChange(e.target.value, index)}
                      inputProps={{
                        maxLength: 1,
                        style: { textAlign: "center", fontSize: "1.5rem" },
                      }}
                      sx={{ width: 56 }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>

            <Box mt={3} textAlign="center">
              {timeLeft > 0 ? (
                <Typography variant="body2" color="text.secondary">
                  Time remaining: {formatTime(timeLeft)}
                </Typography>
              ) : (
                <Typography variant="body2" color="error">
                  OTP expired. Please request a new one.
                </Typography>
              )}
            </Box>

            {error && (
              <Typography color="error" align="center" mt={2}>
                {error}
              </Typography>
            )}
            {message && (
              <Typography color="primary" align="center" mt={2}>
                {message}
              </Typography>
            )}

            <Box mt={4} textAlign="center">
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleSubmitOtp}
                disabled={otp.some((d) => d === "") || timeLeft <= 0 || loading}
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </Button>
            </Box>
          </>
        )}

        {step === "reset" && (
          <>
            <Typography variant="h5" align="center" gutterBottom>
              Reset Password
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              align="center"
              gutterBottom
            >
              Enter your new password.
            </Typography>

            <Box mt={3}>
              <TextField
                label="New Password"
                type="password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
              />
            </Box>

            {error && (
              <Typography color="error" align="center" mt={2}>
                {error}
              </Typography>
            )}
            {warning && (
              <Typography color="warning.main" align="center" mt={2}>
                {warning}
              </Typography>
            )}
            {suggestions && suggestions.length > 0 && (
              <Box mt={2}>
                <Typography color="info.main" align="center" fontWeight={600}>
                  Suggestions:
                </Typography>
                <ul style={{ color: '#0288d1', textAlign: 'center', listStyle: 'none', padding: 0 }}>
                  {suggestions.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </Box>
            )}
            {message && (
              <Typography color="primary" align="center" mt={2}>
                {message}
              </Typography>
            )}

            <Box mt={4} textAlign="center">
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleSubmitNewPassword}
                disabled={loading || password.length < 6}
              >
                {loading ? "Changing..." : "Change Password"}
              </Button>
            </Box>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default ForgotPassword;
