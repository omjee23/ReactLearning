
import { useState , useCallback , useEffect, useRef} from 'react'


function App() {
  const [length , setlength] = useState(8)
  const [number , setnumber] = useState(false)
  const [character, setcharacter] = useState(false)
  const [Password , setpassword] = useState("")

  const PasswordGenerator = useCallback(()=>{
    let pass = ""
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if(number) str+= "0123456789"
    if(character) str += "!@#$%^&*()*+,-./:;<=>?@[]{}~"
    for(let i=1 ; i<= length ;i++){
      let char = Math.floor(Math.random() *str.length + 1)
      pass += str.charAt(char)
      setpassword(pass)
    }
  } ,[length ,number, character,setpassword])


  const copyPassword = useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0, 51)
    window.navigator.clipboard.writeText(Password)
  },[Password])

  useEffect(()=>{
    PasswordGenerator()
  },[length,number, character, PasswordGenerator])

  const passwordRef = useRef(null)

  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700'>
      <h1 className='text-white text-center mt-10 pt-5'>Password Generator</h1>
      <div className='flex shadow-md rounded-lg  overflow-hidden'>
        <input type="text"  value={Password} className='outline-none w-full py-1 px-3 mb-8 rounded-lg ' placeholder='password' readOnly ref={passwordRef}/>
        <button className='outline-none bg-blue-700 text-white py-1 mb-8 px-3 shrink-0' onClick={copyPassword}>copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1 mb-4'>
          <input type="range" min={6} max={50 } value={length} className='cursor-pointer' onChange={(e)=>{setlength(e.target.value)}}/>
          <label htmlFor="">length: {length}</label>
        </div>
        <div className='flex items-center gap-x-1 mb-4'>
          <input type="checkbox" defaultChecked={number} id="numberInput" onChange={()=>{setnumber((prev)=> !prev)}} />
          <label htmlFor="">Number</label>
        </div>
        <div className='flex items-center gap-x-1 mb-4'>
        <input type="checkbox" defaultChecked={character} id="charInput" onChange={()=>{setcharacter((prev)=> !prev)}} />
        <label htmlFor="">Character</label>
        </div>
      </div>

    </div>
    </>
  )
}

export default App
