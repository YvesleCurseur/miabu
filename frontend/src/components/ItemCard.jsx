import Image from "next/image"

const ItemCard = ({ item }) => {

  console.log(item)

  return (
    <>
    <div className='p-5 m-5 bg-white border-solid'>
      {/* Profil section */}
      <div className="flex space-x-5">
        <img src="https://images.unsplash.com/placeholder-avatars/extra-large.jpg?dpr=2&auto=format&fit=crop&w=27&h=27&q=60&crop=faces&bg=fff" alt="user" className="rounded-full" />
        <div>
          <h1>{item.name}</h1>
          <p>il y'a 5 min</p>
        </div>
      </div>
      {/* Titre du cadre */}
      <div className="mt-5">
        <h1>
          Devoir de python
        </h1>
      </div>
      {/* Contenu Texte ou Image */}
      <div className="mt-5">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis veniam ducimus libero quos quia. Aperiam iste quam, nemo vitae repellendus delectus, corrupti accusamus sint dicta quaerat ipsa deserunt commodi cupiditate.
      </div>
      {/* Boutton télécharger si Evaluation */}
        <div className="mt-5">
          <button className='px-4 py-2 text-white bg-rose-600 hover:bg-rose-700'>
            Télécharger
          </button>
        </div>
      
    </div>
    
    <div className='prompt_card'>
      <div className='flex justify-between items-start gap-5'>
        <div
          className='flex-1 flex justify-start items-center gap-3 cursor-pointer'
          // onClick={handleProfileClick}
        >
          <Image
            // src={post.creator.image}
            alt='user_image'
            width={40}
            height={40}
            className='rounded-full object-contain'
          />

          <div className='flex flex-col'>
            <h3 className='font-satoshi font-semibold text-gray-900'>
              Mo
            </h3>
            <p className='font-inter text-sm text-gray-500'>
              vd
            </p>
          </div>
        </div>

        {/* <div className='copy_btn' onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt={copied === post.prompt ? "tick_icon" : "copy_icon"}
            width={12}
            height={12}
          />
        </div> */}
      </div>

      <p className='my-4 font-satoshi text-sm text-gray-700'>f</p>
      <p
        className='font-inter text-sm blue_gradient cursor-pointer'
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        #sdfs
      </p>

      {/* {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
          <p
            className='font-inter text-sm green_gradient cursor-pointer'
            // onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className='font-inter text-sm orange_gradient cursor-pointer'
            // onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )} */}
    </div>
    </>
  )
}

export default ItemCard