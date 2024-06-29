import { FormControlDeep } from "@type-utils/reactive-forms"

export type RecipeData = {
  // id: string,

  // userId: string,

  //likes: number,
  //editedTime: string,

  imageUrl: string | null,

  title: string,
  description: string,

  servings: number,
  cookingTime: number,  // minutes

  kcalories: number | null,  // kcal by 100 grams

  protein: number | null,  // grams by 100 grams
  fat: number | null,  // grams by 100 grams
  carbohydrates: number | null,  // grams by 100 grams

  ingredients: {
    product: {
      name: string,
      // 'liquid' | 'drybulk' | 'solid'
      type: string,
    }
    quantity: {
      gram: number | null,  // weight
      milliliter: number | null,  // volume
      piece: number | null,
      // 'milliliter' | 'liter' | 'gram' | 'kgram' | 'piece' | 'teaspoon' | 'tablespoon'
      defaultViewUnit: string | null
    }
  }[]

  instruction: {
    imageUrl: string | null,
    text: string,
  }[]

  notes: {
    text: string,
  }[]
}

export type IngredientQuantityData = NonNullable<RecipeData['ingredients'][number]['quantity']>;
