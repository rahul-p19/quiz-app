'use client';
import React, {useState} from 'react'
import {z} from "zod";
import { loginSchema } from '@/schemas';
import { handleLogin } from './login';
import { useRouter } from 'next/navigation';
import Link from "next/link";

function LoginForm() {
  const router = useRouter();
  const [buttonText,setButtonText] = useState<string>('Login')
  const [loginData, setLoginData] = useState<z.infer<typeof loginSchema>>({
    email: '',
    password: '',
  })

  const [errors, setErrors] = useState<z.infer<typeof loginSchema>>({
    email: '',
    password: '',
  })

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>,field:string) => {
    setLoginData({
      ...loginData,
      [field]:e.target.value
    })
  }

  const handleSubmit = (e:React.FormEvent) => {
    e.preventDefault();
    setErrors({email:'',password:''})
    setButtonText("Submitting..")
    const res = loginSchema.safeParse(loginData)
    if(!res.success){
      setButtonText("Login");
      console.log(res.error.errors)
      res.error.errors.map(error=>{
        setErrors(prev => ({
          ...prev,
          [error.path[0]]: error.message
        }))
      })
      return;
    }
    handleLogin(loginData).then(res=>{
      if(res?.success){
        setButtonText("Redirecting..");
        router.push('/');
      }else{
        setButtonText("Login");
        res?.errors?.map(error=>setErrors(prev=>({...prev, [error.path[0]]:`Invalid ${error.path[0]}` })))
        if(res?.error) setErrors(prev=>({...prev, "password": "Invalid Credentials" }))
        return;
      }
    }).finally(()=>setButtonText("Login"));
  }

  return (
    <form className='flex flex-col gap-y-6 mt-6' onSubmit={handleSubmit}>
      <div className='flex flex-col'>
        <input type="text" placeholder='Email' className='bg-transparent text-accent placeholder:text-sm font-opensans border-b-accent border-b px-2 outline-none' value={loginData.email} onChange={e=>handleChange(e,"email")}/>
        <p className='text-red-500 text-sm'>{errors.email??''}</p>
      </div>
      <div className='flex flex-col'>
        <input type="password" placeholder='Password' className='bg-transparent text-accent placeholder:text-sm font-opensans border-b-accent border-b px-2 outline-none text-lg' value={loginData.password} onChange={e=>handleChange(e,"password")}/>
        <p className='text-red-500 text-sm'>{errors.password ?? ''}</p>
      </div>
        <button type="submit" className='text-white font-opensans px-3 py-1 my-4 rounded-sm w-1/2 self-center'>{buttonText}</button>
        <div className='flex'>
          <p>Don&apos;t have an account?</p>
        <Link href="/signup">Sign Up</Link>
        </div>
    </form>
  )
}

export default LoginForm