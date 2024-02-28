todo:

- grab data from filename
- internationalization
- global variables
- documentation
- as in sveltekit, infer types for db.page() automatically, without passing a value inside

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
