import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'
import { FaRegCopy } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";


function App() {
  const [length, setLength] = useState(4)
  const [upperAllowed, setUpperAllowed] = useState(false)
  const [lowerAllowed, setLowerAllowed] = useState(false)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [symbolAllowed, setSymbolAllowed] = useState(false)
  const [password, setPassword] = useState("")

  //useRef hook
  const passwordRef = useRef(null);

  const copyPass = useCallback(()=>{
    passwordRef.current?.select()
    // passwordRef.current?.setSelectionRange(3,8)
    window.navigator.clipboard.writeText(password)
  },[password])

  const passwordGenerator = useCallback(()=>{
    let pass = ""
    let str = ""

    let upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    let lower = "abcdefghijklmnopqrstuvwxyz"
    let number = "0123456789"
    let symbol = "!@#$%^&*-+[]{}~`"

    let c = 0

    if(upperAllowed){
      c++
      str+=upper
      let char = Math.floor(Math.random() * upper.length);
      pass += upper.charAt(char);
    }
    if(lowerAllowed){
      c++
      str+=lower
      let char = Math.floor(Math.random() * lower.length)
      pass += lower.charAt(char)
    }
    if(numberAllowed){
      c++
      str+=number
      let char = Math.floor(Math.random() * number.length)
      pass += number.charAt(char)
    }
    if(symbolAllowed){
      c++
      str+=symbol
      let char = Math.floor(Math.random() * symbol.length)
      pass += symbol.charAt(char)
    }
    
    for (let i = 1; i <= length-c; i++) {
      let char = Math.floor(Math.random() * str.length)
      pass += str.charAt(char)
    }
    setPassword(pass)

  }, [length, upperAllowed, lowerAllowed, numberAllowed, symbolAllowed, setPassword])

  // useEffect(() => {
  //   passwordGenerator()
  // },[length, numberAllowed, symbolAllowed, passwordGenerator])


  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <div className='text-white px-6 flex flex-col flex-wrap gap-5'>
      <h1 className='text-center text-xl font-bold text-[#565465]'>Password Generator</h1>
      <div className='bg-[#24232B] flex items-center py-3 px-6'>
        <input className='bg-transparent outline-none' type="text" value={password} placeholder='Password' readOnly
        ref={passwordRef}/>
        <div onClick={copyPass} className='text-xl text-[#6cf77c] cursor-pointer hover:text-zinc-500'><FaRegCopy /></div>
      </div>
      <div className='bg-[#24232B] flex flex-col gap-4 py-5 px-6'>
        <div className='flex flex-col gap-3'>
          <div className='flex flex-col gap-3'> 
            <div className='flex justify-between'>
              <h3>Character length</h3>
              <h3 className='text-[#6cf77c]'>{length}</h3>
            </div>
            <input className='w-full accent-[#6cf77c] outline-none border-2 border-red-800' 
            type="range" min={4} max={20} value={length} 
            onChange={(e) => {setLength(e.target.value)}} />
          </div>
          <div className='flex gap-2 items-center'>
            <input className='cursor-pointer' type="checkbox" defaultChecked={upperAllowed} 
            onChange={() => {setUpperAllowed((prev)=>!prev)}} />
            <h3>Include Uppercase Letters</h3>
          </div>
          <div className='flex gap-2 items-center'>
            <input className='cursor-pointer' type="checkbox" defaultChecked={lowerAllowed} 
            onChange={() => {setLowerAllowed((prev)=>!prev)}} />
            <h3>Include Lowercase Letters</h3>
          </div>
          <div className='flex gap-2 items-center'>
            <input className='cursor-pointer' type="checkbox" defaultChecked={numberAllowed} 
            onChange={() => {setNumberAllowed((prev)=>!prev)}} />
            <h3>Include Numbers</h3>
          </div>
          <div className='flex gap-2 items-center'>
            <input className='cursor-pointer' type="checkbox" defaultChecked={symbolAllowed} 
            onChange={() => {setSymbolAllowed((prev)=>!prev)}} />
            <h3>Include Symbols</h3>
          </div>
        </div>
        <button onClick={passwordGenerator} className='rounded-md w-full py-2 bg-[#6cf77c] text-black flex items-center justify-center gap-3'>
          <h4 className='font-bold'>Generate</h4> <span className=''><FaArrowRight />
        </span></button>
      </div>
    </div>
    </div>
  )
}

export default App
