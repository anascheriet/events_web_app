import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

export const Dashboard = () => {
  return (

    <section class="m-2 font-sans leading-normal flex">


      <div class="max-w-lg shadow-lg rounded overflow-hidden m-4 sm:flex">
        <div class="h-48 sm:h-auto sm:w-48 md:w-64 flex-none bg-cover bg-center rounded rounded-t sm:rounded sm:rounded-l text-center overflow-hidden" style={{
          backgroundImage: "url(" + "https://unsplash.it/804/800" + ")",
        }}  >
        </div>


        <div class="px-6 py-4">
          <h2 class="mb-2 font-black">Hello Tailwind!</h2>
          <p class="mb-4 text-grey-dark text-sm">
            Learning Tailwind is incredibly easy. The team has done a wonderful job with the documentation. This is pretty amazing, I must say.
           </p>

          <button class="py-3 px-6 bg-purple hover:bg-purple-light text-white font-bold rounded-full mt-1 mb-2">
            Hey, click me.
           </button>

        </div>

      </div>

    </section>)
}
