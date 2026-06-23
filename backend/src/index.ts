import app from "./app";

const PORT = process.env.PORT || 3000;

// A Vercel usa a exportação do 'app' para criar a função serverless.
// O app.listen() só é necessário para desenvolvimento local.
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

export default app;
