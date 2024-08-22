import React from 'react'

export default function Search() {
      
  return (
    <>
  <div id="search">
	<svg viewBox="0 0 420 60" xmlns="http://www.w3.org/2000/svg">
		<rect className="bar"/>
		
		<g className="magnifier">
			<circle className="glass"/>
			<line className="handle" x1="32" y1="32" x2="44" y2="44"></line>
		</g>
	</svg>
	<input type="search" placeholder='search..'  aria-label="Search for inspiration"/>
	<br></br>
	<button className='search-button' >Search</button>
</div>
<h3 className='text'>
	Please search the data...
</h3>
<div id="results"></div>
    </>
  )
}
