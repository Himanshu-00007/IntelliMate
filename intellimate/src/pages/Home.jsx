import React, { useEffect } from 'react'; //useEffect ek React hook hai jo component render hone ke baad kisi kaam ko run karne ke liye use hota hai.
import { useState } from 'react';
import {
  SignedIn,
  SignedOut,
  SignIn,
  SignInButton,
  SignOutButton,
  UserButton,
  useUser
} from "@clerk/clerk-react";
import CustomizedSnackbar from './CustomizedSnackbar';
import Navbar from './Navbar';
import Chat from './Chat';
import axios from 'axios'; //axios ek library hai jo backend/API call karne ke kaam aati hai.
import Background from './Backgroound';
import Landing from './Landing';
import "../App.css";


export default function Home() {
  const { isSignedIn, user } = useUser();
  const [openSnackbar,setOpenSnackbar]=useState(false);
  const onClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  useEffect(() => {
    const createUser = async () => {
      if (!user) return;

      try {
        const res = await axios.post("http://localhost:5000/api/users/create", {
          clerkId: user.id,
          name: user.fullName,
          email: user.emailAddresses[0].emailAddress,
        });
        setOpenSnackbar(true);
      } catch (error) {
        console.error("User creation failed:", error);
      }
    };

    if (isSignedIn) {
      createUser();
    }
  }, [isSignedIn, user]);

  return (
    <div className='home'>
      <Background/>
      <SignedOut>
        <Navbar />
        <Landing/>
      </SignedOut>

      <SignedIn>
        <Navbar />
        <CustomizedSnackbar open={openSnackbar} onClose={onClose}/>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <Chat />
      </SignedIn>
    </div>
  );
}
