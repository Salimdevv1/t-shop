import React from 'react'
import 'flowbite';


export default function Contact() {
  return (
    <div>
      <section className='contact-container'>
        <h2 style={{textAlign :"center", marginTop : 40,  fontSize : 40}}>Contact Us</h2>
        <br />
        <center><p className='contact-p'>Our contact section is your gateway to reaching out to us. Whether you have questions, suggestions, or just want to connect,
           feel free to use the provided contact details to get in touch with us. We're here to listen and engage with you.</p></center>
        <div className='feedback-container'>
            <form  className='form' action="https://airform.io/slam.salim2006@gmail.com" method="post">
                <input className='inputField' type="text" placeholder="Name" name='name' required/>
                <input className='inputField' type="email" placeholder="Email" name='email' required />
                <textarea className='inputField textArea' placeholder="Message" name='message' required></textarea>
                <button className='submit-btn'>Submit</button>
            </form>
        </div>
      </section>
      <br />
      <br />
    </div>
  )
}
