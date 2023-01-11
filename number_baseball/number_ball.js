//DOM 연결
const $input = document.querySelector('#input');
const $form = document.querySelector('#form');
const $logs = document.querySelector('#logs');

// 숫자를 넣어둔 배열을 만든다. 
const numbers = [];
for(let i=1; i<10; i++){
  numbers.push(i);
}

// 숫자 무작위로 4개 뽑기 - 인덱스 사용
const answer = [];
for(let n=0; n<=3; n++){
  const index = Math.floor(Math.random() * numbers.length);
  answer.push(numbers[index]);
  numbers.splice(index, 1); // 뽑았으니 제거
}

console.log(answer);


//시도했는지 판별
const tries = [];
// 4자리인지? 중복된 숫자 있는지? 이미 시도한 값인지?
function checkInput(input) {
  if(input.length !==4){
    return alert('4자리 숫자를 입력해주시오.');
  }
  if(new Set(input).size !== 4){ // Set이라는 배열이 중복을 허용하지 않게 해준다.
    return alert('중복되지 않게 입력해 주세요.') // undefined 반환
  }
  if(tries.includes(input)){
    return alert('이미 시도한 값입니다.'); // undefined 반환
  }
  return true;
}

//답 제출 이벤트
$form.addEventListener('submit', (event) => {
  event.preventDefault(); // submit 새로고침 방지
  const value = $input.value;
  $input.value= '';
  const valid = checkInput(value);

  if(!valid){
    return;
  }
  if(answer.join('')===value) { // 배열의 요소를 문자열로 바꿔준다. [3, 1, 4, 6] -> 3146
    $logs.textContent = '홈런!';
    return;
  }
  if (tries.length >=9){
    const message = document.createTextNode(`패배! 정답은 ${answer.join('')}입니다.`);
    $logs.appendChild(message);
    return;
  }
  //몇 스트라이크 몇 볼인지 검사
  let strike=0;
  let ball=0;
  for(let i=0; i< answer.length;i++){
    const answerIndex = value.indexOf(answer[i]);
    if(answerIndex > -1){ // 해당 숫자가 있음
      if (answerIndex === i){ //strike
        strike += 1;
      } else{ // ball
        ball += 1;
      }
    }
  }
  $logs.append(`${value}: ${strike} 스트라이크 ${ball} 볼`, document.createElement('br'));
  tries.push(value);
})