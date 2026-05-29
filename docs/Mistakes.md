## Mistakes I Made While Creating the Create Post Feature

- I was trying to send files using JSON instead of FormData.
- I added `"Content-Type": "application/json"` while uploading images.
- I used `e.target.value` for file input instead of `e.target.files[0]`.
- The field name in `upload.single()` did not match the frontend field name.
- I forgot that file inputs should not have a `value` attribute.
- I used different names in the frontend and backend (`quote` vs `text`).
- My Mongoose schema field names did not match the data being sent from the frontend.
- I initially used `diskStorage()` with ImageKit instead of `memoryStorage()`.
- I did not understand how `FormData` works with multipart/form-data requests.


## Problem: Post Text Overflow

### Issue
Post text was overflowing outside the card/container when the content was too long.

### Cause
The text container did not have proper word wrapping and overflow handling styles.

### Solution
Added Tailwind CSS utility classes to wrap long text properly.

```jsx
<p className="whitespace-pre-wrap">
  {quote.text}
</p>
```