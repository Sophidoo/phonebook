import Style from "../Styles/phone.module.css"
import {useState, useEffect} from "react"


const Phonebook = () => {

    const[addform, setAddform] = useState(false)
    const[fullname, setFullname] = useState()
    const[number, setNumber] = useState()
    const[nameError, setNameError] = useState(false)
    const[numerror, setNumError] = useState()
    const[toggling, setToggling] = useState()
    const [contact, setContact] = useState([])
    const[selectedNum, setSelectedNum] = useState()

    const randomColors = ["#ff000030", "#ffae0050" , "#00ff6650", "#00d0ff50", "#1900ff50"]
    // const storage = [
    //     {name: "joe", number:"234"},
    //     {name: "joe", number:"234"}
    // ]

    useEffect(() => {

        setContact(JSON.parse(localStorage.getItem('phonebook')) || [])
    }, [])

    let submit = () => {
        
        
        // spread operator
        const newContact = [...contact, {fullname, number}]
        setNameError('')
        setNumError('')

        if(!fullname){
            setNameError("Please Input Name")
            return
        }else if(!number){
            setNumError("Please Input a number")
            return  
        }else if(number.length <=  10){
            setNumError("Please Input a valid phone number")
            return     
        }else{
            setNameError('')
            setNumError('')
            setContact(newContact)
            setAddform(false)
        }
        
        localStorage.setItem("phonebook", JSON.stringify(newContact))
        
    }
    // console.log(number.length)

    
    
    let displayForm = () => {
        console.log(fullname)
        
        setFullname('')
        setNumber('')
        
        setAddform(true)
    }

    let close = () => {
        setAddform(false)
    }

    let toggle = (num) => {

        setSelectedNum(num)
        if(toggling){
            setToggling(false)
        }else{
            setToggling(true)
        }
    }

    return <>

        <div className = {Style.wrapper}>
            <div className = {Style.headingWrapper}>
                <div className = {Style.heading}>
                    <h2>Phonebook</h2>
                    <span onClick = {() => displayForm()}>+ Add New</span>
                </div>

                <input type = 'search' placeholder = 'Search'/>
            </div>
            {
                contact.length <= 0 &&
                <div className={Style.none}>
                    <p className={Style.nonetext}>No Contacts Yet😟</p>
                </div>
            }
            {
                contact.length > 0 &&
                contact?.map((element) => (
                    <div className = {Style.contact}>
                        <div className = {Style.contactWrapper}>
                            <div className = {Style.contactInfo}>
                            <div className = {Style.image} style={{background: randomColors[Math.floor(Math.random() * contact.length)]}}></div>
                                <div className={Style.contactName}>
                                    <h3>{element.fullname}</h3>
                                    <p>{element.number}</p>
                                </div>
                            </div>
                            <span className={`material-symbols-outlined ${Style.list}`} onClick={() => toggle(element.number)}>more_vert</span>
                        </div>
                        <div className={toggling && selectedNum === element.number? Style.showCard : Style.card}>
                            <p>Edit</p>
                            <p>Delete</p>
                        </div>
                    </div>
                ))
            }
            

        </div>

        <div className={`${Style.hide} ${addform && Style.show}`}>

            <div className = {Style.formWrapper}>

                <div className={Style.headWrapper}>
                    <p className={Style.close} onClick = {() => close()}>x</p>
                    <h1>Add to Phonebook</h1>
                </div>

                <form action="">
                    <div className={Style.inputWrapper}>
                        <label htmlFor="fnm">Full Name:</label>
                        <input type="text" value={fullname} name="fnm" onChange = {(e) => setFullname(e.target.value)}/>
                        <p className={Style.error}>{nameError}</p>
                    </div>

                    <div className={Style.inputWrapper}>
                        <label htmlFor="num">Phone Number:</label>
                        <input type="text" value={number} name="fnm" onChange = {(e) => setNumber(e.target.value)}/>
                        <p className={Style.error}>{numerror}</p>
                    </div>
                    <input type="button" onClick = {() => submit()} value="Submit"/>
                </form>

            </div>

        </div>

    </>

}

export default Phonebook