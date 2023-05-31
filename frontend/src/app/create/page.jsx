"use client";

import ImageToText from "@/components/ImageToText";

const CreateTopic = () => {
  return (
  <section className='w-full max-w-full flex-start flex-col'>
    <div className='mt-10 w-full max-w-2xl flex flex-col gap-7'>
      <ImageToText />
    </div>
  </section>
  )
}

export default CreateTopic