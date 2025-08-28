const fs = require('fs');


const jsonData = JSON.parse(fs.readFileSync('example.json', 'utf8'));


function decodeValue(value, base) {
  return parseInt(value, parseInt(base));
}


const dataPoints = [];
for (const key in jsonData) {
  if (key !== 'keys') {
    const x = parseInt(key);
    const y = decodeValue(jsonData[key].value, jsonData[key].base);
    dataPoints.push({ x, y });
  }
}

console.log('Decoded dataPoints:', dataPoints);


function lagrangeInterpolation(x, points) {
  let result = 0;
  const n = points.length;

  for (let i = 0; i < n; i++) {
    let Li = 1; 

    for (let j = 0; j < n; j++) {
      if (i !== j) {
        Li *= (x - points[j].x) / (points[i].x - points[j].x);
      }
    }

    result += points[i].y * Li;
  }
  return result;
}


const xToInterpolate = 0; 
const interpolatedValue = lagrangeInterpolation(xToInterpolate, dataPoints);

console.log(`The constant c at x = ${xToInterpolate}: ${interpolatedValue}`);