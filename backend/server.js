const PORT = 8383
import app from './src/app.js';

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});