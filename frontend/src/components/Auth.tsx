import { SignupInput } from "@chayanpandit/medium-common"
import { ChangeEvent, ChangeEventHandler, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { BACKEND_URL } from "../config"


export const Auth = ({type}:{type: "signup" | "signin"}) => {

    const navigate = useNavigate()
    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "",
        email: "", 
        password: ""
    })

    async function sendRequest() {
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type=="signup"?"signup":"signin"}`,postInputs)
            const jwt = response.data.jwt
            console.log(jwt)
            localStorage.setItem("token",jwt)
            navigate("/blogs ")
        } catch (e) {
            alert("Error while signing up")
        }
    }

    return (        
    <div className="flex flex-col justify-center h-screen">
        <div className="flex justify-center">
            <div>
                <div className="px-10">
                    <div className="text-4xl font-extrabold">
                    {type=="signup"? "Create an account" : "Sign in"}  
                    </div>
                    <div className="text-l font-semibold text-slate-400">
                        {type=="signup"? "Already have an account?" : "Don't have an account?"}  
                        <Link className="pl-2 underline underline-offset-1" to=                        {type=="signup"? "/signin" : "/signup"}>{type=="signup"? "Login" : "Register"}</Link>
                    </div>
                </div>
                <div className="mt-4">
                    {type=="signup"?<LabelledInput label="Name" placeholder="Enter your name" onChange={(e)=>{
                        setPostInputs(c=>({
                            ...c,
                            name: e.target.value
                        }))
                    }} />:null}
                    <LabelledInput label="Email" placeholder="something@email.com" onChange={(e)=>{
                        setPostInputs(c=>({
                            ...c,
                            email: e.target.value
                        }))
                    }} />
                    <LabelledInput label="Password" placeholder="******" type="password" onChange={(e)=>{
                        setPostInputs(c=>({
                            ...c,
                            password: e.target.value
                        }))
                    }} />
                    <button type="button" onClick={sendRequest} className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type=="signup"? "Sign up" : "Sign in"}</button>

                </div>
            </div>
        </div>
    </div>
    )
}

interface LabelledInputType {
    label: string,
    placeholder: string,
    type ?: string,
    onChange: (e:ChangeEvent<HTMLInputElement>)=> void
}
function LabelledInput({label,placeholder,type,onChange}: LabelledInputType) {
    return (
        <div>
            <label className="mt-3 block mb-2 text-sm font-bold text-black">{label}</label>
            <input type={type || "text"} id={label} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
            
        </div>
    )
}