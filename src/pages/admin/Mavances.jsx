import React from 'react';
import Banner from "../../media/banner-avances.png";

const Mavances = () => {
	return (
		<div className="flex flex-col items-center min-h-screen py-2 bg-white">
            <div>
				<img src={Banner} alt="Mavances" className='mb-10 w-full h-30'></img>
			</div>
		</div>
	);
};

export default Mavances;