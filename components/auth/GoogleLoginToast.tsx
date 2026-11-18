"use client"

import { useEffect } from "react"
import { toast } from "react-hot-toast"

const GoogleLoginToast = () => {
  useEffect(() => {
    const isGoogleLoginSuccessful = sessionStorage.getItem(
      "google-login-success"
    )

    if (isGoogleLoginSuccessful) {
      sessionStorage.removeItem("google-login-success")

      toast.success("Successfully logged in with Google!")
    }
  }, [])

  return null
}

export default GoogleLoginToast