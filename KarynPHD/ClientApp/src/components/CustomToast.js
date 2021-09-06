import React, { Component } from 'react';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class CustomToast extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          
        };         
    }

    toastError = (text) => toast.error(text, {
        position: "bottom-center",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        });

    toastInfo = (text) => toast.info(text, {
        position: "bottom-center",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        });



    dismissAll = () =>  toast.dismiss();

    render(){
        return(
            <>  
                <ToastContainer transition={Slide} />
            </>
        )
    }

}