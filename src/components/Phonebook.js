import Style from "../Styles/phone.module.css";
import { useState, useEffect } from "react";

const Phonebook = () => {
  const [addform, setAddform] = useState(false);
  const [fullname, setFullname] = useState();
  const [number, setNumber] = useState();
  const [nameError, setNameError] = useState(false);
  const [numerror, setNumError] = useState(); 
  const [toggling, setToggling] = useState();
  const [contact, setContact] = useState([]);
  // const [newcontact, setNewContact] = useState([])
  const [selectedNum, setSelectedNum] = useState();
  const [editname, setEditname] = useState();
  const [editnum, setEditnum] = useState();
  const [displayedit, setDisplayedit] = useState(false);
  const [key, setKey] = useState(0);
  const [editkey, setEditkey] = useState();
  const[filterarr, setFilterarr] = useState([])
  // const[search, setSearch] = useState()x


  const randomColors = [
    "#ff000030",
    "#ffae0050",
    "#00ff6650",
    "#00d0ff50",
    "#1900ff50",
  ];
  // const storage = [
  //     {name: "joe", number:"234"},
  //     {name: "joe", number:"234"}
  // ]

  //on page load
  useEffect(() => {
    setContact(JSON.parse(localStorage.getItem("phonebook")) || []);
  }, []);

  //on click of submit button in the add form
  let submit = () => {
    // spread operator
    let newContact = [...contact];
    setNameError("");
    setNumError("");

    if (!fullname) {
      setNameError("Please Input Name");
      return;
    } else if (!number) {
      setNumError("Please Input a number");
      return;
    } else if (number.length <= 10 || number.length > 11) {
      setNumError("Please Input a valid phone number");
      return;
    } else {
      if (contact.length > 0) {
        // console.log(contact.slice(contact.length - 1).length)
        contact.slice(contact.length - 1)?.map((element) => {
          if (element.fullname === fullname) {
            console.log(fullname);
            console.log(element.fullname);
            setNameError("Name already exists");
            return null;
          } else if (element.number === number) {
            setNumError("Number already exists");
            return null;
          } else {
            console.log(element.fullname);
            setNameError("");
            setNumError("");
            newContact = [...contact, { key, fullname, number }];
            setContact(newContact);
            setAddform(false);
            return null;
          }
        });
      } else {
        newContact = [...contact, { key, fullname, number }];
        console.log(newContact);
        setContact(newContact);
        setAddform(false);
      }
    }

    localStorage.setItem("phonebook", JSON.stringify(newContact));
  };
  // console.log(number.length)

  //on click of the edit button
  let edit = (num) => {
    setDisplayedit(true);
    contact?.map((element) => {
      if (element.key === num) {
        setEditname(element.fullname);
        setEditnum(element.number);
        setEditkey(element.key);
      }
      return null;
    });
  };

  //on submit of the edit form
  let submitedit = () => {
    setDisplayedit(false);
    setToggling(false);

    contact?.map((element) => {
      if (parseInt(element.key) === parseInt(editkey)) {
        element.fullname = editname;
        element.number = editnum;
      }
      return null;
    });

    let newContact = [...contact];
    setContact(newContact);

    localStorage.setItem("phonebook", JSON.stringify(newContact));
  };

  //on click of the delete button
  let deleting = (num) => {
    let newarr = contact.filter((el) => el.key !== num);
    console.log(newarr);
    const newContact = [...newarr];
    setContact(newContact);
    localStorage.setItem("phonebook", JSON.stringify(newContact));
  };
  // let deletekey = (num) => {
  //     contact?.map((element) => {
  //         return element.key !== num
  //         // if(element.key !== num){
  //         //     console.log(contact)
  //         //     return contact
  //         // }
  //     })
  // }

  //on click of add new
  let displayForm = () => {
    // console.log(fullname)
    setNameError("");
    setNumError("");
    setKey(key + 1);
    setFullname("");
    setNumber("");

    setAddform(true);
  };

  //on clickof x
  let close = () => {
    setAddform(false);
    setDisplayedit(false);
    setToggling(false);
  };

  const startSearch = (value) => {
    let filtered = contact.filter((element) => element.fullname.startsWith(value))
    
    setFilterarr(filtered)
    console.log(filterarr)
  }

  //on click of the more icon
  let toggle = (num) => {
    setSelectedNum(num);
    if (toggling) {
      setToggling(false);
    } else {
      setToggling(true);
    }
  };

  return (
    <>
      <div className={Style.wrapper}>
        <div className={Style.headingWrapper}>
          <div className={Style.heading}>
            <h2>Phonebook</h2>
            <span onClick={() => displayForm()}>+ Add New</span>
          </div>

          <input
            type="search"
            placeholder="Search"
            onChange = {(e) => startSearch(e.target.value)}
          />
        </div>
        {contact.length <= 0 && (
          <div className={Style.none}>
            <p className={Style.nonetext}>No Contacts Yet😟</p>
          </div>
        )}
        {
          filterarr.length <= 0 && (
            contact?.map((element) => (
            <div className={Style.contact}>
              <div className={Style.contactWrapper}>
                <div className={Style.contactInfo}>
                  <div
                    className={Style.image}
                    id={key}
                    style={{
                      background:
                        randomColors[
                          Math.floor(Math.random() * contact.length)
                        ],
                    }}
                  ></div>
                  <div className={Style.contactName}>
                    <h3>{element.fullname}</h3>
                    <p>{element.number}</p>
                  </div>
                </div>
                <span
                  className={`material-symbols-outlined ${Style.list}`}
                  onClick={() => toggle(element.key)}
                >
                  more_vert
                </span>
              </div>
              <div
                className={
                  toggling && selectedNum === element.key
                    ? Style.showCard
                    : Style.card
                }
              >
                <p onClick={() => edit(element.key)}>Edit</p>
                <p onClick={() => deleting(element.key)}>Delete</p>
              </div>
            </div>
          ))
          )
        }
        {contact.length > 0 &&
          filterarr?.map((element) => (
            <div className={Style.contact}>
              <div className={Style.contactWrapper}>
                <div className={Style.contactInfo}>
                  <div
                    className={Style.image}
                    id={key}
                    style={{
                      background:
                        randomColors[
                          Math.floor(Math.random() * contact.length)
                        ],
                    }}
                  ></div>
                  <div className={Style.contactName}>
                    <h3>{element.fullname}</h3>
                    <p>{element.number}</p>
                  </div>
                </div>
                <span
                  className={`material-symbols-outlined ${Style.list}`}
                  onClick={() => toggle(element.key)}
                >
                  more_vert
                </span>
              </div>
              <div
                className={
                  toggling && selectedNum === element.key
                    ? Style.showCard
                    : Style.card
                }
              >
                <p onClick={() => edit(element.key)}>Edit</p>
                <p onClick={() => deleting(element.key)}>Delete</p>
              </div>
            </div>
          ))}
      </div>

      <div className={`${Style.hide} ${addform && Style.show}`}>
        <div className={Style.formWrapper}>
          <div className={Style.headWrapper}>
            <p className={Style.close} onClick={() => close()}>
              x
            </p>
            <h1>Add to Phonebook</h1>
          </div>

          <form action="">
            <div className={Style.inputWrapper}>
              <label htmlFor="fnm">Full Name:</label>
              <input
                type="text"
                value={fullname}
                name="fnm"
                onChange={(e) => setFullname(e.target.value)}
              />
              <p className={Style.error}>{nameError}</p>
            </div>

            <div className={Style.inputWrapper}>
              <label htmlFor="num">Phone Number:</label>
              <input
                type="text"
                value={number}
                name="fnm"
                onChange={(e) => setNumber(e.target.value)}
              />
              <p className={Style.error}>{numerror}</p>
            </div>
            <input type="button" onClick={() => submit()} value="Submit" />
          </form>
        </div>
      </div>
      <div className={displayedit ? Style.show : Style.hide}>
        <div className={Style.formWrapper}>
          <div className={Style.headWrapper}>
            <p className={Style.close} onClick={() => close()}>
              x
            </p>
            <h1>Edit Contact</h1>
          </div>

          <form action="">
            <div className={Style.inputWrapper}>
              <label htmlFor="fnm">Full Name:</label>
              <input
                type="text"
                value={editname}
                name="fnm"
                onChange={(e) => setEditname(e.target.value)}
              />
              <p className={Style.error}>{nameError}</p>
            </div>

            <div className={Style.inputWrapper}>
              <label htmlFor="num">Phone Number:</label>
              <input
                type="text"
                value={editnum}
                name="fnm"
                onChange={(e) => setEditnum(e.target.value)}
              />
              <p className={Style.error}>{numerror}</p>
            </div>
            <input type="button" onClick={() => submitedit()} value="Submit" />
          </form>
        </div>
      </div>
    </>
  );
};

export default Phonebook;
