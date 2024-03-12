const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');

const app = express();

app.use(
  cors({
    origin: '*', // 모든 출처 허용 옵션. true 를 써도 된다.
  })
);
app.use(bodyParser.json());

app.get('/server-products', (req, res) => {
  // 데이터베이스에서 products 데이터를 가져옵니다.
  const products = [
    {
      id: 1,
      name: 'Product 1',
      price: 100,
    },
    {
      id: 2,
      name: 'Product 2',
      price: 200,
    },
  ];

  // products 데이터를 JSON 형식으로 응답합니다.
  res.json(products);
});

app.post('/products', (req, res) => {
  // 요청 본문에서 제품 정보 추출
  const { name, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({ message: '제품 이름 또는 가격이 누락되었습니다.' });
  }

  if (isNaN(price)) {
    return res.status(400).json({ message: '가격은 숫자여야 합니다.' });
  }

  // return res.status(500).json({ message: '서버 오류가 발생했습니다.' });

  // 데이터베이스에 제품 정보 저장 (실제 코드에서는 DB 연동 필요)
  console.log(`제품 정보 저장: ${name}, ${price}`);

  // 성공 응답
  res.json({ message: '제품 정보가 성공적으로 저장되었습니다.' });
});

app.listen(4000, () => {
  console.log('Server is listening on port 4000');
});
