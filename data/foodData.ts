import { FoodItem } from '../types';

// FIX: Add type assertion `as FoodItem[]` to the array literal.
// This provides a contextual type to the array before .sort() is called,
// preventing TypeScript from incorrectly widening the types of properties
// like 'category' from a string literal (e.g., "fruit") to the general `string` type.
export const foodData: FoodItem[] = ([
  // Fruits
  { id:"apple_raw", name:"Apple, raw", category:"fruit", per100g:{kcal:52,protein_g:0.3,carbs_g:14,fat_g:0.2,fiber_g:2.4}, servings:[{unit:"g",grams:100},{unit:"piece",grams:182},{unit:"cup",grams:125}], source:"LOCAL" },
  { id:"banana_raw", name:"Banana, raw", category:"fruit", per100g:{kcal:89,protein_g:1.1,carbs_g:23,fat_g:0.3,fiber_g:2.6}, servings:[{unit:"g",grams:100},{unit:"piece",grams:118}], source:"LOCAL" },
  { id:"orange_raw", name:"Orange, raw", category:"fruit", per100g:{kcal:47,protein_g:0.9,carbs_g:12,fat_g:0.1,fiber_g:2.4}, servings:[{unit:"g",grams:100},{unit:"piece",grams:131}], source:"LOCAL" },
  { id:"strawberry_raw", name:"Strawberry, raw", category:"fruit", per100g:{kcal:32,protein_g:0.7,carbs_g:8,fat_g:0.3,fiber_g:2}, servings:[{unit:"g",grams:100},{unit:"cup",grams:152}], source:"LOCAL" },
  { id:"blueberry_raw", name:"Blueberry, raw", category:"fruit", per100g:{kcal:57,protein_g:0.7,carbs_g:14,fat_g:0.3,fiber_g:2.4}, servings:[{unit:"g",grams:100},{unit:"cup",grams:148}], source:"LOCAL" },
  { id:"avocado_raw", name:"Avocado, raw", category:"fruit", per100g:{kcal:160,protein_g:2,carbs_g:9,fat_g:15,fiber_g:7}, servings:[{unit:"g",grams:100},{unit:"piece",grams:200}], source:"LOCAL" },
  
  // Vegetables
  { id:"broccoli_raw", name:"Broccoli, raw", category:"vegetable", per100g:{kcal:34,protein_g:2.8,carbs_g:7,fat_g:0.4,fiber_g:2.6}, servings:[{unit:"g",grams:100},{unit:"cup",grams:91}], source:"LOCAL" },
  { id:"spinach_raw", name:"Spinach, raw", category:"vegetable", per100g:{kcal:23,protein_g:2.9,carbs_g:3.6,fat_g:0.4,fiber_g:2.2}, servings:[{unit:"g",grams:100},{unit:"cup",grams:30}], source:"LOCAL" },
  { id:"carrot_raw", name:"Carrot, raw", category:"vegetable", per100g:{kcal:41,protein_g:0.9,carbs_g:10,fat_g:0.2,fiber_g:2.8}, servings:[{unit:"g",grams:100},{unit:"piece",grams:61}], source:"LOCAL" },
  { id:"cucumber_raw", name:"Cucumber, raw (with peel)", category:"vegetable", per100g:{kcal:15,protein_g:0.7,carbs_g:3.6,fat_g:0.1,fiber_g:0.5}, servings:[{unit:"g",grams:100},{unit:"piece",grams:200}], source:"LOCAL" },
  { id:"tomato_raw", name:"Tomato, raw", category:"vegetable", per100g:{kcal:18,protein_g:0.9,carbs_g:3.9,fat_g:0.2,fiber_g:1.2}, servings:[{unit:"g",grams:100},{unit:"piece",grams:123}], source:"LOCAL" },
  { id:"sweet_potato_cooked", name:"Sweet Potato, cooked, baked in skin", category:"vegetable", per100g:{kcal:90,protein_g:2,carbs_g:21,fat_g:0.1,fiber_g:3.3}, servings:[{unit:"g",grams:100},{unit:"piece",grams:180}], source:"LOCAL" },
  
  // Meats
  { id:"chicken_breast_cooked", name:"Chicken breast, cooked (skinless)", category:"meat", per100g:{kcal:165,protein_g:31,carbs_g:0,fat_g:3.6}, servings:[{unit:"g",grams:100},{unit:"oz",grams:28.35},{unit:"piece",grams:172}], source:"LOCAL" },
  { id:"salmon_cooked", name:"Salmon, Atlantic, wild, cooked", category:"meat", per100g:{kcal:182,protein_g:25,carbs_g:0,fat_g:8}, servings:[{unit:"g",grams:100},{unit:"oz",grams:28.35}], source:"LOCAL" },
  { id:"beef_steak_cooked", name:"Beef, sirloin steak, cooked", category:"meat", per100g:{kcal:206,protein_g:30,carbs_g:0,fat_g:9}, servings:[{unit:"g",grams:100},{unit:"oz",grams:28.35}], source:"LOCAL" },
  { id:"pork_chop_cooked", name:"Pork chop, cooked", category:"meat", per100g:{kcal:221,protein_g:29,carbs_g:0,fat_g:11}, servings:[{unit:"g",grams:100},{unit:"oz",grams:28.35}], source:"LOCAL" },
  { id:"ground_beef_cooked_90_10", name:"Ground Beef, 90% lean, cooked", category:"meat", per100g:{kcal:217,protein_g:26,carbs_g:0,fat_g:12}, servings:[{unit:"g",grams:100},{unit:"oz",grams:28.35}], source:"LOCAL" },

  // Dry Fruits & Nuts
  { id:"almonds_raw", name:"Almonds, raw", category:"dry-fruit", per100g:{kcal:579,protein_g:21.2,carbs_g:21.6,fat_g:49.9,fiber_g:12.5}, servings:[{unit:"g",grams:100},{unit:"oz",grams:28.35},{unit:"cup",grams:143}], source:"LOCAL" },
  { id:"walnuts_raw", name:"Walnuts, raw", category:"dry-fruit", per100g:{kcal:654,protein_g:15.2,carbs_g:13.7,fat_g:65.2,fiber_g:6.7}, servings:[{unit:"g",grams:100},{unit:"oz",grams:28.35}], source:"LOCAL" },
  { id:"peanuts_raw", name:"Peanuts, raw", category:"dry-fruit", per100g:{kcal:567,protein_g:25.8,carbs_g:16.1,fat_g:49.2,fiber_g:8.5}, servings:[{unit:"g",grams:100},{unit:"oz",grams:28.35}], source:"LOCAL" },
  { id:"cashews_raw", name:"Cashews, raw", category:"dry-fruit", per100g:{kcal:553,protein_g:18.2,carbs_g:30.2,fat_g:43.9,fiber_g:3.3}, servings:[{unit:"g",grams:100},{unit:"oz",grams:28.35}], source:"LOCAL" },
  
  // Dairy & Eggs
  { id:"egg_boiled", name:"Egg, whole, hard-boiled", category:"dairy", per100g:{kcal:155,protein_g:13,carbs_g:1.1,fat_g:11}, servings:[{unit:"g",grams:100},{unit:"piece",grams:50}], source:"LOCAL" },
  { id:"milk_whole", name:"Milk, whole, 3.25% fat", category:"dairy", per100g:{kcal:61,protein_g:3.2,carbs_g:4.8,fat_g:3.3}, servings:[{unit:"g",grams:100},{unit:"cup",grams:244}], source:"LOCAL" },
  { id:"greek_yogurt_plain", name:"Yogurt, Greek, plain, non-fat", category:"dairy", per100g:{kcal:59,protein_g:10,carbs_g:3.6,fat_g:0.4}, servings:[{unit:"g",grams:100},{unit:"cup",grams:227}], source:"LOCAL" },
  { id:"cheddar_cheese", name:"Cheese, cheddar", category:"dairy", per100g:{kcal:404,protein_g:25,carbs_g:1.3,fat_g:33}, servings:[{unit:"g",grams:100},{unit:"oz",grams:28.35},{unit:"slice",grams:28}], source:"LOCAL" },

  // Grains
  { id:"white_rice_cooked", name:"White Rice, cooked", category:"grain", per100g:{kcal:130,protein_g:2.7,carbs_g:28,fat_g:0.3}, servings:[{unit:"g",grams:100},{unit:"cup",grams:158}], source:"LOCAL" },
  { id:"brown_rice_cooked", name:"Brown Rice, cooked", category:"grain", per100g:{kcal:111,protein_g:2.6,carbs_g:23,fat_g:0.9,fiber_g:1.8}, servings:[{unit:"g",grams:100},{unit:"cup",grams:195}], source:"LOCAL" },
  { id:"quinoa_cooked", name:"Quinoa, cooked", category:"grain", per100g:{kcal:120,protein_g:4.4,carbs_g:21,fat_g:1.9,fiber_g:2.8}, servings:[{unit:"g",grams:100},{unit:"cup",grams:185}], source:"LOCAL" },
  { id:"oats_raw", name:"Oats, rolled, raw", category:"grain", per100g:{kcal:389,protein_g:16.9,carbs_g:66,fat_g:6.9,fiber_g:10.6}, servings:[{unit:"g",grams:100},{unit:"cup",grams:81}], source:"LOCAL" },
  { id:"whole_wheat_bread", name:"Bread, whole wheat", category:"grain", per100g:{kcal:265,protein_g:13,carbs_g:48,fat_g:3.4,fiber_g:7}, servings:[{unit:"g",grams:100},{unit:"slice",grams:32}], source:"LOCAL" },

  // Other
  { id:"olive_oil", name:"Olive Oil", category:"other", per100g:{kcal:884,protein_g:0,carbs_g:0,fat_g:100}, servings:[{unit:"g",grams:100},{unit:"tbsp",grams:14}], source:"LOCAL" },
  { id:"dark_chocolate_70", name:"Dark Chocolate, 70-85% cacao", category:"other", per100g:{kcal:598,protein_g:7.8,carbs_g:46,fat_g:43,fiber_g:11}, servings:[{unit:"g",grams:100},{unit:"oz",grams:28.35}], source:"LOCAL" },
  { id:"peanut_butter", name:"Peanut Butter, smooth", category:"other", per100g:{kcal:588,protein_g:25,carbs_g:20,fat_g:50,fiber_g:6}, servings:[{unit:"g",grams:100},{unit:"tbsp",grams:16}], source:"LOCAL" }
] as FoodItem[])
.sort((a, b) => a.name.localeCompare(b.name));