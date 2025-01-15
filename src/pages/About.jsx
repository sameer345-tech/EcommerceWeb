import React from 'react'

function About() {
  return (
    <div className="py-16 bg-white">
    <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
        <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
            <div className="md:5/12 lg:w-5/12">
                <img
                    src="https://img.freepik.com/free-vector/brainstorming-concept-landing-page_52683-26979.jpg?t=st=1734891239~exp=1734894839~hmac=075d4ea9856fe5d0f0d0c6b683bcef461922b7661cf05456dad1a56840ffb927&w=740"
                />
            </div>
            <div className="md:7/12 lg:w-6/12">
                <h2 className="text-2xl text-gray-900 font-bold md:text-4xl">
                    Revolutionize Your Shopping Experience
                </h2>
                <p className="mt-6 text-gray-600">
                    Explore a world of convenience with our cutting-edge e-commerce platform. From trending
                    products to unbeatable deals, we make shopping easy, fast, and fun.
                </p>
                <p className="mt-4 text-gray-600">
                    Enjoy secure payment options, quick delivery, and a curated selection of top brands, all 
                    designed to enhance your shopping journey. Start exploring today!
                </p>
            </div>
        </div>
    </div>
</div>

  )
}

export default About