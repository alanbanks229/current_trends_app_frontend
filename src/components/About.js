import React from 'react';
import { Link } from 'react-router-dom';
import NavBarContainer from '../containers/Navbar.js';
import './about.css'

export default function About(props) {
	return (
		<>
		<NavBarContainer props={props}/>
		<div className="About">
			<h1>Current-Trends</h1>
			<p>(online news search engine)</p>
			<hr/>
				<div className="about">
				<h2>About . . . </h2><br/>
				<p>
				Staying current is key in our fast-paced world. Most people wouldn’t even consider getting a physical morning newspaper anymore, so we depend on digital sources for our news.<br/> <br/> From this idea, I wanted to create an app that helps you get the news you want in a timely manner whether it is local or news around the world.<br/>
				
				</p>
				</div>
				<br />
				<hr/>
				<div className="functionality_app">
					<h2>How does this application work?</h2><br/>
					<p>
					This application is essentially an online web search engine specifically geared towards retrieving news articles around the world. <br/> 
					<br/> This is made possible through implementing <b>NEWSAPI</b> and <b>Microsoft Azure's News Search API.</b>
					</p>
					<br />
					<hr/>
				</div>
				<div className="quick_notes_usage">
					<h2>Quick Notes/Usage</h2>
					<ul>
						<li>On default the search bar, will sort by top-headlines within the United States, if you get a response of zero articles you should switch <b>filters</b> from top-headlines to everything</li>
						<li>
						You can only access the weather forecast if you create an account and click calibrate in the top right navbar!
						</li>
						<li>
						You can bookmark any news article you see that gets created! You can also remove those bookmarks
						</li>
						<br />
					</ul>
				</div>
				<hr/>
			<div className="footer"><h3>Created with Javascript, React, Redux, & Ruby on Rails... <br/><br/><br/> Powered By </h3><br/> <h4>NEWS API  |  Microsoft Azure Bing News Search API  |  Weather API</h4></div>
		</div>
		</>
	);
}
