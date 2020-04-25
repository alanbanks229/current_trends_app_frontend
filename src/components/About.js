import React from 'react';
import { Link } from 'react-router-dom';

export default function About() {
	return (
		<div className="About">
			<h2>Current-Trends</h2>
			<div className="buttons">
			</div>
			<div className="about">
				<h2>About . . . </h2>
				<p>
					Welcome to <b>Draw-Off</b>, an application where you and other users can have a friendly "draw off"
					contest and see who can draw the best picture:<br /> </p>
					<p style={{fontSize: 13, textAlign: "center"}}>(Which will be based upon the number of upvotes a drawing
					receives from their peers!)</p>
				<br />
				<div>
					<h3>How to Begin?</h3>
					<p>
						If you haven't already,sign up and create an account to get started!<br/>
						After doing so, you can either <em>"host"</em> or <em>"join"</em> a room by clicking on the <b>menu</b> tab
						(top-left) and clicking <b>"Create or Join Room"</b>
					</p>
					<br />
					<h3>Quick Notes:</h3>
					<ul>
						<li>In order to join a room you must know the Host's room number in order to enter!</li>
						<li>
							There is a limit on how many users can be in a lobby, <i>specified by the host</i>
						</li>
						<li>
							When the Game begins you have a time limit to draw your prompt <i>gotta go fast</i>
						</li>
						<br />
					</ul>
				</div>
			</div>
			<div className="footer">Created with React, Redux, & Ruby on Rails... Powered By NEWS API</div>
		</div>
	);
}
