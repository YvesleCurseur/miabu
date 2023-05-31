"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@/components/Form";
import ImageToText from "@/components/ImageToText";

const CreateTopic = () => {
    const router = useRouter();
    const { data: session } = useSession();
    
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: "",
        tag: "",
    });

    // const createPrompt = async (e) => {
    //   // prevent reloading
    //   e.preventDefault();
    //   setSubmitting(true);

    //   try {
    //     const response = await fetch("/api/prompt/new", {
    //       method: "POST",
    //       body: JSON.stringify({
    //         prompt: post.prompt,
    //         tag: post.tag,
    //         userId: session?.user.id
    //       }),
    //     });
      
    //     if (response.ok) {
    //       router.push("/");
    //     }

    //   } catch (error) {
    //     console.log(error);
    //   } finally {
    //     setSubmitting(false);
    //   }
    // };

  return (
    <section className='w-full max-w-full flex-start flex-col'>
      <div className='mt-10 w-full max-w-2xl flex flex-col gap-7'>
        <ImageToText />
      </div>
    </section>
  )
}

export default CreateTopic;