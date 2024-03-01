todo:

- grab data from filename
- internationalization
- global variables
- documentation
- as in sveltekit, infer types for db.page() automatically, without passing a value inside

- xml?
- also IF? and FOR? components?
- - it becomes a xml-like language but with functiionality
- also props as components?

- usare AI per tradurre i pdf in file svelte (e anche Notion)

- import collection also from index.ts ( but also json and other, yaml!)

syntax: export const document = create_document()
typescript will take care of explaining

---

- "inline" properties like:

```svelte
<Page>
	// Sets the context
	<p>Normal text description</p>
	<P name="quantity" value={10} /> // Sets the value in the context
</Page>
```

We'll then need something to extract the values and make them type-safe

---
