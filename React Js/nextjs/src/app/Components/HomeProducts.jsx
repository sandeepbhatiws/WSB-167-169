import React from 'react'
import ProductCard from './ProductCard'

export default function HomeProducts({ title, description, products }) {
    return (
        <>
            {/* <!-- title --> */}
            <div class="text-center p-10">
                <h1 class="font-bold text-4xl mb-4">{title}</h1>
                <h4 class="text-1xl">{description}</h4>
            </div>

            {/* <!-- ✅ Grid Section - Starts Here 👇 --> */}
            <section class="w-fit mx-auto grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">

                {
                    products.map((item,index) => {
                        return(
                            <ProductCard key={index} data={item} />
                        )   
                    })
                }

            </section>

            {/* <!-- 🛑 Grid Section - Ends Here --> */}

        </>
    )
}
