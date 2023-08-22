"use client";
import styles from "@/styles/CompleteAccount.module.css";
import axios from "axios";
import {useState} from "react";
import toast from "react-hot-toast";

const updateNewUser = async (email, name, surname, gender, iban, phone) => {
    return await axios.post(
        `/api/auth/complete`,
        {
            email,
            name,
            surname,
            gender,
            iban,
            phone,
        },
        {withCredentials: true}
    );
};

export default function CompleteForm({email}) {
    let toastPostID;

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    // const [age, setAge] = useState(0);
    const [gender, setGender] = useState("");
    const [iban, setIban] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);

    /*const { mutate } = useMutation(
          async (email, name, surname, age, gender) =>
              await axios.put("/api/auth/complete", {
                  email, name, surname, age, gender
              }),
          {
              onError: (error) => {
                  if (error instanceof AxiosError) {
                      toast.error(error?.response?.data.message, { id: toastPostID })
                  }
                  setIsDisabled(false)
              },
              onSuccess: (data) => {
                  toast.success("Your account is now complete!", { id: toastPostID })
                  setIsDisabled(false)
                  setTimeout(() => {
                      router.push("/");
                  },2000)
              },
          }
      )*/
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsDisabled(true);

        toast.dismiss(toastPostID);
        toastPostID = toast.loading("Completing your account!", {
            id: toastPostID,
        });

        if (iban.trim() !== "" || phoneNumber.trim() !== "") {
            await updateNewUser(email, name, surname, gender, iban, phoneNumber);

            toastPostID = toast.success("Your account is finished!", {
                id: toastPostID,
            });
            setTimeout(() => {
                window.location.href = "/";
            }, 500);
        } else {
            toastPostID = toast.error("Please fill out at least one of Phone Number, IBAN fields!", {
                id: toastPostID,
            });
            setIsDisabled(false);
        }
    };

    return (
        <form className={styles.formContainer} onSubmit={handleSubmit}>
            <div className={styles.formWrapper}>
                <label className={styles.label} htmlFor="firstName">
                    First Name:
                    <input
                        type="text"
                        id="firstName"
                        name="name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        required
                        className={styles.input}
                        placeholder="First Name"
                    />
                </label>
                <label className={styles.label} htmlFor="surname">
                    Surname:
                    <input
                        type="text"
                        id="surname"
                        name="surname"
                        value={surname}
                        onChange={(event) => setSurname(event.target.value)}
                        required
                        className={styles.input}
                        placeholder="Surname"
                    />
                </label>
                {/*<label className={styles.label} htmlFor="age">
                    Age:
                    <input
                        type="number"
                        id="age"
                        name="age"
                        value={age}
                        onChange={(event) => setAge(parseInt(event.target.value))}
                        required
                        className={styles.input}
                        placeholder="0"
                    />
                </label>*/}
                <label className={styles.label} htmlFor="gender">
                    Gender:
                    <select
                        id="gender"
                        name="gender"
                        value={gender}
                        onChange={(event) => setGender(event.target.value)}
                        required
                        className={styles.input}
                    >
                        <option value="">-- Please Select --</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </label>
                <p>*<br/>
                    In case you provide your Phone number only you will receive payments on Revolut else, if you provide your IBAN only or both you will receive a bank transfer(s).</p>
                <label className={styles.label} htmlFor="phoneNumber">
                    Phone Number:
                    <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={phoneNumber}
                        onChange={(event) => setPhoneNumber(event.target.value)}
                        className={styles.input}
                        placeholder="Enter phone number"
                    />
                </label>
                <label className={styles.label} htmlFor="iban">
                    IBAN:
                    <input
                        type="text"
                        id="iban"
                        name="iban"
                        value={iban}
                        onChange={(event) => setIban(event.target.value)}
                        className={styles.input}
                        placeholder="Enter IBAN"
                    />
                </label>
                <button className={styles.button} type="submit" disabled={isDisabled}>
                    Complete Account
                </button>
            </div>
        </form>
    );
}
