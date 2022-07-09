import React from 'react'
import Link from 'next/link'


import { useState, useEffect } from 'react'
import { getCategories } from '../services'

const Header = () => {
	const [categories, setCategories] = useState([])
	useEffect(() => {
		getCategories().then((newCategories) => setCategories(newCategories));

		// return () => {
		//   second
		// }
	}, [])

	return (
		<div className='container mx-auto px-10 mb-8'>
			<div className='border-b w-full inline-block border-blue-200 py-8'>
				<div className="md:float-left block">
					<Link href='/'>
						<span className="cursor-pointer font-bold text-white text-4xl">
							Algorithm.cpp
						</span>
					</Link>
				</div>

				<div className='hidden md:float-left md:contents'>
					{categories.map((category) => (
						<Link key={category.slug} href={`/category/${category.slug}`}>
							<span className='md:float-right mt-2 align-middle ml-4 text-white cursor-pointer font-semibold'>
								{category.name}
							</span>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}

export default Header