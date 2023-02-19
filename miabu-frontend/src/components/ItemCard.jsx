import React from 'react'

const ItemCard = ({ item }) => {

  return (
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
      { item.type === 'Evaluation' && (
        <div className="mt-5">
          <button className='px-4 py-2 text-white bg-rose-600 hover:bg-rose-700'>
            Télécharger
          </button>
        </div>)
      }
      
    </div>
  )
}

export default ItemCard