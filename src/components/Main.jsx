import { useState, useRef, useEffect } from "react"
import IngredientsList from "./IngredientsList"
import Recipe from "./Recipe"
import { getRecipeFromGroq } from "../ai"

export default function Main() {

    const [ingredients, setIngredients] = useState([])
    const [recipe, setRecipe] = useState("")
    const recipeSection = useRef(null)

    useEffect(() => {
        if (recipe != "" && recipeSection.current != null) {
            recipeSection.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [recipe])

    async function getRecipe(userAPI) {
        try {
            const recipeMarkdown = await getRecipeFromGroq(ingredients, userAPI)
            setRecipe(recipeMarkdown)
        } catch (err) {
            console.error("Error: " + err.message)
        }
    }

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient")
        setIngredients(prevIngredients => [...prevIngredients, newIngredient])
    }

    return (
        <main>
            <form action={addIngredient} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. oregano (at least 4 ingredients)"
                    aria-label="Add ingredient"
                    name="ingredient"
                    required
                />
                <button>Add ingredient</button>
            </form>
            {ingredients.length > 0 && <IngredientsList ingredients={ingredients} getRecipe={getRecipe} ref={recipeSection} />}
            {recipe && < Recipe recipe={recipe} />}
        </main>
    )
}
