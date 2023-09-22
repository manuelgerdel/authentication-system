import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

const Private = () => {
    const { store, actions } = useContext(Context)
    const navigate = useNavigate();
    useEffect(() => {
        if (store.token === "" || !store.token) {
            navigate("/");
            return;
        }
        actions.getPrivateData()

    }, [store.token]);

    return (
        <>
            <div className="text-center">
                <h1>Private route</h1>

                <p>Congratulations! If you are here it means you are the coolest person alive :D</p>

            </div>



            {store.userData ? (
                <>

                    <div className="container d-flex justify-content-center">
                        <div className="card w-25">
                            <div className="card-body">
                                <h5 className="card-title">User Information</h5>
                                <p className="card-text"><b>ID:</b> {store.userData.id}</p>
                                <p href="#" className="card-link"> <b>Email:</b> {store.userData.email}</p>
                            </div>
                        </div>
                    </div>

                </>
            )
                :
                <div>
                    No information on system
                </div>}



            <div className="text-center">
                <p>You can log out if you want:</p>
                <button className="btn btn-danger" onClick={actions.logoutUser}>Log out</button>
            </div>

        </>

    )
}

export default Private;