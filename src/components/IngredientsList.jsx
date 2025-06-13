export default function IngredientsList(props) {
    const ingredientsListItems = props.ingredients.map(ingredient => (
        <li key={ingredient}>{ingredient}</li>
    ))

    function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const userAPI = formData.get("groq-api")

        if (!userAPI || !userAPI.startsWith('gsk_')) {
            alert(('Please enter a valid Groq API key'))
            return
        }

        props.getRecipe(userAPI)
    }

    return (<section>
        <h2>Ingredients on hand:</h2>
        <ul className="ingredients-list" aria-live="polite">{ingredientsListItems}</ul>
        {props.ingredients.length > 3 && <div className="get-recipe-container">
            <div>
                <h3>Ready for a recipe?</h3>
                <p>Generate a recipe from your list of ingredients.</p>

            </div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="groq-api">Groq API key: </label>
                <input type="text" id="groq-api" name="groq-api" placeholder="gsk_*****" required />
                <br />
                <br />
                <a href="https://console.groq.com/keys" className="groq-tutorial" target="_blank">Click here to get a Groq API key</a>
                <br />
                <br />
                <button type="submit">Get a recipe</button>
            </form>
        </div>}
    </section>)
}