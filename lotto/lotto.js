//DOM 연결
const $result = document.getElementById("result");
const $bonus = document.getElementById("bonus");

const selectedNumbers =[];
// 공 45개 만들기
const numbers= Array(45).fill().map((v,i)=>{
  return i + 1;
})

// 번호 추출
for(let i=0; i<7; i++){
  const index = Math.floor(Math.random()*numbers.length); 
  selectedNumbers.push(numbers[index]);
  numbers.splice(index, 1);
}
console.log(selectedNumbers);
// 보너스 넘버
const bonus = selectedNumbers[selectedNumbers.length-1];

//비동기 공 추출
for(let j=0; j<selectedNumbers.length-1; j++){
  setTimeout(()=>{
  const $ball = document.createElement('div');
  $ball.className = 'ball';
  $ball.textContent = selectedNumbers[j];
  $result.appendChild($ball);
}, 1000 * (j+1));
}

setTimeout(()=>{
  const $ball = document.createElement('div');
  $ball.className= 'ball';
  $ball.textContent = bonus;
  $bonus.appendChild($ball);
},7000)


