const num_bth = document.querySelectorAll('.num_bth');
const display = document.getElementById('display');
let total = 0;
let state = 'start';     //変数stateに入力中の状態について代入していく
let mode = 'integer_mode'; 

//1〜9のボタンが押された時の処理
  const one_nine = document.querySelectorAll('.one_nine');
  one_nine.forEach(index => {
    index.addEventListener('click', () => {
      if(state === 'start') {    //状態がディスプレイに入力されておらず開始時の状態
        total = index.dataset.indexId;     //はじめの一文字（数字）が入力される
      }else if(state === 'finish') {    //＝が押された時（finish）
        reset();     //さらにボタンが押された時に初期化され
        total = index.dataset.indexId;     //新たに最初の一文字（数字）が入力される
      }else if(state === 'calculation'||state === 'calBtn'){     //連続して数字ボタンが押されている途中もしくは演算子が入力された時
        total += index.dataset.indexId;     //入力中の並びの末尾に新たに数字が入力される
      }     
      display.textContent = total;     //ディスプレイ部分に表示される
      state = 'calculation'     //この1〜９のボタンが押された後の状態はcalculation状態とされる
    })
  })

//0のボタンが押された時の処理
const zero = document.getElementById('zero');
zero.addEventListener('click', () => {
if(state==='start'||state==='finish'||state==='calBtn'){     //状態が開始時、もしくはイコールの後、もしくは演算子ボタンの入力後
    if(display.textContent.slice(-1) === '0') {     //末尾の0を抜き取る
      return;     //入力前に戻る
    }
  }

  if(state==='start') {    //start状態の時
    total = zero.dataset.indexId;     //はじめの一文字を0とする
  }else{
    total += zero.dataset.indexId;     //そうじゃない時は末尾に0を付け加える
  }      
  display.textContent = total;
})   

//.のボタンが押された時の処理
const point = document.getElementById('point');
point.addEventListener('click', () => {
  if(mode === 'decimal_mode'){     //すでに小数点モードの時は
    return;     //元の状態に戻る
     }      
  if(state==='start'||state==='finish') {     //計算がすでに終了しているときは
    total = 0;     //0の状態に戻る
  }else if(state==='calBtn'){     //演算子の後に小数点ボタンが押された場合は
    if(display.textContent.slice(-1)!=='0'){     //文字列上の末尾の小数点を抜き取る
      total += 0;     //
    }   
  }
  total += point.dataset.indexId;     //末尾に小数点がつく

  display.textContent = total;     //
  state = 'calculation'     //数字入力中状態
  mode = 'decimal_mode';     //小数モード
}) 

//+-*/のボタンが押された時の処理
const cal = document.querySelectorAll('.cal');
cal.forEach(index => {     
  index.addEventListener('click', () => {
    if(state === 'start') {     //start状態では
      return;     //入力前の状態に戻る
    }else if(state === 'calculation'){     //数字の入力後であれば
      total += index.dataset.indexId;     //文字の末尾に演算子が追加される
    }else if(state === 'finish'){     //計算終了後の時は
      total = display.textContent;
      total += index.dataset.indexId;     //totalの値の末尾に演算子が付け加えられる
      //display.textContent = 0
    }else if(state ==='calBtn') {     //連続して演算子が入力された場合
      total = total.slice(0, -1)     //末尾の演算子を抜き取る
      total += index.dataset.indexId;
    }
    display.textContent = total;
    state = 'calBtn'     //演算子入力後状態となる
    mode ='integer_mode'     //整数状態となる
  }) 
})

//=のボタンが押された時の処理
const equal_btn = document.getElementById('equal_btn');
equal_btn.addEventListener('click',() =>{
  display.textContent = eval(total);     //eval関数で数字　演算子が計算される
  state = 'finish'     //finish状態となる
  mode ='integer_mode'     //整数状態となる
});

//ACのボタンが押された時の処理
const clear = document.getElementById('clear')
clear.addEventListener('click', () => {
  reset();     //関数resetの処理が行われる
})

function reset() {
  total = 0; 
  display.textContent = 0;     //ディスプレイ上　変数totalを0にする
  mode ='integer_mode'     //整数モードとなる
}
