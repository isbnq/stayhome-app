import { RecipeData } from "@mytypes/data/recipe-data";

export const mockRecipeData: RecipeData = {
  //"id": "unique_recipe_id",
  //"userId": "user_id",
  
  "imageUrl": "https://rutxt.ru/files/16449/final/894d3d70d4.JPG",
  "title": "Оладьи на молоке",
  "description": "Оладьи на молоке - отличный вариант для завтрака. Принято считать, что оладьи готовят на кефире. Сегодня эту догму развеем и приготовим классические оладушки на молоке. По этому рецепту они получаются нежными, средней толщины, хорошо жарятся даже без масла, просто на сухой сковороде с антипригарным покрытием.",
  
  "servings": 4,
  "cookingTime": 30,
  "kcalories": 227,

  "protein": 6,
  "fat": 9,
  "carbohydrates": 30,
  
  "ingredients": [
    {
      "product": {
        "name": "Мука",
        "type": "drybulk"
      },
      "quantity": {
        "gram": 200,
        "milliliter": 340,
        "piece": null,
        "defaultViewUnit": "gram"
      }
    },
    {
      "product": {
        "name": "Молоко",
        "type": "liquid"
      },
      "quantity": {
        "gram": 310,
        "milliliter": 300,
        "piece": null,
        "defaultViewUnit": "milliliter"
      }
    },
    {
      "product": {
        "name": "Яйца",
        "type": "solid"
      },
      "quantity": {
        "gram": null,
        "milliliter": null,
        "piece": 2,
        "defaultViewUnit": "piece"
      }
    },
    {
      "product": {
        "name": "Сахар",
        "type": "drybulk"
      },
      "quantity": {
        "gram": 50,
        "milliliter": 65,
        "piece": null,
        "defaultViewUnit": "tablespoon"
      }
    },
    {
      "product": {
        "name": "Разрыхлитель",
        "type": "drybulk"
      },
      "quantity": {
        "gram": 5,
        "milliliter": 8,
        "piece": null,
        "defaultViewUnit": "teaspoon"
      }
    },
    {
      "product": {
        "name": "Соль",
        "type": "drybulk"
      },
      "quantity": {
        "gram": null,
        "milliliter": null,
        "piece": null,
        "defaultViewUnit": null
      }
    }
  ],
  "instruction": [
    {
      "imageUrl": null,
      "text": "В большой миске смешайте муку, сахар и разрыхлитель."
    },
    {
      "imageUrl": null,
      "text": "Добавьте яйца и молоко и перемешивайте, пока тесто не станет однородным."
    },
    {
      "imageUrl": null,
      "text": "Разогрейте слегка смазанную маслом сковороду на средне-сильном огне. Вылейте тесто на сковороду, используя примерно по 1/4 стакана на каждый блинчик. Подрумяньте с обеих сторон и подавайте горячим."
    }
  ],
  "notes": [
    {
      "text": "Для достижения наилучшего результата дайте тесту постоять несколько минут перед приготовлением."
    },
    {
      "text": "Вы можете добавить в тесто горсть свежей черники или шоколадную стружку, чтобы придать ему пикантный вкус."
    }
  ]
}
