import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link } from "react-router-dom";

const initialValue = {
	email: "",
	password: "",
};

export const Home = () => {

	return (
		<>
			<h2 className="text-center mt-3">Welcome!</h2>

			<p className="text-center mt-5"> This project simulates an aplication with React and Flask functionality. Wanna try it out? Click  the sign up button if you are new, or log in if know the flow 😎</p>

			<div className="d-flex justify-content-center gap-3">
				<Link to="/register" className=""><button className="btn btn-warning "> Sign up!</button></Link>
				<p>or</p>
				<Link to="/login" className=""><button className="btn btn-success "> Log in</button></Link>

			</div>
		</>
	)
};
