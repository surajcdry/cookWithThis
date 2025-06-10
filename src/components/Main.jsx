import { useState } from "react"

export default function Main() {

    const [ingredientsList, setIngredientsList] = useState(["Onion", "Olive Oil", "Salt", "Pepper"])

    const ingredientsListItems = ingredientsList.map(ingredient => (
        <li key={ingredient}>{ingredient}</li>
    ))

    function handleSubmit(event) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const newIngredient = formData.get("ingredient")
        setIngredientsList(prevIngredients => {
            return [...prevIngredients, newIngredient]
        })
        event.currentTarget.reset()
    }

    return (
        <main>
            <form onSubmit={handleSubmit} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button>Add ingredient</button>
            </form>
            <ul>
                {ingredientsListItems}
            </ul>
        </main>
    )
}