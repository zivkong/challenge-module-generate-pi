# Getting Started

1. Clone this repo
2. Rename .env.sample to .env and fill-in mongo DB connections
3. npm i
4. npm run start

## API References

| Path          | Method | Description       |
| ------------- | ------ | ----------------- |
| /health/check | GET    | Health checker    |
| /pi/generate  | POST   | Generate Pi Value |

## Generate Pi API Body

```javascript
{
  increase: 1 // Number | default: 1 | optional - Number of decimals / iterations.
}
```
