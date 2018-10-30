module.exports = [
  'https://m.360buyimg.com/mobilecms/jfs/t1/6413/36/1805/120073/5bce77d9E47550071/0650fbc095151918.jpg!cr_1125x549_0_72',
  'https://m.360buyimg.com/mobilecms/jfs/t1/6854/23/399/138158/5bc88e2cEb10f9735/26a314424cf63809.jpg!cr_1125x549_0_72',
  'https://m.360buyimg.com/mobilecms/jfs/t1/5346/39/11710/131110/5bcfd883E354407a3/1542417ba1c26055.jpg!cr_1125x549_0_72',
  'https://m.360buyimg.com/mobilecms/jfs/t1/5346/39/11710/131110/5bcfd883E354407a3/1542417ba1c26055.jpg!cr_1125x549_0_72'
];

//用json放数据比较好
//因为如果我们用fs.writeFile写入数据会把这个文件的内容覆盖掉，到时候module exports也会被覆盖掉，就会有错误
//用json就不会有这个问题。
