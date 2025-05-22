"use client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React, { useState } from "react"

export const emailRegex = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
export function isValidEmail(email: string){
  return emailRegex.test(email)
}

export const passwordRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}[\]|\\:;"'<>,.?/~`-])[A-Za-z\d!@#$%^&*()_+={}[\]|\\:;"'<>,.?/~`-]{8,}$/)
export function getPassWordValidation(password: string): string[]{
  const errors: string[] = []
  if(password.length < 8){
    errors.push("La contraseña debe tener al menos 8 caracteres.")
  }
  if(!/(?=.*[a-z])/.test(password)){
    errors.push("La contraseña debe contener al menos una letra minúscula.")
  }
  if(!/(?=.*[A-Z])/.test(password)){
    errors.push("La contraseña debe contener al menos una letra mayúcula.")
  }
  if(!/(?=.*\d)/.test(password)){
    errors.push("La contraseña debe contener al menos un número.")
  }
  if(!/(?=.*[!@#$%^&*()_+={}[\]|\\:;"'<>,.?/~`)])/.test(password)){
    errors.push("La contraseña debe contener al menos una carácter especial.")
  }
  return errors
}

export function LoginForm() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  
  const [emailError, setEmailError] = useState("")
  const [passwordErrrors, setPasswordErrors] = useState<string[]>([])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setEmailError("")
    setPasswordErrors([])

    let hasErrors = false
    if(!isValidEmail(email)){
      setEmailError("El formato del email no es válido. ej: user@example.com")
      hasErrors = true
    }

    const errors = getPassWordValidation(password)
    if(errors.length > 0){
      setPasswordErrors(errors)
      hasErrors = true
    }

    if(hasErrors){
      console.log("Errores de validación. No se procede con el login.")
      return
    }
    console.log("Correo electrónico y contraseña válidos. Se están enviando las credenciales.")
  }

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e => setEmail(e.target.value))}
                  required
                />
                {emailError && (<p className="text-red-500 text-sm mt-1">{emailError}</p>)}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required />
                {passwordErrrors.length > 0 && (
                  <ul className="text-red-500 text-sm mt-1 list-disc list-inside">
                    {passwordErrrors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                )}
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
              <Button variant="outline" className="w-full">
                Login with Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="#" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
