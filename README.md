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

- <List data="<Array>" separator=", ">
  Todo componente da fare.

importare proprietà da filename
funzione: crea_collezione<T extends TAnySchema>(
schema: T
properties: (data: StaticDecode<T>, db: DB) => Oggetto con funzioni / proprietà calcolate
)
all'interno
T.Transform(schema).Decode(data => {...data, ...properties}).Encode(full_object => Value.Clean(schema))

Ci sono da qualche parte specificati i locale
F.Translate(schema: TAnySchema) =>
{
"it": schema,
"en": schema,
}
\+ componente per tradurre

-

string[] or string field

-

make `Page` component that uses the $page store to get the current collection document

--

check todo
important transform function for fields

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
